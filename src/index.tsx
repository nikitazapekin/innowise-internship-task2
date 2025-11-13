import AppRoutes from "@components/AppRouter";
import { Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import theme from "@styles/theme";
const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

container.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  </BrowserRouter>
);
