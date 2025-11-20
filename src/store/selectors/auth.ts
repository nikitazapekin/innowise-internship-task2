import type { AuthState } from "@store/types/auth";

export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;
export const selectIsSuccess = (state: { auth: AuthState }) => state.auth.isSuccess;
export const selectIsError = (state: { auth: AuthState }) => state.auth.error;
