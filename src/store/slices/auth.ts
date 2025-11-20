import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { AuthState, UserCredentials } from "@store/types/auth";

const initialState: AuthState = {
  users: [],
  currentUser: null,
  isLoggedIn: false,
  token: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action: PayloadAction<UserCredentials>) => {
      const { email, password } = action.payload;

      const existingUser = state.users.find((user) => user.email === email);

      if (existingUser) {
        state.error = "Пользователь с таким email уже существует";
        state.isSuccess = false;
      } else {
        state.users.push({ email, password });
        state.isSuccess = true;
        state.error = null;
      }

      state.isLoading = false;
    },
    signIn: (state, action: PayloadAction<UserCredentials>) => {
      const { email, password } = action.payload;
      const user = state.users.find((user) => user.email === email && user.password === password);

      if (user) {
        state.currentUser = user;
        state.isLoggedIn = true;
        state.token = Math.random().toString(36).substring(2);
        state.error = null;
      } else {
        state.error = "Неверный email или пароль";
      }

      state.isLoading = false;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.isLoggedIn = false;
      state.isSuccess = false;
      state.error = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.isSuccess = false;
    },
    clearAll: (state) => {
      state.isSuccess = false;
      state.isLoggedIn = false;
      state.token = null;
      state.currentUser = null;
    },
  },
});

export const { signUp, signIn, logout, setToken, setLoading, clearError, clearSuccess, clearAll } =
  authSlice.actions;
export default authSlice.reducer;
