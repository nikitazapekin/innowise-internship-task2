import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "@components/Input";
import { registerFields } from "@constants";
import UserSnackbar from "@hooks/useSnackbar";
import { Alert, Button, Paper, Snackbar, Stack, Typography, useTheme } from "@mui/material";

import { useAppDispatch } from "@store/redux";
import { register as registerAction } from "@store/slices/auth";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
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
      dispatch(registerAction({ email: data.email, password: data.password }));
      showSnackbar("Регистрация успешна! Теперь вы можете войти.", "success");
    } catch {
      showSnackbar("Ошибка регистрации", "error");
    }
  };

  const handleNavigate = () => {
    navigate("/sign-in");
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  return (
    <>
      <Paper elevation={6} sx={{ p: 2, maxWidth: 600, width: "100%", padding: theme.spaces.xxs }}>
        <Typography variant="h2" component="h2" align="center">
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2} style={{ marginTop: 10 }}>
            <Input
              field={registerFields[0]}
              value={emailValue ?? ""}
              onChange={(value) => {
                const event = {
                  target: {
                    value: value,
                    name: "email",
                  },
                };

                register("email", {
                  required: "Email обязателен для заполнения",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Введите корректный email",
                  },
                }).onChange(event);
              }}
            />
            {errors.email && (
              <Typography variant="inherit" component="p" style={{ color: theme.colors.danger }}>
                {errors.email.message}
              </Typography>
            )}

            <Input
              field={registerFields[1]}
              value={passwordValue ?? ""}
              onChange={(value) => {
                const event = {
                  target: {
                    value: value,
                    name: "password",
                  },
                };

                register("password", {
                  required: "Пароль обязателен для заполнения",
                  minLength: {
                    value: 6,
                    message: "Пароль должен содержать минимум 6 символов",
                  },
                }).onChange(event);
              }}
            />
            {errors.password && (
              <Typography variant="inherit" component="p" style={{ color: theme.colors.danger }}>
                {errors.password.message}
              </Typography>
            )}

            <Input
              field={registerFields[2]}
              value={confirmPasswordValue ?? ""}
              onChange={(value) => {
                const event = {
                  target: {
                    value: value,
                    name: "confirmPassword",
                  },
                };

                register("confirmPassword", {
                  required: "Подтверждение пароля обязательно",
                  validate: (value) => value === watch("password") || "Пароли не совпадают",
                }).onChange(event);
              }}
            />
            {errors.confirmPassword && (
              <Typography variant="inherit" component="p" style={{ color: theme.colors.danger }}>
                {errors.confirmPassword.message}
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
            Зарегистрироваться
          </Button>
        </form>
        <Typography
          variant="inherit"
          component="p"
          align="center"
          style={{ marginTop: 10, cursor: "pointer" }}
          onClick={handleNavigate}
        >
          Войти
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

export default SignUp;
