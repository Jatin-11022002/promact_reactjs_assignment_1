// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.profile;
      state.token = action.payload.token;
      //console.log("in login state", state.user, action.payload);
      localStorage.setItem("token", action.payload.token); // Store token in localStorage
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
