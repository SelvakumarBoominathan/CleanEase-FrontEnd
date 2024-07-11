import { configureStore } from "@reduxjs/toolkit";
import userslice from "../slices/registerslice.js"

const store = configureStore({
    reducer:{
      userInfo : userslice
    }
})
