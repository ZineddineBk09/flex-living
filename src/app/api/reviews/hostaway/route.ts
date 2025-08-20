import { NextResponse } from "next/server";
import { ReviewAction, ERROR_MESSAGES } from "@/lib/constants";
import { isValidReviewId, isValidReviewAction } from "@/lib/utils/validation";
import { calculateRatingFromCategories } from "@/lib/utils/business";
import {
  ValidationError,
  logError,
  createErrorResponse,
} from "@/lib/utils/error-handling";
import { storage } from "@/lib/utils/storage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");
    const { reviews, properties, trends } = storage.getData();

    // Normalize the reviews data
    let normalizedReviews = reviews.map((review) => {
      // Calculate overall rating if rating is null
      let calculatedRating = review.rating;
      if (calculatedRating === null && review.reviewCategory.length > 0) {
        calculatedRating = calculateRatingFromCategories(review.reviewCategory);
      }

      return {
        ...review,
        rating: calculatedRating,
      };
    });

    // Filter by property if specified
    if (propertyId) {
      normalizedReviews = normalizedReviews.filter(
        (review) => review.propertyId === parseInt(propertyId)
      );
    }

    return NextResponse.json({
      normalizedReviews,
      properties,
      trends,
      totalCount: normalizedReviews.length,
    });
  } catch (error) {
    console.error("Error processing reviews:", error);
    return NextResponse.json(
      { error: "Failed to process reviews" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { reviewId, action, response } = body;

    // Validate required fields
    if (!reviewId || !action) {
      const errorResponse = createErrorResponse(
        new ValidationError(ERROR_MESSAGES.MISSING_REQUIRED_FIELDS),
        400
      );
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Validate review ID and action
    if (!isValidReviewId(reviewId)) {
      const errorResponse = createErrorResponse(
        new ValidationError("Invalid review ID"),
        400
      );
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (!isValidReviewAction(action)) {
      const errorResponse = createErrorResponse(
        new ValidationError(`${ERROR_MESSAGES.INVALID_ACTION}: ${action}`),
        400
      );
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Get current data using storage
    const currentData = storage.getData();

    // Find the review
    const reviewIndex = currentData.reviews.findIndex(
      (r: { id: number }) => r.id === reviewId
    );
    if (reviewIndex === -1) {
      const errorResponse = createErrorResponse(
        new ValidationError("Review not found"),
        404
      );
      return NextResponse.json(errorResponse, { status: 404 });
    }

    // Store original state for comparison
    const originalReview = { ...currentData.reviews[reviewIndex] };

    // Update based on action
    switch (action) {
      case ReviewAction.APPROVE:
        storage.updateReview(reviewId, { isApproved: true });
        break;
      case ReviewAction.REJECT:
        storage.updateReview(reviewId, { isApproved: false });
        break;
      case ReviewAction.FLAG:
        storage.updateReview(reviewId, { isFlagged: true });
        break;
      case ReviewAction.UNFLAG:
        storage.updateReview(reviewId, { isFlagged: false });
        break;
      case ReviewAction.RESPOND:
        if (!response || typeof response !== "string") {
          const errorResponse = createErrorResponse(
            new ValidationError(ERROR_MESSAGES.RESPONSE_REQUIRED),
            400
          );
          return NextResponse.json(errorResponse, { status: 400 });
        }
        storage.updateReview(reviewId, { response });
        break;
      default:
        const errorResponse = createErrorResponse(
          new ValidationError(`${ERROR_MESSAGES.INVALID_ACTION}: ${action}`),
          400
        );
        return NextResponse.json(errorResponse, { status: 400 });
    }

    // Get updated data
    const updatedData = storage.getData();
    const updatedReview = updatedData.reviews.find((r: { id: number }) => r.id === reviewId);

    return NextResponse.json({
      success: true,
      review: updatedReview,
      previousState: originalReview,
    });
  } catch (error) {
    logError(error, "PATCH /api/reviews/hostaway");
    const errorResponse = createErrorResponse(error, 500);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
