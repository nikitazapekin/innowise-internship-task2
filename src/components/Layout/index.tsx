import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/Header";
import { Container, Stack, useTheme } from "@mui/material";

const Layout = () => {
  const theme = useTheme();
  const location = useLocation();

  const isCardRoute = location.pathname.includes("card") || location.pathname.includes("cards");

  if (isCardRoute) {
    return (
      <Stack
        direction="column"
        sx={{
          minHeight: "100vh",
          width: "100%",
        }}
        className="wrapper"
      >
        <Header />
        <Stack
          component="main"
          direction="column"
          sx={{
            flex: "1 1 auto",
          }}
          className="content"
        >
          <Outlet />
        </Stack>
      </Stack>
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
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Stack>
    </Container>
  );
};

export default Layout;
