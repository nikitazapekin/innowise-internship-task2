export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  password: string;
}

export interface AuthState {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}
