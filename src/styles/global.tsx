import { GlobalStyles } from "@mui/material";

import theme from "./theme";

export const customGlobalStyles = (
  <GlobalStyles
    styles={{
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      body: {
        fontFamily: theme.fontFamilies.primary,
        fontSize: theme.fontSizes.sm,
      },

      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: theme.colors.main,
      },
      "::-webkit-scrollbar-thumb": {
        background: theme.colors.light,
        borderRadius: "4px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: theme.colors.light,
      },
    }}
  />
);
