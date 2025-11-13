import { CARDS_PAGE, MAIN_PAGE  } from "@constants";
import CardsPage from "@pages/CardsPage";
 
import MainPage from "@pages/MainPage";

export const routes = [
  {
    path: MAIN_PAGE,
    Component: MainPage,
  },
   {
    path: CARDS_PAGE,
    Component: CardsPage,
  },
 
];
