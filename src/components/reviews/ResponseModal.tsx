"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Review } from "@/lib/stores/reviewsStore";
import { format } from "date-fns";
import { Rating } from "@/components/ui/rating";

interface ResponseModalProps {
  review: Review | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reviewId: number, response: string) => Promise<void>;
}

export function ResponseModal({ review, isOpen, onClose, onSubmit }: ResponseModalProps) {
  const [response, setResponse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!review || !response.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(review.id, response.trim());
      setResponse("");
      onClose();
    } catch (error) {
      console.error("Error submitting response:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setResponse("");
    onClose();
  };

  if (!review) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Respond to Review</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Review Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-[#284e4c]">
                  {review.reviewerName}
                </h3>
                <p className="text-sm text-gray-600">
                  {format(new Date(review.submittedDate), "MMMM d, yyyy")}
                </p>
                <p className="text-sm text-gray-600">{review.listingName}</p>
              </div>
              <Rating rating={review.rating} showValue size="sm" />
            </div>
            <p className="text-gray-700 leading-relaxed">{review.publicReview}</p>
          </div>

          {/* Response Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="response" className="text-sm font-medium">
                Your Response
              </Label>
              <Textarea
                id="response"
                placeholder="Write your response to this review..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="mt-2 min-h-[120px]"
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1">
                {response.length}/1000 characters
              </p>
            </div>

            {/* Existing Response (if any) */}
            {review.response && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Current Response:</h4>
                <p className="text-sm text-blue-800">{review.response}</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!response.trim() || isSubmitting}
            className="bg-[#284e4c] hover:bg-[#0f3a1f]"
          >
            {isSubmitting ? "Submitting..." : "Submit Response"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
