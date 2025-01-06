import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    count: 0,
  },
  reducers: {
    setBookingCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setBookingCount } = bookingSlice.actions;
export default bookingSlice.reducer;
