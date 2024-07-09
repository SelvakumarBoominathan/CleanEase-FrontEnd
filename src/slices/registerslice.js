import { createSlice } from "@reduxjs/toolkit";

//setting initial state to store the user details
const initialState = {
  users: [],
};

//Reducer function
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      //updating state
      state.users = [...state.users, payload];
    },
  },
});

//setting actions
export const { setUsers } = userSlice.actions;

//creating reducer

export default userSlice.reducer;
