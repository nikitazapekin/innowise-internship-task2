import type { AuthState } from "@store/types/auth";

export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;
