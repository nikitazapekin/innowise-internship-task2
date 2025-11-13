import { createTheme } from "@mui/material";

const theme = createTheme({
  colors: {
    primary: "#ff0000",
    danger: "#ff0000",
    success: "#4caf50",
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
  },

  fontFamilies: {
    primary: '"Inter", sans-serif',
    secondary: '"Georgia", serif',
    monospace: '"Fira Code",  monospace',
  },

  fontSizes: {
    xs: 18,
    sm: 24,
    md: 28,
    lg: 32,
  },

  containers: {
    md: 1200,
    lg: 1400,
  },

  breakpoint: {
    mobile: 400,
    tablet: 768,
    smallLaptop: 1024,
    desktop: 1400,
  },

  spaces: {
    xxs: 5,

    sm: 20,
    md: 40,
    lg: 80,
    xl: 100,
    xxl: 200,
    xxxl: 300,
  },
});

export default theme;
