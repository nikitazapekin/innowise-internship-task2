import { Route, Routes } from "react-router-dom";
import Layout from "@components/Layout";

import { routes } from "./routesConfig";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
