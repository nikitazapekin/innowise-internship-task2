import { Outlet } from "react-router-dom";
import { Container, useTheme } from "@mui/material";

const Layout = () => {
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
      <Outlet />
    </Container>
  );
};

export default Layout;
