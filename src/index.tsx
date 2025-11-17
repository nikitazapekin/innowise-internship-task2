import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@components/AppRouter";
import { ThemeProvider } from "@mui/material";
import { customGlobalStyles } from "@styles/global";
import theme from "@styles/theme";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./store";

const root = document.getElementById("root");

if (!root) {
  throw new Error("root not found");
}

const container = createRoot(root);

container.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
          {customGlobalStyles}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
