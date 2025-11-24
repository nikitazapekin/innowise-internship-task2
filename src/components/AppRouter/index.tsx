import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@components/Layout";

import { useAppSelector } from "@store/redux";
import { selectIsLoggedIn } from "@store/selectors/auth";

import { routes } from "./routesConfig";

const AppRoutes = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ path, Component, isPrivate }) => {
          if (isPrivate && !isLoggedIn) {
            return <Route key={path} path={path} element={<Navigate to="/sign-in" replace />} />;
          }

          if (isPrivate === false && isLoggedIn) {
            return <Route key={path} path={path} element={<Navigate to="/cards" replace />} />;
          }

          return <Route key={path} path={path} element={<Component />} />;
        })}

        <Route path="/" element={<Navigate to={isLoggedIn ? "/cards" : "/sign-in"} replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
