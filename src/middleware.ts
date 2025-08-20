import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100, // 100 requests per window
  API_WINDOW_MS: 1 * 60 * 1000, // 1 minute for API routes
  API_MAX_REQUESTS: 30, // 30 requests per minute for API
}

// Security headers configuration
const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY', // Prevent clickjacking
  'X-Content-Type-Options': 'nosniff', // Prevent MIME type sniffing
  'X-XSS-Protection': '1; mode=block', // XSS protection
  'Referrer-Policy': 'strict-origin-when-cross-origin', // Referrer policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()', // Feature policy
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains', // HSTS
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com",
    "connect-src 'self' https://maps.googleapis.com https://fonts.googleapis.com https://fonts.gstatic.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),
}

// CORS configuration
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGINS || 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400', // 24 hours
}

// Rate limiting function
function checkRateLimit(ip: string, isApiRoute: boolean = false): boolean {
  const now = Date.now()
  const windowMs = isApiRoute ? RATE_LIMIT.API_WINDOW_MS : RATE_LIMIT.WINDOW_MS
  const maxRequests = isApiRoute ? RATE_LIMIT.API_MAX_REQUESTS : RATE_LIMIT.MAX_REQUESTS
  
  const key = `${ip}:${isApiRoute ? 'api' : 'general'}`
  const record = rateLimitStore.get(key)
  
  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false // Rate limit exceeded
  }
  
  // Increment count
  record.count++
  rateLimitStore.set(key, record)
  return true
}

// Clean up old rate limit records
function cleanupRateLimitStore() {
  const now = Date.now()
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Get client IP address
function getClientIP(request: NextRequest): string {
  // Check for forwarded headers (common with proxies)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  // Check for real IP header
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  
  // Fallback to connection remote address
  return request.headers.get('x-forwarded-for') || 'unknown'
}

// Apply security headers to response
function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

// Apply CORS headers to response
function applyCORSHeaders(response: NextResponse): NextResponse {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const clientIP = getClientIP(request)
  
  // Clean up rate limit store periodically
  if (Math.random() < 0.01) { // 1% chance to clean up
    cleanupRateLimitStore()
  }
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 })
    return applyCORSHeaders(response)
  }
  
  // Rate limiting for API routes
  const isApiRoute = pathname.startsWith('/api/')
  if (isApiRoute) {
    if (!checkRateLimit(clientIP, true)) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later.',
          retryAfter: Math.ceil(RATE_LIMIT.API_WINDOW_MS / 1000)
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(RATE_LIMIT.API_WINDOW_MS / 1000).toString(),
            'X-RateLimit-Limit': RATE_LIMIT.API_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': (Date.now() + RATE_LIMIT.API_WINDOW_MS).toString(),
          }
        }
      )
    }
  }
  
  // General rate limiting for all routes
  if (!checkRateLimit(clientIP, false)) {
    return new NextResponse(
      JSON.stringify({ 
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.ceil(RATE_LIMIT.WINDOW_MS / 1000)
      }),
      { 
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil(RATE_LIMIT.WINDOW_MS / 1000).toString(),
          'X-RateLimit-Limit': RATE_LIMIT.MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': (Date.now() + RATE_LIMIT.WINDOW_MS).toString(),
        }
      }
    )
  }
  
  // Security checks for API routes
  if (isApiRoute) {
    // Validate Content-Type for POST/PATCH requests
    if (['POST', 'PATCH'].includes(request.method)) {
      const contentType = request.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        return new NextResponse(
          JSON.stringify({ error: 'Content-Type must be application/json' }),
          { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
    }
    
    // Check request size limit (10MB for API routes)
    const contentLength = request.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 10 * 1024 * 1024) {
      return new NextResponse(
        JSON.stringify({ error: 'Request too large' }),
        { 
          status: 413,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
  
  // Continue with the request
  const response = NextResponse.next()
  
  // Apply security headers
  applySecurityHeaders(response)
  
  // Apply CORS headers for API routes
  if (isApiRoute) {
    applyCORSHeaders(response)
  }
  
  // Add rate limit headers
  const key = `${clientIP}:${isApiRoute ? 'api' : 'general'}`
  const record = rateLimitStore.get(key)
  if (record) {
    const maxRequests = isApiRoute ? RATE_LIMIT.API_MAX_REQUESTS : RATE_LIMIT.MAX_REQUESTS
    
    response.headers.set('X-RateLimit-Limit', maxRequests.toString())
    response.headers.set('X-RateLimit-Remaining', Math.max(0, maxRequests - record.count).toString())
    response.headers.set('X-RateLimit-Reset', record.resetTime.toString())
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
