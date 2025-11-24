import { Box, Button, Paper, Typography } from "@mui/material";
import theme from "@styles/theme";

import { useAppDispatch } from "@store/redux";
import { clearAll } from "@store/slices/auth";

const Header = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearAll());
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 2,
        width: "100%",
        backgroundColor: theme.colors.main,
        color: theme.colors.white,
      }}
    >
      <Box
        sx={{
          maxWidth: theme.containers.lg,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: theme.spaces.xxs,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontFamily: theme.fontFamilies.primary,
            fontSize: theme.fontSizes.md,
          }}
        >
          Dummy App
        </Typography>

        <Button
          variant="outlined"
          sx={{
            color: theme.colors.white,
            borderColor: theme.colors.white,
            fontSize: theme.fontSizes.xxs,
            fontFamily: theme.fontFamilies.primary,
          }}
          onClick={handleLogout}
        >
          Выйти
        </Button>
      </Box>
    </Paper>
  );
};

export default Header;
