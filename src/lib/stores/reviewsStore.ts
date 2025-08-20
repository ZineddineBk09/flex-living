import { create } from 'zustand'
import { 
  ReviewAction, 
  FilterValue, 
  ChannelType, 
  API_ENDPOINTS 
} from '@/lib/constants'
import { 
  isValidReviewId
} from '@/lib/utils/validation'
import { 
  APIError, 
  ValidationError, 
  logError, 
  withErrorHandling 
} from '@/lib/utils/error-handling'

export interface Review {
  id: number
  propertyId: number
  listingName: string
  reviewerName: string
  rating: number | null
  reviewCategory: Array<{
    category: string
    rating: number
  }>
  publicReview: string
  submittedDate: string
  channel: ChannelType
  isApproved: boolean
  isFlagged: boolean
  response: string | null
}

export interface Property {
  id: number
  name: string
  location: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  type: string
  bedrooms: number
  bathrooms: number
  guests: number
  averageRating: number
  totalReviews: number
  approvedReviews: number
  price: number
  description: string
  images: string[]
  amenities: Array<{
    name: string
    category: string
    icon: string
  }>
  policies: {
    checkIn: string
    checkOut: string
    houseRules: string[]
    cancellationPolicy: string
  }
}

export interface Trend {
  monthlyStats: Array<{
    month: string
    totalReviews: number
    averageRating: number
    approvalRate: number
  }>
  commonIssues: Array<{
    issue: string
    count: number
    percentage: number
  }>
  channelPerformance: Array<{
    channel: string
    totalReviews: number
    averageRating: number
    approvalRate: number
  }>
}

interface ReviewsState {
  reviews: Review[]
  properties: Property[]
  trends: Trend | null
  filters: {
    rating: FilterValue
    channel: FilterValue | ChannelType
    property: FilterValue
    status: FilterValue
    search: string
  }
  setReviews: (reviews: Review[]) => void
  setProperties: (properties: Property[]) => void
  setTrends: (trends: Trend) => void
  setFilters: (filters: Partial<ReviewsState['filters']>) => void
  toggleApproval: (reviewId: number) => Promise<void>
  flagReview: (reviewId: number) => Promise<void>
  respondToReview: (reviewId: number, response: string) => Promise<void>
  getFilteredReviews: () => Review[]
  getApprovedReviews: () => Review[]
  getPropertyReviews: (propertyId: number) => Review[]
  getApprovedPropertyReviews: (propertyId: number) => Review[]
}

export const useReviewsStore = create<ReviewsState>((set, get) => ({
  reviews: [],
  properties: [],
  trends: null,
  filters: { 
    rating: FilterValue.ALL, 
    channel: FilterValue.ALL, 
    property: FilterValue.ALL,
    status: FilterValue.ALL,
    search: '' 
  },
  
  setReviews: (reviews) => set({ reviews }),
  setProperties: (properties) => set({ properties }),
  setTrends: (trends) => set({ trends }),
  
  setFilters: (newFilters) => set((state) => ({ 
    filters: { ...state.filters, ...newFilters } 
  })),
  
  toggleApproval: async (reviewId) => {
    return withErrorHandling(async () => {
      if (!isValidReviewId(reviewId)) {
        throw new ValidationError('Invalid review ID');
      }

      const currentReview = get().reviews.find(review => review.id === reviewId);
      if (!currentReview) {
        throw new ValidationError('Review not found');
      }
      
      const newApprovalStatus = !currentReview.isApproved;
      const action = newApprovalStatus ? ReviewAction.APPROVE : ReviewAction.REJECT;
      
      const response = await fetch(API_ENDPOINTS.REVIEWS, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, action })
      });
      
      if (!response.ok) {
        throw new APIError(`Failed to update review: ${response.statusText}`, response.status);
      }

      set((state) => ({
        reviews: state.reviews.map(review => 
          review.id === reviewId 
            ? { ...review, isApproved: newApprovalStatus }
            : review
        )
      }));
    }, (error) => {
      logError(error, 'toggleApproval');
      return error instanceof Error ? error : new APIError('Failed to toggle approval');
    });
  },
  
  flagReview: async (reviewId) => {
    try {
      const currentReview = get().reviews.find(review => review.id === reviewId)
      if (!currentReview) return
      
      const newFlaggedStatus = !currentReview.isFlagged
      const action = newFlaggedStatus ? 'flag' : 'unflag'
      
      const response = await fetch('/api/reviews/hostaway', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, action })
      })
      
      if (response.ok) {
        set((state) => ({
          reviews: state.reviews.map(review => 
            review.id === reviewId 
              ? { ...review, isFlagged: newFlaggedStatus }
              : review
          )
        }))
      }
    } catch (error) {
      console.error('Error flagging review:', error)
    }
  },
  
  respondToReview: async (reviewId, response) => {
    try {
      const apiResponse = await fetch('/api/reviews/hostaway', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, action: 'respond', response })
      })
      
      if (apiResponse.ok) {
        set((state) => ({
          reviews: state.reviews.map(review => 
            review.id === reviewId 
              ? { ...review, response }
              : review
          )
        }))
      }
    } catch (error) {
      console.error('Error responding to review:', error)
    }
  },
  
  getFilteredReviews: () => {
    const { reviews, filters } = get()
    return reviews.filter(review => {
      // Rating filter
      if (filters.rating !== 'All') {
        const rating = review.rating || 0
        if (filters.rating === '5 Stars' && rating < 5) return false
        if (filters.rating === '4+ Stars' && rating < 4) return false
      }
      
      // Channel filter
      if (filters.channel !== FilterValue.ALL && review.channel !== filters.channel) return false
      
      // Property filter
      if (filters.property !== FilterValue.ALL && review.propertyId !== parseInt(filters.property)) return false
      
      // Status filter
      if (filters.status !== FilterValue.ALL) {
        if (filters.status === FilterValue.APPROVED && !review.isApproved) return false
        if (filters.status === FilterValue.PENDING && review.isApproved) return false
        if (filters.status === FilterValue.FLAGGED && !review.isFlagged) return false
      }
      
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch = 
          review.listingName.toLowerCase().includes(searchLower) ||
          review.reviewerName.toLowerCase().includes(searchLower) ||
          review.publicReview.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }
      
      return true
    })
  },
  
  getApprovedReviews: () => {
    const { reviews } = get()
    return reviews.filter(review => review.isApproved)
  },
  
  getPropertyReviews: (propertyId) => {
    const { reviews } = get()
    return reviews.filter(review => review.propertyId === propertyId)
  },
  
  getApprovedPropertyReviews: (propertyId) => {
    const { reviews } = get()
    return reviews.filter(review => review.propertyId === propertyId && review.isApproved)
  }
}))
