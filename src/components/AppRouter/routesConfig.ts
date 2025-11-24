import { CARDS_PAGE, LOGIN_PAGE, MAIN_PAGE, SIGN_UP_PAGE } from "@constants";

import CardsPage from "@pages/Cards";
import SignInPage from "@pages/SignIn";
import SignUpPage from "@pages/SignUp";

export const routes = [
  {
    path: LOGIN_PAGE,
    Component: SignInPage,
    isPrivate: false,
  },
  {
    path: MAIN_PAGE,
    Component: SignInPage,
    isPrivate: false,
  },
  {
    path: SIGN_UP_PAGE,
    Component: SignUpPage,
    isPrivate: false,
  },
  {
    path: CARDS_PAGE,
    Component: CardsPage,
    isPrivate: true,
  },
];
