import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Rating } from '@/components/ui/rating'
import { Building2, Star, MessageSquare, CheckCircle } from 'lucide-react'
import { Property, Review } from '@/lib/stores/reviewsStore'

interface PropertyPerformanceProps {
  properties: Property[]
  reviews: Review[]
}

export function PropertyPerformance({ properties, reviews }: PropertyPerformanceProps) {
  const getPropertyStats = (propertyId: number) => {
    const propertyReviews = reviews.filter(r => r.propertyId === propertyId)
    const approvedCount = propertyReviews.filter(r => r.isApproved).length
    const flaggedCount = propertyReviews.filter(r => r.isFlagged).length
    const averageRating = propertyReviews.length > 0 
      ? propertyReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / propertyReviews.length 
      : 0
    
    return { propertyReviews, approvedCount, flaggedCount, averageRating }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Property Performance
        </CardTitle>
        <p className="text-sm text-gray-600">
          Overview of review performance across all properties
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {properties.map((property) => {
            const stats = getPropertyStats(property.id)
            const approvalRate = stats.propertyReviews.length > 0 
              ? (stats.approvedCount / stats.propertyReviews.length) * 100 
              : 0

            return (
              <div key={property.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#284e4c]">{property.name}</h3>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {property.type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {property.bedrooms} bed • {property.bathrooms} bath • {property.guests} guests
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Rating rating={stats.averageRating} showValue size="sm" />
                    </div>
                    <p className="text-xs text-gray-500">
                      {stats.propertyReviews.length} reviews
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="font-medium">{stats.approvedCount}</div>
                      <div className="text-xs text-gray-500">
                        Approved ({approvalRate.toFixed(0)}%)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                    <div>
                      <div className="font-medium">{stats.propertyReviews.length}</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    <div>
                      <div className="font-medium">{stats.averageRating.toFixed(1)}</div>
                      <div className="text-xs text-gray-500">Avg Rating</div>
                    </div>
                  </div>
                </div>

                {stats.flaggedCount > 0 && (
                  <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded text-xs text-orange-700">
                    ⚠️ {stats.flaggedCount} flagged review{stats.flaggedCount > 1 ? 's' : ''} requiring attention
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
