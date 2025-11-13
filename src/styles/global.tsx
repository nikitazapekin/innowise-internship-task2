import {  GlobalStyles } from "@mui/material";
import theme from "./theme";

const customGlobalStyles = (
  <GlobalStyles
    styles={{
      "*": {
        boxSizing: "border-box",
      },
      body: {
        scrollBehavior: "smooth",
        textRendering: "optimizeSpeed",
    
      },

      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-track": {
        background: theme.palette.background.default,
      },
      "::-webkit-scrollbar-thumb": {
        background: theme.palette.primary.main,
        borderRadius: "4px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: theme.palette.primary.dark,
      },
    }}
  />
);
