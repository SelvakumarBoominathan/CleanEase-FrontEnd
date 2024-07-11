import { createSlice } from "@reduxjs/toolkit";

//Reducer function
export const userSlice = createSlice({
  name: "users",
  initialState: { users: [] },
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
