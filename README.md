# Flex Living Reviews Dashboard

A comprehensive full-stack reviews management application for Flex Living, built with Next.js 15, Tailwind CSS, Shadcn UI, SWR, and Zustand. This application provides a complete solution for managing guest reviews across multiple properties with advanced filtering, approval workflows, and analytics.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Key Design & Logic Decisions](#-key-design--logic-decisions)
- [API Behaviors](#-api-behaviors)
- [Google Reviews Integration Analysis](#-google-reviews-integration-analysis)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Security Implementation](#-security-implementation)
- [Storage System](#-storage-system)

## 🚀 Features

### Reviews Dashboard (`/dashboard`)
- **Complete Reviews Management**: View, filter, and approve guest reviews from multiple channels
- **Advanced Filtering**: Filter by rating, channel (Hostaway/Google), property, status, and search functionality
- **Real-time Statistics**: Total reviews, average rating, approval rate, and flagged reviews
- **Per-Property Performance**: Detailed analytics for each property's review performance
- **Trends Analysis**: Monthly trends, common issues, and channel performance metrics
- **Approval System**: Toggle switches to approve/disapprove reviews with persistence
- **Response System**: Modal interface for admins to respond to guest reviews
- **Responsive Design**: Fully responsive across all device sizes

### Property Details Page (`/properties/[id]`)
- **Dynamic Property Data**: All property information fetched from the database
- **Image Gallery**: Interactive gallery with lightbox functionality and thumbnail navigation
- **Booking Widget**: Complete booking interface with date selection and inquiry form
- **Property Information**: Detailed descriptions with expand/collapse functionality
- **Amenities Section**: Categorized amenities with "View all" dialog
- **Stay Policies**: Check-in/check-out times, house rules, and cancellation policies
- **Location Map**: Google Maps integration with custom styling
- **Guest Reviews**: Display only approved reviews from the API
- **Newsletter Popup**: Newsletter signup modal matching the brand design

### Brand Identity
- **Perfect Replication**: Matches Flex Living brand colors and design elements
- **Consistent UI**: Rounded corners, shadows, and spacing throughout
- **Modern Typography**: Clean, professional font usage
- **Interactive Elements**: Hover effects, transitions, and micro-interactions

## 🛠 Tech Stack

### Core Framework
- **Next.js 15+**: Latest version with App Router for optimal performance and SEO
- **React 19**: Latest React version with concurrent features
- **TypeScript**: Full type safety throughout the application

### Styling & UI
- **Tailwind CSS 4**: Latest version for utility-first styling
- **Shadcn UI**: High-quality, accessible component library built on Radix UI
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Beautiful, customizable icons

### State Management & Data Fetching
- **Zustand**: Lightweight, scalable state management
- **SWR**: React Hooks for data fetching with caching, revalidation, and error handling

### Development Tools
- **ESLint**: Code linting and quality enforcement
- **Turbopack**: Fast bundler for development
- **date-fns**: Modern date utility library

### External Integrations
- **Google Maps API**: Interactive maps with custom styling
- **@react-google-maps/api**: React wrapper for Google Maps

## 🎯 Key Design & Logic Decisions

### 1. Architecture Principles

#### Single Responsibility Principle (SRP)
- Each component has a single, well-defined purpose
- Business logic separated into utility functions
- API logic isolated in dedicated route handlers
- State management concerns separated by domain

#### Open/Closed Principle (O/C)
- Components designed for extension without modification
- Utility functions accept configuration parameters
- Store actions are composable and extensible
- API endpoints support multiple data sources

### 2. State Management Strategy

#### Zustand Store Design
```typescript
interface ReviewsState {
  reviews: Review[]
  properties: Property[]
  trends: Trend | null
  filters: FilterState
  // Actions
  setReviews: (reviews: Review[]) => void
  toggleApproval: (reviewId: number) => Promise<void>
  respondToReview: (reviewId: number, response: string) => Promise<void>
  getFilteredReviews: () => Review[]
}
```

**Key Decisions:**
- **Centralized State**: All review-related state in one store
- **Async Actions**: API calls integrated into store actions
- **Computed Values**: Filtered reviews calculated on-demand
- **Optimistic Updates**: UI updates immediately, API calls in background

### 3. Data Normalization Strategy

#### Review Data Processing
```typescript
// Calculate overall rating from category ratings
const calculateRatingFromCategories = (categories: Array<{ rating: number }>): number => {
  if (categories.length === 0) return 0;
  return categories.reduce((sum, cat) => sum + cat.rating, 0) / categories.length;
};
```

**Key Decisions:**
- **Rating Calculation**: Automatic calculation when overall rating is null
- **Data Enrichment**: Adding `isApproved`, `isFlagged`, `response` fields
- **Property Association**: Linking reviews to specific properties
- **Channel Identification**: Distinguishing between Hostaway and Google reviews

### 4. Hybrid Storage System


#### Environment-Adaptive Persistence
```typescript
// Automatic environment detection
const isServerless = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

// Development: File-based storage
class FileStorage implements StorageInterface {
  updateReview(reviewId: number, updates: Record<string, unknown>): void {
    const currentData = this.getData();
    // Update and write to file system
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(currentData, null, 2));
  }
}

// Production: In-memory storage
class MemoryStorage implements StorageInterface {
  updateReview(reviewId: number, updates: Record<string, unknown>): void {
    // Update in-memory data (persists during function execution)
    inMemoryData.reviews[reviewIndex] = { ...inMemoryData.reviews[reviewIndex], ...updates };
  }
}
```

**Key Decisions:**
- **Environment Adaptation**: Automatically switches between file and memory storage
- **Serverless Compatible**: Solves Vercel read-only file system limitations
- **Development-Friendly**: File persistence in development for debugging
- **Production Ready**: Memory storage for serverless environments
- **No External Dependencies**: Works without database setup

### 5. Error Handling Strategy

#### Comprehensive Error Management
```typescript
// Custom error classes
export class ValidationError extends Error { }
export class APIError extends Error { }
export class BusinessLogicError extends Error { }

// Centralized error handling
export const withErrorHandling = async <T>(
  operation: () => Promise<T>,
  errorHandler: (error: unknown) => Error
): Promise<T>
```

**Key Decisions:**
- **Custom Error Types**: Specific error classes for different scenarios
- **Centralized Logging**: Consistent error logging across the application
- **User-Friendly Messages**: Clear error messages for end users
- **Graceful Degradation**: Application continues to function despite errors

### 6. Security Implementation

#### Multi-Layer Security
- **Middleware**: Rate limiting, security headers, CORS
- **Input Validation**: Comprehensive validation for all inputs
- **Content Security Policy**: XSS protection
- **Request Size Limits**: Protection against large payload attacks

## 📊 API Behaviors

### 1. GET `/api/reviews/hostaway`

#### Purpose
Fetches and normalizes review data from the mock database.

#### Request Parameters
- `propertyId` (optional): Filter reviews by specific property

#### Response Structure
```json
{
  "normalizedReviews": [
    {
      "id": 1,
      "propertyId": 1,
      "listingName": "Luxury Apartment in Algiers",
      "reviewerName": "Sarah Johnson",
      "rating": 4.5,
      "reviewCategory": [
        { "category": "cleanliness", "rating": 5 },
        { "category": "communication", "rating": 4 }
      ],
      "publicReview": "Great experience...",
      "submittedDate": "2025-01-15T10:30:00Z",
      "channel": "Hostaway",
      "isApproved": false,
      "isFlagged": false,
      "response": null
    }
  ],
  "properties": [...],
  "trends": {...},
  "totalCount": 8
}
```

#### Data Processing
1. **Rating Normalization**: Calculate overall rating from categories if null
2. **Property Filtering**: Filter by propertyId if provided
3. **Data Enrichment**: Include properties and trends data

### 2. PATCH `/api/reviews/hostaway`

#### Purpose
Updates review status (approval, flagging, responses) with persistence.

#### Request Body
```json
{
  "reviewId": 1,
  "action": "approve" | "reject" | "flag" | "unflag" | "respond",
  "response": "string" // Required for respond action
}
```

#### Response Structure
```json
{
  "success": true,
  "review": { /* updated review object */ },
  "previousState": { /* original review state */ }
}
```

#### Validation Rules
- **Review ID**: Must be a valid number
- **Action**: Must be one of the predefined actions
- **Response**: Required string for respond action
- **Content-Type**: Must be application/json

#### Persistence
- **Hybrid Storage**: File-based in development, in-memory in production
- **Environment Detection**: Automatic switching based on deployment environment
- **Development**: Updates written to `mock-data.json` with atomic operations
- **Production**: In-memory updates that persist during function execution
- **Error Handling**: Graceful fallback to mock data on storage failures

### 3. Error Handling

#### Error Response Format
```json
{
  "error": {
    "message": "Human-readable error message",
    "type": "ValidationError" | "APIError" | "BusinessLogicError",
    "details": "Additional error context"
  },
  "status": 400
}
```

#### HTTP Status Codes
- **200**: Success
- **400**: Bad Request (validation errors)
- **404**: Review not found
- **429**: Rate limit exceeded
- **500**: Internal server error

## 🔍 Google Reviews Integration Analysis

### Executive Summary

After comprehensive analysis of Google Reviews integration options, we've identified significant limitations with official APIs and recommend a phased, hybrid approach for production implementation.

### 1. Official API Limitations

#### Google Places API (New)
- **Review Limit**: Maximum 5 reviews per place (severely limiting)
- **Cost**: High cost per API call for review data
- **Use Case**: General location data, not comprehensive review collection

#### Google Business Profile API
- **Access**: Requires business profile ownership and verification
- **Capability**: Full access to all reviews for owned listings
- **Limitation**: Only works for properties directly managed by Flex Living

### 2. Third-Party Solutions

#### Outscraper
- **Advantage**: Explicitly designed to bypass 5-review limit
- **Pricing**: $3 per 1,000 reviews (highly cost-effective)
- **Features**: Real-time data with advanced filtering
- **Compliance**: Clear terms of service for data usage

#### SerpApi
- **Approach**: Scrapes search engine results pages
- **Pricing**: Per-search model ($75 for 5,000 searches)
- **Flexibility**: Good for variable result sets
- **Integration**: Well-documented API

### 3. Recommended Implementation Strategy

#### Phase 1: Business Profile API
```typescript
// For Flex Living owned properties
const googleBusinessProfileAPI = {
  endpoint: 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
  scope: 'https://www.googleapis.com/auth/business.manage',
  features: ['List all reviews', 'Read and respond to reviews']
};
```

#### Phase 2: Third-Party Integration
```typescript
// For non-owned properties
const outscraperConfig = {
  apiKey: process.env.OUTSCRAPER_API_KEY,
  endpoint: 'https://api.outscraper.com/google-business-reviews',
  costPerReview: 0.003 // $3 per 1,000 reviews
};
```

### 4. Data Normalization Challenges

#### Rating System Differences
- **Hostaway**: Detailed category ratings (cleanliness, communication, etc.)
- **Google**: Single overall rating
- **Solution**: UI adapts to show available data, category filtering disabled for Google reviews

#### Implementation Approach
```typescript
interface NormalizedReview {
  id: number;
  source: 'hostaway' | 'google';
  rating: number;
  reviewCategory?: Array<{ category: string; rating: number }>;
  // ... other fields
}
```

### 5. Cost Analysis

#### Monthly Cost Projections (50 properties, 500 reviews/month)
- **Google Places API**: Non-viable (limited to 5 reviews per call)
- **Outscraper**: $1.50/month (highly cost-effective)
- **SerpApi**: $75/month (predictable base cost)

### 6. Compliance Considerations

#### Google's Structured Data Guidelines
- **Risk**: Curating own reviews may affect search result star ratings
- **Mitigation**: Clear disclosure of review curation process
- **Recommendation**: Legal review before public implementation

## 📁 Project Structure

```
src/
├── app/
│   ├── api/reviews/hostaway/route.ts    # API endpoint for reviews
│   ├── dashboard/page.tsx               # Reviews dashboard page
│   ├── properties/[id]/page.tsx         # Property details page
│   ├── not-found.tsx                    # Custom 404 page
│   └── page.tsx                         # Home page
├── components/
│   ├── layout/
│   │   ├── Header.tsx                   # Flex Living header
│   │   └── Footer.tsx                   # Flex Living footer
│   ├── dashboard/
│   │   ├── StatsCards.tsx               # Dashboard statistics
│   │   ├── PropertyPerformance.tsx      # Per-property analytics
│   │   ├── TrendsAnalysis.tsx           # Monthly trends
│   │   └── FilterBar.tsx                # Reviews filtering
│   ├── property/
│   │   ├── ImageGallery.tsx             # Property image gallery
│   │   ├── BookingWidget.tsx            # Booking sidebar
│   │   ├── PropertyDescription.tsx      # Property description
│   │   ├── PropertyPolicies.tsx         # Stay policies
│   │   ├── Amenities.tsx                # Amenities section
│   │   ├── Location.tsx                 # Location map
│   │   ├── GuestReviews.tsx             # Approved reviews
│   │   └── NewsletterPopup.tsx          # Newsletter signup
│   ├── reviews/
│   │   ├── ReviewCard.tsx               # Individual review card
│   │   └── ResponseModal.tsx            # Admin response modal
│   └── ui/                              # Shadcn UI components
├── lib/
│   ├── stores/
│   │   └── reviewsStore.ts              # Zustand store
│   ├── utils/
│   │   ├── business.ts                  # Business logic utilities
│   │   ├── validation.ts                # Input validation
│   │   ├── error-handling.ts            # Error management
│   │   ├── amenities.ts                 # Amenity utilities
│   │   └── storage.ts                   # Hybrid storage system
│   ├── constants.ts                     # Application constants
│   ├── mapStyles.ts                     # Google Maps styling
│   └── mock-data.json                   # Sample review data
├── hooks/
│   └── use-mobile.ts                    # Mobile detection hook
└── middleware.ts                        # Security middleware
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flex-living
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security Implementation

### Middleware Security
- **Rate Limiting**: 100 requests/15min general, 30 requests/min API
- **Security Headers**: CSP, HSTS, X-Frame-Options, X-XSS-Protection
- **CORS**: Configurable cross-origin resource sharing
- **Request Validation**: Content-Type and size limits

### API Security
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: Secure error responses without sensitive data
- **File Operations**: Safe file reading/writing with error handling

### Next.js Configuration
- **Security Headers**: Additional headers for enhanced security
- **Image Optimization**: Restricted domains and formats
- **Compression**: Gzip compression enabled

## 🚀 Deployment

The application is optimized for serverless deployment with automatic storage adaptation:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

**Deployment Features:**
- ✅ **Serverless Compatible**: Hybrid storage system works in read-only environments
- ✅ **Automatic Adaptation**: Switches from file to memory storage in production
- ✅ **Zero Configuration**: No database setup required
- ✅ **Instant Deployment**: Deploy directly from Git repository

### Storage Behavior by Environment

#### Development (`npm run dev`)
- **Storage Type**: File-based persistence
- **Data Location**: `src/lib/mock-data.json`
- **Persistence**: Survives server restarts
- **Use Case**: Development and testing

#### Production (Vercel/Serverless)
- **Storage Type**: In-memory storage
- **Data Location**: Function memory
- **Persistence**: During function execution (resets on cold starts)
- **Use Case**: Demonstrations and assessments

### Other Platforms
- **Netlify**: Automatic deployment from Git (uses memory storage)
- **AWS Amplify**: Full-stack deployment (uses memory storage)
- **Self-hosted**: Docker containerization (can use file storage)

### Environment Variables
```env
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_api_key
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
NODE_ENV=production  # Automatically set by most platforms
VERCEL=1            # Automatically set by Vercel
```

### Production Considerations

#### Current Implementation (Assessment/Demo)
- ✅ **Perfect for assessments**: Immediate functionality without setup
- ✅ **Cost-effective**: No database hosting costs
- ✅ **Easy testing**: Fresh data on each deployment
- ⚠️ **Data resets**: Changes lost on function cold starts

#### Future Production Enhancements
For long-term production use, consider:
1. **Database Integration**: PostgreSQL, MongoDB, or similar
2. **Redis Caching**: For session persistence
3. **Data Backup**: Regular backups and version control

## 💾 Storage System

### Overview

The application uses a sophisticated hybrid storage system that automatically adapts to the deployment environment, ensuring optimal performance and compatibility across development and production scenarios.

### Architecture

```typescript
// Storage interface for consistency
export interface StorageInterface {
  getData(): typeof mockData;
  updateReview(reviewId: number, updates: Record<string, unknown>): void;
  saveData(): void;
}

// Automatic environment detection
const isServerless = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
export const storage: StorageInterface = isServerless ? new MemoryStorage() : new FileStorage();
```

### Storage Implementations

#### FileStorage (Development)
- **Purpose**: Local development and testing
- **Persistence**: Writes to `src/lib/mock-data.json`
- **Benefits**: 
  - Data survives server restarts
  - Easy debugging and inspection
  - Version control friendly
  - Atomic file operations

#### MemoryStorage (Production/Serverless)
- **Purpose**: Serverless environments (Vercel, Netlify, etc.)
- **Persistence**: In-memory during function execution
- **Benefits**:
  - No file system dependencies
  - Fast read/write operations
  - Serverless compatible
  - No external database required

### Environment Detection

The system automatically detects the deployment environment using:

```typescript
const isServerless = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
```

**Detection Logic:**
- **Vercel**: `VERCEL=1` environment variable
- **Production**: `NODE_ENV=production`
- **Development**: Falls back to file storage

### Data Flow

#### Development Workflow
1. Application starts → FileStorage initialized
2. API request → Read from `mock-data.json`
3. Data update → Write to `mock-data.json`
4. Server restart → Data persists

#### Production Workflow
1. Function cold start → MemoryStorage initialized with mock data
2. API request → Read from memory
3. Data update → Update in-memory data
4. Function warm → Data persists in memory
5. Function cold start → Data resets to initial state

### Benefits for Assessment

#### For Evaluators
- ✅ **No Setup Required**: Works immediately without database configuration
- ✅ **Immediate Testing**: All functionality available out-of-the-box
- ✅ **Consistent Behavior**: Same API interface across environments
- ✅ **Easy Deployment**: Deploy to Vercel without additional configuration

#### For Development
- ✅ **Local Persistence**: Changes saved during development
- ✅ **Easy Debugging**: Inspect data directly in JSON file
- ✅ **Version Control**: Track data changes in Git
- ✅ **Testing Friendly**: Predictable data state

### Limitations and Considerations

#### Current Implementation
- **Memory Storage**: Data resets on serverless function cold starts
- **Single Instance**: No cross-instance data sharing in serverless
- **Session-Based**: Changes persist only during active sessions

#### Production Recommendations
For production applications requiring persistent data:

1. **Database Integration**
   ```typescript
   class DatabaseStorage implements StorageInterface {
     async updateReview(reviewId: number, updates: Record<string, unknown>) {
       await db.reviews.update({ where: { id: reviewId }, data: updates });
     }
   }
   ```

2. **Caching Layer**
   ```typescript
   class CachedStorage implements StorageInterface {
     constructor(private cache: Redis, private db: Database) {}
     // Implementation with cache-aside pattern
   }
   ```

### Migration Path

The storage system is designed for easy migration:

```typescript
// Future database integration
export const storage: StorageInterface = 
  process.env.DATABASE_URL 
    ? new DatabaseStorage(process.env.DATABASE_URL)
    : isServerless 
      ? new MemoryStorage() 
      : new FileStorage();
```

## 📊 Performance Optimizations

### Frontend
- **SWR Caching**: Intelligent data caching and revalidation
- **Component Optimization**: React.memo for expensive components
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based code splitting

### Backend
- **Hybrid Storage**: Efficient storage system adapted to environment
- **Memory Optimization**: In-memory data structures for serverless
- **Error Boundaries**: Graceful error handling with fallback mechanisms
- **Validation**: Early validation to prevent unnecessary processing
- **Storage Abstraction**: Clean interface supporting multiple storage backends

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Note**: This application is designed as a comprehensive solution for Flex Living's review management needs. The hybrid storage system ensures compatibility with both development and serverless production environments, making it ideal for assessments and demonstrations. The Google Reviews integration analysis provides a roadmap for future enhancements while maintaining the current functionality with Hostaway integration.
