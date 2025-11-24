import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/Header";
import { Box, Container, useTheme } from "@mui/material";

const Layout = () => {
  const theme = useTheme();
  const location = useLocation();

  const isCardRoute = location.pathname.includes("card") || location.pathname.includes("cards");

  if (isCardRoute) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100%",
        }}
        className="wrapper"
      >
        <Header />
        <Box
          component="main"
          sx={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
          }}
          className="content"
        >
          <Outlet />
        </Box>
        footer
      </Box>
    );
  }

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
