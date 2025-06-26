import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loggedUser } = authSlice.actions;
export default authSlice.reducer;
