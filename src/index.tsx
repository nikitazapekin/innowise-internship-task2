import AppRoutes from "@components/AppRouter";
 
import {  ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import theme from "@styles/theme";
import { customGlobalStyles } from "@styles/global";
const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

container.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AppRoutes />
      {customGlobalStyles}
    </ThemeProvider>
  </BrowserRouter>
);
