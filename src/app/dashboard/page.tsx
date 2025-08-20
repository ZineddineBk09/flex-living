"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { PropertyPerformance } from "@/components/dashboard/PropertyPerformance";
import { TrendsAnalysis } from "@/components/dashboard/TrendsAnalysis";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ResponseModal } from "@/components/reviews/ResponseModal";
import { useReviewsStore } from "@/lib/stores/reviewsStore";
import { Review } from "@/lib/stores/reviewsStore";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const {
    reviews,
    properties,
    trends,
    filters,
    setReviews,
    setProperties,
    setTrends,
    setFilters,
    toggleApproval,
    respondToReview,
    getFilteredReviews,
  } = useReviewsStore();

  const { data, error, isLoading } = useSWR("/api/reviews/hostaway", fetcher);

  useEffect(() => {
    if (data) {
      if (data.normalizedReviews) {
        setReviews(data.normalizedReviews);
      }
      if (data.properties) {
        setProperties(data.properties);
      }
      if (data.trends) {
        setTrends(data.trends);
      }
    }
  }, [data, setReviews, setProperties, setTrends]);

  const filteredReviews = getFilteredReviews();

  const handleRespond = (review: Review) => {
    setSelectedReview(review);
    setIsResponseModalOpen(true);
  };

  const handleSubmitResponse = async (reviewId: number, response: string) => {
    await respondToReview(reviewId, response);
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Reviews
          </h1>
          <p className="text-gray-600">
            Failed to load reviews. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 pt-24 pb-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#284e4c] mb-2">
          Reviews Dashboard
        </h1>
        <p className="text-gray-600">
          Manage and approve guest reviews across all properties
        </p>
      </div>

      {/* Stats Cards */}
      <StatsCards reviews={reviews} properties={properties} />

      {/* Trends Analysis */}
      <TrendsAnalysis trends={trends} />

      {/* Property Performance */}
      <PropertyPerformance properties={properties} reviews={reviews} />

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters as (filters: Partial<{ rating: string; channel: string; property: string; status: string; search: string; }>) => void}
        properties={properties}
      />

      {/* Reviews List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#284e4c] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No reviews found
            </h3>
            <p className="text-gray-600">
              {filters.rating !== "All" ||
              filters.channel !== "All" ||
              filters.property !== "All" ||
              filters.status !== "All" ||
              filters.search
                ? "Try adjusting your filters to see more results."
                : "No reviews have been submitted yet."}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Reviews ({filteredReviews.length})
              </h2>
            </div>
            <div className="space-y-4">
              {filteredReviews.map((review: Review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onToggleApproval={toggleApproval}
                  onRespond={handleRespond}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Response Modal */}
      <ResponseModal
        review={selectedReview}
        isOpen={isResponseModalOpen}
        onClose={() => {
          setIsResponseModalOpen(false);
          setSelectedReview(null);
        }}
        onSubmit={handleSubmitResponse}
      />
    </main>
  );
}
