export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  users: UserCredentials[];
  currentUser: UserCredentials | null;
  isLoggedIn: boolean;
  token: string | null;
}
