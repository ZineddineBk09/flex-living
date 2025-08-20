import { ReviewAction, FilterValue, ChannelType } from "@/lib/constants";

// Validation functions
export const isValidReviewId = (id: unknown): id is number => {
  return typeof id === "number" && id > 0 && Number.isInteger(id);
};

export const isValidReviewAction = (action: unknown): action is ReviewAction => {
  return Object.values(ReviewAction).includes(action as ReviewAction);
};

export const isValidFilterValue = (value: unknown): value is FilterValue => {
  return Object.values(FilterValue).includes(value as FilterValue);
};

export const isValidChannelType = (channel: unknown): channel is ChannelType => {
  return Object.values(ChannelType).includes(channel as ChannelType);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

export const isValidDateRange = (
  from: Date | undefined,
  to: Date | undefined
): boolean => {
  if (!from || !to) return false;
  return from < to && from >= new Date();
};

export const isValidPrice = (price: number): boolean => {
  return typeof price === "number" && price >= 0 && !isNaN(price);
};

export const isValidRating = (rating: number | null): boolean => {
  if (rating === null) return true;
  return typeof rating === "number" && rating >= 0 && rating <= 5;
};

// Input sanitization
export const sanitizeString = (input: string): string => {
  return input.trim().replace(/[<>]/g, "");
};

export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const sanitizePhone = (phone: string): string => {
  return phone.replace(/[^\d+]/g, "");
};
