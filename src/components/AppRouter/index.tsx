import type { ReactNode } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "@components/Layout";
import NotFound from "@components/NotFound";
import Welcome from "@components/Welcome";
import { CARD_PAGE, CARDS_PAGE, LOGIN_PAGE, SIGN_UP_PAGE } from "@constants/routes";

import CardPage from "@pages/Card";
import CardsPage from "@pages/Cards";
import SignInPage from "@pages/SignIn";
import SignUpPage from "@pages/SignUp";
import { useAppSelector } from "@store/redux";
import { selectIsLoggedIn } from "@store/selectors/auth";

export interface ProtectedRouteProps {
  redirectPath?: string;
  children?: ReactNode;
  isPublic?: boolean;
}

const ProtectedRoute = ({ redirectPath = "/sign-in", children }: ProtectedRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

const PublicRoute = ({ redirectPath = "/cards", children }: ProtectedRouteProps) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route path={LOGIN_PAGE} element={<SignInPage />} />
          <Route path={SIGN_UP_PAGE} element={<SignUpPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path={CARDS_PAGE} element={<CardsPage />} />
          <Route path={CARD_PAGE} element={<CardPage />} />
        </Route>

        <Route path="/" element={<Welcome />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
