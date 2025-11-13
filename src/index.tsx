import AppRoutes from "@components/AppRouter";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

container.render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
