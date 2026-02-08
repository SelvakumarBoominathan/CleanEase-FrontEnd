/**
 * API Service - All Backend API calls
 * Refactored to work with Backend-2 responses
 * Implements proper error handling and response formatting
 */

import apiClient from "../services/apiClient.js";
import { API_CONFIG } from "../config/config.js";
import { handleApiError, logError } from "../utils/errorHandler.js";
import toast from "react-hot-toast";

/**
 * AUTHENTICATION ENDPOINTS
 */

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise}
 */
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post(API_CONFIG.AUTH.REGISTER, userData);
    toast.success(response.msg || "Registration successful!");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Registration failed";
    toast.error(errorMsg);
    logError("registerUser", error);
    throw error;
  }
};

/**
 * Login user
 * @param {Object} credenti als - Username and password
 * @returns {Promise}
 */
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post(API_CONFIG.AUTH.LOGIN, credentials);

    // Store token if provided
    if (response.data?.token) {
      localStorage.setItem("authToken", response.data.token);
    }

    toast.success(response.msg || "Login successful!");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Login failed";
    toast.error(errorMsg);
    logError("loginUser", error);
    throw error;
  }
};

/**
 * Logout user
 */
export const logoutUser = () => {
  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("bookings");
    toast.success("Logged out successfully");
  } catch (error) {
    logError("logoutUser", error);
  }
};

/**
 * Send OTP to email for password reset
 * @param {string} email - User email
 * @returns {Promise}
 */
export const sendPasswordResetOTP = async (email) => {
  try {
    const response = await apiClient.post(API_CONFIG.AUTH.SEND_OTP, { email });
    toast.success(response.msg || "OTP sent to your email");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Failed to send OTP";
    toast.error(errorMsg);
    logError("sendPasswordResetOTP", error);
    throw error;
  }
};

/**
 * Validate OTP
 * @param {string} otp - OTP code
 * @returns {Promise}
 */
export const validateOTP = async (otp) => {
  try {
    const response = await apiClient.post(API_CONFIG.AUTH.VALIDATE_OTP, {
      otp,
    });
    toast.success(response.msg || "OTP validated successfully");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Invalid OTP";
    toast.error(errorMsg);
    logError("validateOTP", error);
    throw error;
  }
};

/**
 * Authenticate user (for password reset flow)
 * @param {string} username - Username
 * @returns {Promise}
 */
export const authenticateUser = async (username) => {
  try {
    const response = await apiClient.post(API_CONFIG.AUTH.AUTHENTICATE, {
      username,
    });
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Authentication failed";
    toast.error(errorMsg);
    logError("authenticateUser", error);
    throw error;
  }
};

/**
 * Reset password
 * @param {Object} resetData - Reset password data (username, newPassword, etc.)
 * @returns {Promise}
 */
export const resetPassword = async (resetData) => {
  try {
    const response = await apiClient.patch(
      API_CONFIG.AUTH.RESET_PASSWORD,
      resetData,
    );
    toast.success(response.msg || "Password reset successful!");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Password reset failed";
    toast.error(errorMsg);
    logError("resetPassword", error);
    throw error;
  }
};

/**
 * EMPLOYEE ENDPOINTS
 */

/**
 * Get all employees with pagination
 * @param {number} page - Page number
 * @param {number} limit - Items per page
 * @returns {Promise}
 */
export const getAllEmployees = async (page = 1, limit = 12) => {
  try {
    const response = await apiClient.get(
      `${API_CONFIG.EMPLOYEES.GET_ALL}?page=${page}&limit=${limit}`,
    );
    return response;
  } catch (error) {
    logError("getAllEmployees", error);
    throw error;
  }
};

/**
 * Get employee by ID
 * @param {string} id - Employee ID
 * @returns {Promise}
 */
export const getEmployeeById = async (id) => {
  try {
    const response = await apiClient.get(
      `${API_CONFIG.EMPLOYEES.GET_BY_ID}/${id}`,
    );
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Failed to fetch employee";
    toast.error(errorMsg);
    logError("getEmployeeById", error);
    throw error;
  }
};

/**
 * Search employees
 * @param {string} query - Search query
 * @returns {Promise}
 */
export const searchEmployees = async (query) => {
  try {
    const response = await apiClient.get(
      `${API_CONFIG.EMPLOYEES.GET_SEARCH}?q=${encodeURIComponent(query)}`,
    );
    return response;
  } catch (error) {
    logError("searchEmployees", error);
    throw error;
  }
};

