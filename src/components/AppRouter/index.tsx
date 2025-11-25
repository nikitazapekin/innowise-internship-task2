import type { ComponentType, ReactNode } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "@components/Layout";
import { CARD_PAGE, CARDS_PAGE, LOGIN_PAGE, MAIN_PAGE, SIGN_UP_PAGE } from "@constants/routes";

import CardPage from "@pages/Card";
import CardsPage from "@pages/Cards";
import SignInPage from "@pages/SignIn";
import SignUpPage from "@pages/SignUp";
import { useAppSelector } from "@store/redux";
import { selectIsLoggedIn } from "@store/selectors/auth";

export interface AuthUser {
  id: string;
  name: string;
  permissions: string[];
  roles: string[];
}

export interface ProtectedRouteProps {
  isAllowed: boolean;
  redirectPath?: string;
  children?: ReactNode;
}

export interface RouteConfig {
  path: string;
  Component: ComponentType;
  isPrivate?: boolean;
  requiredPermission?: string;
  requiredRole?: string;
}

const ProtectedRoute = ({
  isAllowed,
  redirectPath = "/sign-in",
  children,
}: ProtectedRouteProps) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/cards" />}>
          <Route path={LOGIN_PAGE} element={<SignInPage />} />
          <Route path={SIGN_UP_PAGE} element={<SignUpPage />} />
          <Route path={MAIN_PAGE} element={<SignInPage />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath="/sign-in" />}>
          <Route path={CARDS_PAGE} element={<CardsPage />} />
          <Route path={CARD_PAGE} element={<CardPage />} />
        </Route>

        <Route path="/" element={<Navigate to={isLoggedIn ? CARDS_PAGE : LOGIN_PAGE} replace />} />

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
