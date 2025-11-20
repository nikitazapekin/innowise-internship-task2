import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "@components/Input";
import { loginFields } from "@constants";
import { validationRules } from "@constants";
import UserSnackbar from "@hooks/useSnackbar";
import { Alert, Button, Paper, Snackbar, Stack, Typography, useTheme } from "@mui/material";

import { useAppDispatch } from "@store/redux";
import { signIn } from "@store/slices/auth";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { snackbar, showSnackbar, closeSnackbar } = UserSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    try {
      dispatch(signIn({ email: data.email, password: data.password }));
      navigate("/cards");
    } catch {
      showSnackbar("Ошибка входа", "error");
    }
  };

  const handleNavigate = () => {
    navigate("/sign-up");
  };

  const handleChange = (fieldName: keyof FormData, value: string) => {
    const event = {
      target: {
        value: value,
        name: fieldName,
      },
    };

    register(fieldName, validationRules[fieldName]).onChange(event);
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <>
      <Paper elevation={6} sx={{ p: 2, maxWidth: 600, width: "100%", padding: theme.spaces.xxs }}>
        <Typography variant="h2" component="h2" align="center">
          Вход
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2} style={{ marginTop: 10 }}>
            <Input
              field={loginFields[0]}
              value={emailValue ?? ""}
              onChange={(value) => handleChange("email", value)}
            />
            {errors.email && (
              <Typography variant="inherit" component="p" style={{ color: theme.colors.danger }}>
                {errors.email.message}
              </Typography>
            )}

            <Input
              field={loginFields[1]}
              value={passwordValue ?? ""}
              onChange={(value) => handleChange("password", value)}
            />
            {errors.password && (
              <Typography variant="inherit" component="p" style={{ color: theme.colors.danger }}>
                {errors.password.message}
              </Typography>
            )}
          </Stack>
          <Button
            type="submit"
            size="large"
            color="info"
            variant="contained"
            style={{ width: "100%", cursor: "pointer", marginTop: 10 }}
          >
            Войти
          </Button>
        </form>
        <Typography
          variant="inherit"
          component="p"
          align="center"
          style={{ marginTop: 10, cursor: "pointer" }}
          onClick={handleNavigate}
        >
          Зарегистрироваться
        </Typography>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignIn;
