/**
 * API Service - Axios Configuration with Interceptors
 * Handles all HTTP requests to the backend with automatic token management
 * and unified error handling
 */

import axios from "axios";
import { API_CONFIG, API_TIMEOUT, TOKEN_KEY } from "../config/config.js";
import { handleApiError } from "../utils/errorHandler.js";
import toast from "react-hot-toast";

/**
 * Create Axios instance with base configuration
 */
const apiClient = axios.create({
  baseURL: API_CONFIG.API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "X-App-Version": "1.0.0",
  },
});

/**
 * Request Interceptor - Add authorization token to headers
 * Automatically includes JWT token in request headers if user is authenticated
 */
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error adding auth token to request:", error);
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

/**
 * Response Interceptor - Handle responses and errors uniformly
 * Handles token expiration, error responses, and logout scenarios
 */
apiClient.interceptors.response.use(
  (response) => {
    // Success response
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;

      // Unauthorized - Token expired or invalid
      if (status === 401) {
        // Clear auth data
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem("userData");

        // Redirect to login
        window.location.href = "/Login";

        // Show error message
        toast.error("Session expired. Please login again.");
      }

      // Forbidden - User doesn't have permission
      if (status === 403) {
        toast.error("You don't have permission to perform this action.");
      }

      // Validation error
      if (status === 400) {
        const errorMsg =
          data.msg || "Invalid request. Please check your input.";
        toast.error(errorMsg);
      }

      // Not found
      if (status === 404) {
        toast.error("Resource not found.");
      }

      // Conflict (409) - usually duplicate data
      if (status === 409) {
        const errorMsg = data.msg || "Resource already exists.";
        toast.error(errorMsg);
      }

      // Server error
      if (status >= 500) {
        toast.error("Server error. Please try again later.");
      }
    } else if (error.request) {
      // Request made but no response
      toast.error("No response from server. Please check your connection.");
    } else {
      // Error in request setup
      toast.error("Error setting up request. Please try again.");
    }

    return Promise.reject(error);
  },
);

export default apiClient;

/**
 * Utility function to handle API calls with proper error handling
 * @param {Function} apiCall - The API call function
 * @param {string} errorMessage - Custom error message to show if call fails
 * @returns {Promise}
 */
export const executeApiCall = async (
  apiCall,
  errorMessage = "Operation failed",
) => {
  try {
    const response = await apiCall();
    return response;
  } catch (error) {
    console.error(errorMessage, error);
    throw error;
  }
};
