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
  },
});

export const { loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;
