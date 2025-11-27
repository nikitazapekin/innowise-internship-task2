import { useNavigate } from "react-router-dom";
import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";

import { useAppSelector } from "@store/redux";
import { selectIsLoggedIn } from "@store/selectors/auth";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsLoggedIn);

  const handleNavigate = () => {
    if (isAuthenticated) {
      navigate("/cards");
    } else {
      navigate("/");
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
      <Typography
        variant="h1"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          color: theme.palette.text.secondary,
        }}
      >
        404
      </Typography>

      <Typography variant="h2" component="h2" align="center" gutterBottom>
        Страница не найдена
      </Typography>

      <Typography variant="body1" component="p" align="center" sx={{ mb: 3 }}>
        К сожалению, запрашиваемая страница не существует
      </Typography>

      <Stack direction="column" spacing={2}>
        <Button
          onClick={handleNavigate}
          size="large"
          color="primary"
          variant="contained"
          sx={{
            width: "100%",
            cursor: "pointer",
          }}
        >
          {isAuthenticated ? "Перейти к карточкам" : "На главную"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default NotFound;
