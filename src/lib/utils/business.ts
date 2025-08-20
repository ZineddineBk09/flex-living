import { differenceInDays } from 'date-fns';
import { 
  BOOKING_CONSTANTS, 
  PRICING_CONSTANTS, 
  UI_CONSTANTS,
  IMAGE_CONSTANTS 
} from '@/lib/constants';
import { isValidPrice, isValidRating } from './validation';

// Pricing calculations
export const calculateBookingPrice = (
  price: number,
  from: Date | undefined,
  to: Date | undefined
): {
  nights: number;
  basePrice: number;
  discount: number;
  cleaningFee: number;
  total: number;
} => {
  if (!isValidPrice(price)) {
    throw new Error('Invalid price provided');
  }

  const nights = from && to ? differenceInDays(to, from) : 0;
  const basePrice = nights * price;
  const discount = nights >= BOOKING_CONSTANTS.DISCOUNT_THRESHOLD_DAYS 
    ? Math.round(basePrice * BOOKING_CONSTANTS.DISCOUNT_PERCENTAGE) 
    : 0;
  const cleaningFee = BOOKING_CONSTANTS.CLEANING_FEE;
  const total = basePrice - discount + cleaningFee;

  return {
    nights,
    basePrice,
    discount,
    cleaningFee,
    total,
  };
};

export const calculateEstimatedPrice = (averageRating: number): number => {
  if (!isValidRating(averageRating)) {
    throw new Error('Invalid rating provided');
  }

  return Math.round(
    averageRating * PRICING_CONSTANTS.BASE_PRICE_MULTIPLIER + 
    PRICING_CONSTANTS.BASE_PRICE_ADDITION
  );
};

// Rating calculations
export const calculateAverageRating = (ratings: (number | null)[]): number => {
  const validRatings = ratings.filter((rating): rating is number => 
    rating !== null && isValidRating(rating)
  );

  if (validRatings.length === 0) return 0;

  const sum = validRatings.reduce((acc, rating) => acc + rating, 0);
  return sum / validRatings.length;
};

export const calculateRatingFromCategories = (categories: Array<{ rating: number }>): number => {
  if (categories.length === 0) return 0;

  const totalRating = categories.reduce((sum, category) => sum + category.rating, 0);
  return totalRating / categories.length;
};

// Statistics calculations
export const calculateReviewStats = (reviews: Array<{ rating: number | null; isApproved: boolean; isFlagged: boolean }>) => {
  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter(r => r.isApproved).length;
  const flaggedReviews = reviews.filter(r => r.isFlagged).length;
  const averageRating = calculateAverageRating(reviews.map(r => r.rating));
  const approvalRate = totalReviews > 0 ? (approvedReviews / totalReviews) * 100 : 0;

  return {
    totalReviews,
    approvedReviews,
    flaggedReviews,
    averageRating,
    approvalRate,
  };
};

// Text processing
export const truncateText = (text: string, maxLength: number = UI_CONSTANTS.MAX_DESCRIPTION_LENGTH): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatDateRange = (from: Date | undefined, to: Date | undefined): string => {
  if (!from) return 'Select dates';
  if (!to) return from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  return `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
};

// Image utilities
export const generateImageUrl = (imageId: string, width: number = IMAGE_CONSTANTS.IMAGE_SIZES.WIDTH, height: number = IMAGE_CONSTANTS.IMAGE_SIZES.HEIGHT): string => {
  return `${IMAGE_CONSTANTS.UNSPLASH_BASE_URL}/${imageId}?w=${width}&h=${height}&fit=${IMAGE_CONSTANTS.IMAGE_FIT}`;
};

export const getPropertyImages = (property: { images: string[] }): string[] => {
  return property.images.map(id => generateImageUrl(id));
};
