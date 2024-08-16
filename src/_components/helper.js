// // end points to make get post requests from front end

// //Make api request

// //authenticate function
// export async function authenticate(username) {
//   try {
//     // Send a POST request to the /api/authenticate endpoint with the username
//     return await axios.post("/api/authenticate", { username });
//   } catch (error) {
//     return { error: "Username doesn't exist...!" };
//   }
// }

// //get User details after authentication (above)

// export async function getuser({ username }) {
//   try {
//     //get the data of the user using axios get and destructured in an object
//     const { data } = await axios.get(`/api/user/${username}`);
//     return { data };
//   } catch (error) {
//     return { error: "Password does not match...!" };
//   }
// }

//function for user registration
import axios from "axios";

const baseURL = "http://localhost:8000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Error logging in user:", error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

// Login user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/login`, userData);
    console.log("login successful");

    //storing token in localstorage
    const { token } = response.data;
    localStorage.setItem("authToken", token);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Error logging in user:", error.response.data);
    } else if (error.request) {
      // Request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};

// Send OTP to email for password change
export const sendRegisterMail = async (email) => {
  try {
    const response = await axios.post(`${baseURL}/registermail`, { email });
    return response.data;
  } catch (error) {
    console.error(
      "Error sending register mail:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Authenticate user
export const authenticateUser = async (username) => {
  try {
    const response = await axios.post(`${baseURL}/authenticate`, { username });
    return response.data;
  } catch (error) {
    console.error("Error authenticating user:", error.response.data);
    throw error;
  }
};

// OTP validation route
export const validateOTP = async (otp) => {
  try {
    const response = await axios.post(`${baseURL}/otpvalidation`, { otp });
    return response.data;
  } catch (error) {
    console.error("Error validating OTP:", error.response.data);
    throw error;
  }
};

// Get user details
export const getUserDetails = async (username) => {
  try {
    const response = await axios.get(`${baseURL}/user/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user details:", error.response.data);
    throw error;
  }
};

// Reset password
export const resetPassword = async (resetData) => {
  try {
    const response = await axios.patch(`${baseURL}/resetPassword`, resetData);
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error.response.data);
    throw error;
  }
};

//get Employees

export const getAllEmployee = async () => {
  try {
    const response = await fetch(`${baseURL}/employees`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

//Delete Employee
