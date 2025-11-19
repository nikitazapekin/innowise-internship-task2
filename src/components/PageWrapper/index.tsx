import { Container, useTheme } from "@mui/material";

import type { PageWrapperProps } from "./interfaces";

const PageWrapper = ({ children }: PageWrapperProps) => {
  const theme = useTheme();

  return (
    <Container
      component="main"
      disableGutters
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {children}
    </Container>
  );
};

export default PageWrapper;
