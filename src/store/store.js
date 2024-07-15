import { configureStore } from "@reduxjs/toolkit";
import userslice from "../_components/slices/registerslice.js";
import loginSlice from "../_components/slices/loginslice.js";

const store = configureStore({
  reducer: {
    userInfo: userslice,
    logininfo: loginSlice,
  },
});

export default store;
