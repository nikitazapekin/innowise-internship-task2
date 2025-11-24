import { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "@components/Input";
import { validationRules } from "@constants";
import UserSnackbar from "@hooks/useSnackbar";
import { Alert, Button, Paper, Snackbar, Stack, Typography, useTheme } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@store/redux";
import { selectIsError, selectIsLoggedIn } from "@store/selectors/auth";
import { clearSuccess, signIn } from "@store/slices/auth";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { snackbar, showSnackbar, closeSnackbar } = UserSnackbar();
  const error = useAppSelector(selectIsError);
  const isSuccess = useAppSelector(selectIsLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(signIn({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (isSuccess) {
      showSnackbar("Авторизация успешна", "success");
      dispatch(clearSuccess());
      setTimeout(() => {
        navigate("/cards");
      }, 2000);
    } else if (error) {
      showSnackbar(error, "error");
    }
  }, [isSuccess, error, navigate, showSnackbar, dispatch]);

  const handleNavigate = () => {
    navigate("/sign-up");
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
          Вход
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2} mt={1}>
            <Input
              label="Email"
              type="email"
              placeholder="Введите ваш email"
              {...register("email", validationRules.email)}
            />

            <Input
              label="Пароль"
              type="password"
              placeholder="Введите ваш пароль"
              {...register("password", validationRules.password)}
            />

            <Stack height={30} alignItems="center" justifyContent="center">
              {(errors.password || errors.email) && (
                <Typography
                  variant="inherit"
                  component="p"
                  sx={{
                    color: theme.colors.danger,
                    textAlign: "center",
                    fontSize: theme.fontSizes.xxs,
                  }}
                >
                  {errors.password?.message || errors.email?.message}
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
            Войти
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
/* import { useEffect } from "react";
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
import { selectIsError, selectIsLoggedIn } from "@store/selectors/auth";
import { clearSuccess, signIn } from "@store/slices/auth";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { snackbar, showSnackbar, closeSnackbar } = UserSnackbar();
  const error = useAppSelector(selectIsError);
  const isSuccess = useAppSelector(selectIsLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(signIn({ email: data.email, password: data.password }));
  };

  useEffect(() => {
    if (isSuccess) {
      showSnackbar("Авторизация успешна", "success");
      dispatch(clearSuccess());
      setTimeout(() => {
        navigate("/cards");
      }, 2000);
    } else if (error) {
      showSnackbar(error, "error");
    }
  }, [isSuccess, error, navigate, showSnackbar, dispatch]);

  const handleNavigate = () => {
    navigate("/sign-up");
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
          Вход
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

            <Stack height={30} alignItems="center" justifyContent="center">
              {(errors.password || errors.email) && (
                <Typography
                  variant="inherit"
                  component="p"
                  sx={{
                    color: theme.colors.danger,
                    textAlign: "center",
                    fontSize: theme.fontSizes.xxs,
                  }}
                >
                  {errors.password?.message || errors.email?.message}
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
            Войти
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
 */
