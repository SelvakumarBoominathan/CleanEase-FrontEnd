import { configureStore } from "@reduxjs/toolkit";
import userslice from "../_components/slices/registerslice.js";

const store = configureStore({
  reducer: {
    userInfo: userslice,
  },
});

export default store;