/**
 * Add new employee (Admin only)
 * @param {Object} employeeData - Employee data
 * @returns {Promise}
 */
export const addEmployee = async (employeeData) => {
  try {
    const response = await apiClient.post(
      API_CONFIG.EMPLOYEES.ADD,
      employeeData,
    );
    toast.success(response.msg || "Employee added successfully!");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Failed to add employee";
    toast.error(errorMsg);
    logError("addEmployee", error);
    throw error;
  }
};

/**
 * Update employee (Admin only)
 * @param {string} id - Employee ID
 * @param {Object} employeeData - Updated employee data
 * @returns {Promise}
 */
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await apiClient.put(
      `${API_CONFIG.EMPLOYEES.UPDATE}/${id}`,
      employeeData,
    );
    toast.success(response.msg || "Employee updated successfully!");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Failed to update employee";
    toast.error(errorMsg);
    logError("updateEmployee", error);
    throw error;
  }
};

/**
 * Delete employee (Admin only)
 * @param {string} id - Employee ID
 * @returns {Promise}
 */
export const deleteEmployee = async (id) => {
  try {
    const response = await apiClient.delete(
      `${API_CONFIG.EMPLOYEES.DELETE}/${id}`,
    );
    toast.success(response.msg || "Employee deleted successfully!");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Failed to delete employee";
    toast.error(errorMsg);
    logError("deleteEmployee", error);
    throw error;
  }
};

/**
 * REVIEW & RATING ENDPOINTS
 */

/**
 * Add review and rating
 * @param {Object} reviewData - Review data
 * @returns {Promise}
 */
export const addReviewAndRating = async (reviewData) => {
  try {
    const response = await apiClient.post(API_CONFIG.REVIEWS.ADD, reviewData);
    toast.success(response.msg || "Review submitted successfully!");
    return response;
  } catch (error) {
    if (error.response?.status === 409) {
      toast.error("You have already submitted a review for this employee");
    } else {
      const errorMsg = error.response?.data?.msg || "Failed to submit review";
      toast.error(errorMsg);
    }
    logError("addReviewAndRating", error);
    throw error;
  }
};

/**
 * BOOKING ENDPOINTS
 */

/**
 * Add booking
 * @param {Object} bookingData - Booking data
 * @returns {Promise}
 */
export const addBooking = async (bookingData) => {
  try {
    const response = await apiClient.post(API_CONFIG.BOOKINGS.ADD, bookingData);
    toast.success(response.msg || "Booking successful!");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Booking failed";
    toast.error(errorMsg);
    logError("addBooking", error);
    throw error;
  }
};

/**
 * Get user bookings
 * @returns {Promise}
 */
export const getUserBookings = async () => {
  try {
    const response = await apiClient.get(API_CONFIG.BOOKINGS.GET);
    return response;
  } catch (error) {
    logError("getUserBookings", error);
    throw error;
  }
};

/**
 * Get cart page data
 * @returns {Promise}
 */
export const getCartPageData = async () => {
  try {
    const response = await apiClient.get(API_CONFIG.BOOKINGS.CARTPAGE);
    return response;
  } catch (error) {
    logError("getCartPageData", error);
    throw error;
  }
};

/**
 * Cancel booking
 * @param {Object} bookingData - Booking data to cancel
 * @returns {Promise}
 */
export const cancelBooking = async (bookingData) => {
  try {
    const response = await apiClient.post(
      API_CONFIG.BOOKINGS.CANCEL,
      bookingData,
    );
    toast.success(response.msg || "Booking cancelled successfully!");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Failed to cancel booking";
    toast.error(errorMsg);
    logError("cancelBooking", error);
    throw error;
  }
};

/**
 * USER ENDPOINTS
 */

/**
 * Get user details
 * @param {string} username - Username
 * @returns {Promise}
 */
export const getUserDetails = async (username) => {
  try {
    const response = await apiClient.get(
      `${API_CONFIG.USERS.GET_DETAILS}/${username}`,
    );
    return response;
  } catch (error) {
    logError("getUserDetails", error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {Object} profileData - Profile data to update
 * @returns {Promise}
 */
export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.put(
      API_CONFIG.USERS.UPDATE_PROFILE,
      profileData,
    );
    toast.success(response.msg || "Profile updated successfully!");
    return response;
  } catch (error) {
    const errorMsg = error.response?.data?.msg || "Failed to update profile";
    toast.error(errorMsg);
    logError("updateUserProfile", error);
    throw error;
  }
};
