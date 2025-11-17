export interface User {
  email: string;
  password: string;
}

export interface AuthState {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
  token: string | null;
}
