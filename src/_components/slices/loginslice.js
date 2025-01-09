// import { createSlice } from "@reduxjs/toolkit";

// export const loginSlice = createSlice({
//   name: "login",
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     error: null,
//   },
//   reducers: {
//     loginSuccess: (state, { payload }) => {
//       state.user = payload;
//       state.isAuthenticated = true;
//       state.error = null;
//     },
//     loginFailure: (state, { payload }) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.error = payload;
//     },
//   },
// });

// export const { loginSuccess, loginFailure } = loginSlice.actions;
// export default loginSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    loginSuccess: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, { payload }) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = payload;
    },
    clearError: (state) => {
      state.error = null; // Clear the error state
    },
  },
});

export const { loginSuccess, loginFailure, clearError } = loginSlice.actions; // Export clearError action
export default loginSlice.reducer;
