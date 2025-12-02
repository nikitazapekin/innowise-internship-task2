import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { validationRules } from "@constants";
import UserSnackbar from "@hooks/useSnackbar";
import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "@store/redux";
import { selectIsError, selectIsSuccess } from "@store/selectors/auth";
import { clearSuccess, signUp } from "@store/slices/auth";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(selectIsError);
  const isSuccess = useAppSelector(selectIsSuccess);
  const { snackbar, showSnackbar, closeSnackbar } = UserSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const password = watch("password");

  useEffect(() => {
    if (isSuccess) {
      showSnackbar("Регистрация успешна! Теперь вы можете войти.", "success");
      dispatch(clearSuccess());
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } else if (error) {
      showSnackbar(error, "error");
    }
  }, [isSuccess, error, navigate, showSnackbar, dispatch]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(signUp({ email: data.email, password: data.password }));
  };

  const handleNavigate = () => {
    navigate("/sign-in");
  };

  return (
    <>
      <Paper
        elevation={6}
        sx={{
          p: 2,
          maxWidth: 600,
          width: "100%",
          px: theme.spaces.xxs,
        }}
      >
        <Typography variant="h2" component="h2" align="center">
          Регистрация
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2} mt={1}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              placeholder="Введите ваш email"
              fullWidth
              required
              {...register("email", validationRules.email)}
            />

            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              placeholder="Введите ваш пароль"
              fullWidth
              required
              {...register("password", validationRules.password)}
            />

            <TextField
              label="Подтвердите пароль"
              type="password"
              variant="outlined"
              placeholder="Повторите ваш пароль"
              fullWidth
              required
              {...register("confirmPassword", {
                required: "Подтверждение пароля обязательно",
                validate: (value) => value === password || "Пароли не совпадают",
              })}
            />

            <Stack height={30} alignItems="center" justifyContent="center">
              {(errors.password || errors.email || errors.confirmPassword) && (
                <Typography
                  variant="body2"
                  component="p"
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {errors.password?.message ||
                    errors.email?.message ||
                    errors.confirmPassword?.message}
                </Typography>
              )}
            </Stack>
          </Stack>
          <Button
            type="submit"
            size="large"
            color="info"
            variant="contained"
            sx={{
              width: "100%",
              cursor: "pointer",
              mt: 1,
            }}
          >
            Зарегистрироваться
          </Button>
        </form>
        <Typography
          variant="inherit"
          component="p"
          align="center"
          sx={{
            mt: 1,
            cursor: "pointer",
          }}
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
