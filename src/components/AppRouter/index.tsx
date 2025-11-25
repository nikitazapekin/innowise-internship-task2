import type { ComponentType, ReactNode } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "@components/Layout";

import { useAppSelector } from "@store/redux";
import { selectIsLoggedIn } from "@store/selectors/auth";

import { routes } from "./routesConfig";

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
          {routes
            .filter((route) => route.isPrivate === false)
            .map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
        </Route>

        <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath="/sign-in" />}>
          {routes
            .filter((route) => route.isPrivate === true)
            .map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
        </Route>

        <Route path="/" element={<Navigate to={isLoggedIn ? "/cards" : "/sign-in"} replace />} />

        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
