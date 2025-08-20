"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Rating } from "@/components/ui/rating";
import { useReviewsStore } from "@/lib/stores/reviewsStore";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface GuestReviewsProps {
  propertyId: number;
}

export function GuestReviews({ propertyId }: GuestReviewsProps) {
  const { setReviews, getApprovedPropertyReviews } = useReviewsStore();

  const { data, error, isLoading } = useSWR("/api/reviews/hostaway", fetcher);

  useEffect(() => {
    if (data?.normalizedReviews) {
      setReviews(data.normalizedReviews);
    }
  }, [data, setReviews]);

  // Get approved reviews for this specific property
  const approvedReviews = propertyId
    ? getApprovedPropertyReviews(propertyId)
    : [];

  // Show loading state while data is being fetched
  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-[#284e4c]">
            Guest Reviews
          </h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#284e4c] mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading reviews...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-[#284e4c]">
            Guest Reviews
          </h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600">Failed to load reviews</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (approvedReviews.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold text-[#284e4c]">
            Guest Reviews
          </h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-600">
              {propertyId > 0
                ? "No approved reviews for this property yet"
                : "Loading reviews..."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold text-[#284e4c]">Guest Reviews</h3>
        <p className="text-sm text-gray-600">
          {approvedReviews.length} reviews
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {approvedReviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-100 pb-6 last:border-b-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-[#284e4c]">
                    {review.reviewerName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {format(new Date(review.submittedDate), "MMMM yyyy")}
                  </p>
                </div>
                <Rating rating={review.rating} showValue size="md" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                {review.publicReview}
              </p>

              {/* Show host response if available */}
              {review.response && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-[#284e4c] mb-1">
                    Host Response:
                  </p>
                  <p className="text-sm text-gray-600">{review.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
