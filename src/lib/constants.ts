// API Constants
export const API_ENDPOINTS = {
  REVIEWS: '/api/reviews/hostaway',
} as const;

// Review Actions
export enum ReviewAction {
  APPROVE = 'approve',
  REJECT = 'reject',
  FLAG = 'flag',
  UNFLAG = 'unflag',
  RESPOND = 'respond',
}

// Filter Values
export enum FilterValue {
  ALL = 'All',
  FIVE_STARS = '5 Stars',
  FOUR_PLUS_STARS = '4+ Stars',
  THREE_PLUS_STARS = '3+ Stars',
  APPROVED = 'Approved',
  PENDING = 'Pending',
  FLAGGED = 'Flagged',
}

// Channel Types
export enum ChannelType {
  HOSTAWAY = 'Hostaway',
  GOOGLE = 'Google',
}

// Property Types
export enum PropertyType {
  APARTMENT = 'Apartment',
  STUDIO = 'Studio',
  HOUSE = 'House',
}

// Amenity Categories
export enum AmenityCategory {
  LIVING_ROOM = 'Living room',
  INTERNET_OFFICE = 'Internet & office',
  BEDROOM_LAUNDRY = 'Bedroom & laundry',
  KITCHEN_DINING = 'Kitchen & dining',
  GENERAL = 'General',
}

// Booking Constants
export const BOOKING_CONSTANTS = {
  DEFAULT_PRICE: 67,
  CLEANING_FEE: 45,
  DISCOUNT_THRESHOLD_DAYS: 10,
  DISCOUNT_PERCENTAGE: 0.1,
  DEFAULT_GUEST_COUNT: 3,
  MAX_GUESTS: 10,
  MIN_GUESTS: 1,
} as const;

// Pricing Constants
export const PRICING_CONSTANTS = {
  BASE_PRICE_MULTIPLIER: 30,
  BASE_PRICE_ADDITION: 50,
} as const;

// UI Constants
export const UI_CONSTANTS = {
  MAX_DESCRIPTION_LENGTH: 300,
  MAX_AMENITIES_DISPLAY: 9,
  IMAGE_GALLERY_HEIGHT: 500,
  STICKY_TOP_OFFSET: 24,
  ZOOM_LEVELS: {
    MIN: 10,
    MAX: 20,
    DEFAULT: 15,
  },
} as const;

// Map Constants
export const MAP_CONSTANTS = {
  DEFAULT_ZOOM: 15,
  MARKER_SIZE: {
    WIDTH: 40,
    HEIGHT: 64,
  },
  ALGIERS_COORDINATES: {
    LAT: 36.7538,
    LNG: 3.0588,
  },
} as const;

// Contact Constants
export const CONTACT_CONSTANTS = {
  WHATSAPP_NUMBER: '+447723745646',
  WHATSAPP_MESSAGE: "Hi! I'm interested in your property. Can you help me with more information?",
  DEFAULT_COUNTRY_CODE: '+44',
} as const;

// Form Constants
export const FORM_CONSTANTS = {
  DEFAULT_FORM_DATA: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '',
    countryCode: '+44',
    stayDates: '',
    specialRequirements: '',
  },
  COUNTRY_CODES: [
    { code: '+44', country: 'UK' },
    { code: '+33', country: 'FR' },
    { code: '+213', country: 'DZ' },
  ],
} as const;

// Image Constants
export const IMAGE_CONSTANTS = {
  UNSPLASH_BASE_URL: 'https://images.unsplash.com',
  IMAGE_SIZES: {
    WIDTH: 1200,
    HEIGHT: 800,
  },
  IMAGE_FIT: 'crop',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  PROPERTY_NOT_FOUND: 'Property not found',
  FAILED_TO_LOAD_PROPERTY: 'Failed to load property',
  FAILED_TO_LOAD_REVIEWS: 'Failed to load reviews',
  FAILED_TO_PROCESS_REVIEWS: 'Failed to process reviews',
  FAILED_TO_UPDATE_REVIEW: 'Failed to update review',
  MISSING_REQUIRED_FIELDS: 'Missing required fields: reviewId and action',
  INVALID_ACTION: 'Invalid action',
  RESPONSE_REQUIRED: 'Response text is required for respond action',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  INQUIRY_SUBMITTED: 'Inquiry submitted successfully',
  COUPON_APPLIED: 'Coupon applied successfully',
  REVIEW_UPDATED: 'Review updated successfully',
} as const;
