import { ERROR_MESSAGES } from '@/lib/constants';

// Custom error classes
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class APIError extends Error {
  public status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

export class BusinessLogicError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessLogicError';
  }
}

// Error handling utilities
export const handleAPIError = (error: unknown): APIError => {
  if (error instanceof APIError) {
    return error;
  }

  if (error instanceof Error) {
    return new APIError(error.message);
  }

  return new APIError(ERROR_MESSAGES.FAILED_TO_PROCESS_REVIEWS);
};

export const handleValidationError = (error: unknown): ValidationError => {
  if (error instanceof ValidationError) {
    return error;
  }

  if (error instanceof Error) {
    return new ValidationError(error.message);
  }

  return new ValidationError('Invalid input provided');
};

export const handleBusinessLogicError = (error: unknown): BusinessLogicError => {
  if (error instanceof BusinessLogicError) {
    return error;
  }

  if (error instanceof Error) {
    return new BusinessLogicError(error.message);
  }

  return new BusinessLogicError('Business logic error occurred');
};

// Async error wrapper
export const withErrorHandling = async <T>(
  operation: () => Promise<T>,
  errorHandler: (error: unknown) => Error
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    throw errorHandler(error);
  }
};

// Error boundary utilities
export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

export const getErrorMessage = (error: unknown): string => {
  if (isError(error)) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
};

// Logging utilities
export const logError = (error: unknown, context?: string): void => {
  const message = getErrorMessage(error);
  const logData = {
    message,
    context,
    timestamp: new Date().toISOString(),
    stack: isError(error) ? error.stack : undefined,
  };

  console.error('Error logged:', logData);
  
  // In production, you might want to send this to a logging service
  // like Sentry, LogRocket, etc.
};

// Error response utilities
export const createErrorResponse = (error: unknown, status: number = 500) => {
  const message = getErrorMessage(error);
  
  return {
    error: message,
    status,
    timestamp: new Date().toISOString(),
  };
};
