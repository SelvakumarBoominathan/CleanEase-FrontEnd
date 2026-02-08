/**
 * Application Configuration
 * Centralized configuration for Backend API endpoints, environment variables, and constants
 */

const getBackendURL = () => {
  // Use environment variable if available, otherwise fallback to localhost
  if (import.meta.env.VITE_BE_URL) {
    return import.meta.env.VITE_BE_URL;
  }

  // For development with Docker
  if (import.meta.env.MODE === "docker-dev") {
    return "http://backend:8000"; // Docker service name
  }

  // Default for local development
  return "http://localhost:8000";
};

const API_BASE_URL = getBackendURL();

export const API_CONFIG = {
  // Base URLs
  BASE_URL: API_BASE_URL,
  API_URL: `${API_BASE_URL}/api`,

  // Auth Endpoints
  AUTH: {
    REGISTER: "/register",
    LOGIN: "/login",
    LOGOUT: "/logout",
    REFRESH_TOKEN: "/refresh-token",
    VERIFY_EMAIL: "/verify-email",
    RESEND_EMAIL: "/resend-email",
    SEND_OTP: "/registermail",
    VALIDATE_OTP: "/otpvalidation",
    AUTHENTICATE: "/authenticate",
    RESET_PASSWORD: "/resetPassword",
  },

  // Employee Endpoints
  EMPLOYEES: {
    GET_ALL: "/employees",
    GET_BY_ID: "/employees",
    GET_SEARCH: "/employees/search",
    ADD: "/addemployee",
    UPDATE: "/updateEmployee",
    DELETE: "/deleteEmployee",
  },

  // Booking Endpoints
  BOOKINGS: {
    ADD: "/booking",
    GET: "/bookings",
    CANCEL: "/removeBooking",
    CARTPAGE: "/Cartpage",
  },

  // Rating & Review Endpoints
  REVIEWS: {
    ADD: "/rating",
    GET: "/reviews",
  },

  // User Endpoints
  USERS: {
    GET_DETAILS: "/user",
    UPDATE_PROFILE: "/user/update",
  },
};

// API Timeout (in milliseconds)
export const API_TIMEOUT = 30000;

// JWT Token Storage Key
export const TOKEN_KEY = "authToken";
export const USER_KEY = "userData";

// Pagination Defaults
export const PAGINATION = {
  PAGE_SIZE: 12,
  DEFAULT_PAGE: 1,
};

// App Constants
export const APP_CONSTANTS = {
  APP_NAME: "CleanEase",
  APP_VERSION: "1.0.0",
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
};

// OTP & Password Reset
export const SECURITY = {
  OTP_EXPIRY_MINUTES: 5,
  MAX_LOGIN_ATTEMPTS: 5,
  PASSWORD_MIN_LENGTH: 8,
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
};

// UI Configuration
export const UI_CONFIG = {
  TOAST_DURATION: 3000,
  MODAL_ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
};

// Feature Flags
export const FEATURES = {
  ENABLE_SOCIAL_LOGIN: false,
  ENABLE_TWO_FACTOR_AUTH: false,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: false,
};

export default API_CONFIG;
