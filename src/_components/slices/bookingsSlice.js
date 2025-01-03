// import { createSlice } from "@reduxjs/toolkit";

// const bookingsSlice = createSlice({
//   name: "bookings",
//   initialState: {
//     bookings: [],
//     count: 0,
//   },
//   reducers: {
//     setBookings(state, action) {
//       state.bookings = action.payload;
//       state.count = action.payload.length;
//     },
//     removeBooking(state, action) {
//       state.bookings = state.bookings.filter(
//         (booking) => booking._id !== action.payload
//       );
//       state.count = state.bookings.length;
//     },
//   },
// });

// export const { setBookings, removeBooking } = bookingsSlice.actions;

// export default bookingsSlice.reducer;

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
