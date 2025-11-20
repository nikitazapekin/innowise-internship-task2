import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AuthState, UserCredentials } from "@store/types/auth";

const initialState: AuthState = {
  users: [],
  currentUser: null,
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<UserCredentials>) => {
      const { email, password } = action.payload;

      const existingUser = state.users.find((user) => user.email === email);

      if (!existingUser) {
        state.users.push({ email, password });
      }
    },
    login: (state, action: PayloadAction<UserCredentials>) => {
      const { email, password } = action.payload;
      const user = state.users.find((user) => user.email === email && user.password === password);

      if (user) {
        state.currentUser = user;
        state.isLoggedIn = true;
        state.token = Math.random().toString(36).substring(2);
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { register, login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
