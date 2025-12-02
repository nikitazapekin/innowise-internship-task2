import { useNavigate } from "react-router-dom";
import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";

import { useAppSelector } from "@store/redux";
import { selectIsLoggedIn } from "@store/selectors/auth";

const Welcome = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsLoggedIn);

  const handleContinue = () => {
    if (isAuthenticated) {
      navigate("/cards");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        maxWidth: 600,
        width: "100%",
        px: theme.spaces.xxs,
        textAlign: "center",
      }}
    >
      <Typography variant="h2" component="h2" align="center" gutterBottom>
        Добро пожаловать!
      </Typography>

      <Typography variant="body1" component="p" align="center" sx={{ mb: 3 }}>
        Нажмите кнопку ниже, чтобы продолжить.
      </Typography>

      <Stack direction="column" spacing={2}>
        <Button
          onClick={handleContinue}
          size="large"
          color="primary"
          variant="contained"
          sx={{
            width: "100%",
            cursor: "pointer",
            mt: 1,
          }}
        >
          Продолжить
        </Button>
      </Stack>
    </Paper>
  );
};

export default Welcome;
