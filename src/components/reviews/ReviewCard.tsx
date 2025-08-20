import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { Review } from "@/lib/stores/reviewsStore";
import { MessageSquare, Edit } from "lucide-react";

interface ReviewCardProps {
  review: Review;
  onToggleApproval: (reviewId: number) => void;
  onRespond: (review: Review) => void;
}

export function ReviewCard({ review, onToggleApproval, onRespond }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-[#284e4c] mb-1">
              {review.listingName}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium">{review.reviewerName}</span>
              <span>•</span>
              <span>{formatDate(review.submittedDate)}</span>
              <span>•</span>
              <Badge variant="secondary" className="text-xs">
                {review.channel}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Rating rating={review.rating} showValue size="md" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Approve</span>
              <Switch
                checked={review.isApproved}
                onCheckedChange={() => onToggleApproval(review.id)}
                className="data-[state=checked]:bg-[#22c55e]"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed">{review.publicReview}</p>
        
        {/* Host Response (if exists) */}
        {review.response && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Host Response:</span>
            </div>
            <p className="text-sm text-blue-800">{review.response}</p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRespond(review)}
            className="text-[#284e4c] border-[#284e4c] hover:bg-[#284e4c] hover:text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            {review.response ? "Edit Response" : "Respond"}
          </Button>
          
          {review.reviewCategory.length > 0 && (
            <div className="text-sm text-gray-500">
              {review.reviewCategory.length} category ratings
            </div>
          )}
        </div>
        
        {review.reviewCategory.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              Category Ratings:
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {review.reviewCategory.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-600">{category.category}:</span>
                  <Rating rating={category.rating} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
