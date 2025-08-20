'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingProps {
  rating: number | null
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  className?: string
}

export function Rating({ 
  rating, 
  maxRating = 5, 
  size = 'md', 
  showValue = false,
  className 
}: RatingProps) {
  if (rating === null) {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <span className="text-gray-500 text-sm">No rating</span>
      </div>
    )
  }

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            i < Math.floor(rating) 
              ? 'fill-yellow-400 text-yellow-400' 
              : i < rating 
                ? 'fill-yellow-400/50 text-yellow-400' 
                : 'text-gray-300'
          )}
        />
      ))}
      {showValue && (
        <span className={cn("ml-1 font-medium", textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
