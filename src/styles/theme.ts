import { createTheme } from "@mui/material";

const theme = createTheme({
  colors: {
    primary: "#ff0000",
    danger: "#ff0000",
    success: "#4caf50",
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    white: "#fff",
    black: "#000",
  },

  fontFamilies: {
    primary: '"Inter", sans-serif',
    secondary: '"Georgia", serif',
    monospace: '"Fira Code",  monospace',
  },

  fontSizes: {
    xxs: 14,
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

  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontSize: 32,
      fontWeight: 600,
    },
    h2: {
      fontSize: 28,
      fontWeight: 600,
    },
    h3: {
      fontSize: 24,
      fontWeight: 600,
    },
    h4: {
      fontSize: 20,
      fontWeight: 500,
    },
    h5: {
      fontSize: 18,
      fontWeight: 500,
    },
    h6: {
      fontSize: 16,
      fontWeight: 500,
    },
    body1: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.4,
    },
  },
});

export default theme;
