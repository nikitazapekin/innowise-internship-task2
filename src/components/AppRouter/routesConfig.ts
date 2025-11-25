import { CARD_PAGE, CARDS_PAGE, LOGIN_PAGE, MAIN_PAGE, SIGN_UP_PAGE } from "@constants";

import CardPage from "@pages/Card";
import CardsPage from "@pages/Cards";
import SignInPage from "@pages/SignIn";
import SignUpPage from "@pages/SignUp";

export const routes = {
  signIn: {
    path: LOGIN_PAGE,
    Component: SignInPage,
    isPrivate: false,
  },
  main: {
    path: MAIN_PAGE,
    Component: SignInPage,
    isPrivate: false,
  },
  signUp: {
    path: SIGN_UP_PAGE,
    Component: SignUpPage,
    isPrivate: false,
  },
  cards: {
    path: CARDS_PAGE,
    Component: CardsPage,
    isPrivate: true,
  },
  card: {
    path: CARD_PAGE,
    Component: CardPage,
    isPrivate: true,
  },
};
