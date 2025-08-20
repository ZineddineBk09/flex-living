import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Star, CheckCircle, AlertTriangle, TrendingUp, Building2 } from 'lucide-react'
import { Review, Property } from '@/lib/stores/reviewsStore'
import { calculateReviewStats } from '@/lib/utils/business'

interface StatsCardsProps {
  reviews: Review[]
  properties: Property[]
}

export function StatsCards({ reviews, properties }: StatsCardsProps) {
  const {
    totalReviews,
    approvedReviews,
    flaggedReviews,
    averageRating,
    approvalRate
  } = calculateReviewStats(reviews)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Reviews */}
      <Card className="hover:cursor-pointer relative overflow-hidden bg-gradient-to-br from-blue-500/90 to-blue-600/90 text-white backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          <BarChart3 className="h-4 w-4 drop-shadow-sm" />
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold drop-shadow-sm">{totalReviews}</div>
          <p className="text-xs text-blue-100/90">Across all properties</p>
        </CardContent>
      </Card>

      {/* Average Rating */}
      <Card className="hover:cursor-pointer relative overflow-hidden bg-gradient-to-br from-green-500/90 to-green-600/90 text-white backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 drop-shadow-sm" />
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold drop-shadow-sm">{averageRating.toFixed(1)}</div>
          <p className="text-xs text-green-100/90">out of 5 stars</p>
        </CardContent>
      </Card>

      {/* Approved Reviews */}
      <Card className="hover:cursor-pointer relative overflow-hidden bg-gradient-to-br from-purple-500/90 to-purple-600/90 text-white backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approved Reviews</CardTitle>
          <CheckCircle className="h-4 w-4 drop-shadow-sm" />
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold drop-shadow-sm">{approvedReviews}</div>
          <p className="text-xs text-purple-100/90">{approvalRate.toFixed(1)}% approval rate</p>
        </CardContent>
      </Card>

      {/* Flagged Reviews */}
      <Card className="hover:cursor-pointer relative overflow-hidden bg-gradient-to-br from-orange-500/90 to-orange-600/90 text-white backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-transparent"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Flagged Reviews</CardTitle>
          <AlertTriangle className="h-4 w-4 drop-shadow-sm" />
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold drop-shadow-sm">{flaggedReviews}</div>
          <p className="text-xs text-orange-100/90">Require attention</p>
        </CardContent>
      </Card>

      {/* Properties */}
      <Card className="hover:cursor-pointer relative overflow-hidden bg-gradient-to-br from-indigo-500/90 to-indigo-600/90 text-white backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-transparent"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
          <Building2 className="h-4 w-4 drop-shadow-sm" />
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold drop-shadow-sm">{properties.length}</div>
          <p className="text-xs text-indigo-100/90">With reviews</p>
        </CardContent>
      </Card>

      {/* Trend */}
      <Card className="hover:cursor-pointer relative overflow-hidden bg-gradient-to-br from-teal-500/90 to-teal-600/90 text-white backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-transparent"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Trend</CardTitle>
          <TrendingUp className="h-4 w-4 drop-shadow-sm" />
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold drop-shadow-sm">+12%</div>
          <p className="text-xs text-teal-100/90">vs last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
