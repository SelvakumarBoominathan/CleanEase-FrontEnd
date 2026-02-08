/**
 * Error Handler Utility
 * Centralized error handling, formatting, and logging for the application
 */

/**
 * API Error Class - Custom error for API responses
 */
export class ApiError extends Error {
  constructor(message, statusCode, data = null) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * Validation Error Class
 */
export class ValidationError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.name = "ValidationError";
    this.fields = fields;
  }
}

/**
 * Parse and format API error responses
 * @param {Error} error - The error object from axios
 * @returns {Object} Formatted error object
 */
export const handleApiError = (error) => {
  console.error("[API Error]", error);

  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    const message = data?.msg || data?.message || "An error occurred";

    return {
      success: false,
      statusCode: status,
      message,
      data: data || null,
      isApiError: true,
    };
  }

  if (error.request) {
    // Request was made but no response
    return {
      success: false,
      statusCode: 0,
      message: "No response from server. Please check your connection.",
      isNetworkError: true,
    };
  }

  // Error in request setup
  return {
    success: false,
    statusCode: 0,
    message: error.message || "An unexpected error occurred",
    isClientError: true,
  };
};

/**
 * Format validation errors
 * @param {Object} errors - Validation error object
 * @returns {Object} Formatted errors
 */
export const formatValidationErrors = (errors) => {
  if (Array.isArray(errors)) {
    return {
      message: errors[0]?.message || "Validation failed",
      fields: errors.reduce((acc, error) => {
        if (error.path) {
          acc[error.path[0]] = error.message;
        }
        return acc;
      }, {}),
    };
  }

  return {
    message: "Validation failed",
    fields: errors,
  };
};

/**
 * Get user-friendly error message
 * @param {Error|Object} error - The error object
 * @returns {string} User-friendly message
 */
export const getErrorMessage = (error) => {
  if (typeof error === "string") return error;

  if (error?.response?.data?.msg) return error.response.data.msg;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;

  return "Something went wrong. Please try again.";
};

/**
 * Log error with context
 * @param {string} context - Where the error occurred
 * @param {Error} error - The error object
 * @param {Object} additionalData - Additional context data
 */
export const logError = (context, error, additionalData = {}) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: getErrorMessage(error),
    stack: error?.stack,
    ...additionalData,
  };

  console.error("[Error Log]", errorLog);

  // In production, you could send this to an error tracking service
  // like Sentry, LogRocket, etc.
  if (import.meta.env.PROD) {
    // sendToErrorTrackingService(errorLog);
  }
};

/**
 * Check if error is network related
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return (
    !error?.response &&
    (error?.code === "ECONNABORTED" ||
      error?.code === "ENOTFOUND" ||
      error?.message?.includes("Network"))
  );
};

/**
 * Check if error is authentication related
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isAuthError = (error) => {
  return error?.response?.status === 401 || error?.response?.status === 403;
};

/**
 * Check if error is validation related
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isValidationError = (error) => {
  return error?.response?.status === 400;
};

/**
 * Retry failed API calls with exponential backoff
 * @param {Function} apiCall - The API call function
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} initialDelay - Initial delay in milliseconds
 * @returns {Promise}
 */
export const retryApiCall = async (
  apiCall,
  maxRetries = 3,
  initialDelay = 1000,
) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx) except 429 (Too Many Requests)
      if (
        error?.response?.status >= 400 &&
        error?.response?.status < 500 &&
        error?.response?.status !== 429
      ) {
        throw error;
      }

      // Calculate exponential backoff delay
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
};
