import { useCallback, useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "@components/Input";
import { registerFields } from "@constants";
import { validationRules } from "@constants";
import UserSnackbar from "@hooks/useSnackbar";
import { Alert, Button, Paper, Snackbar, Stack, Typography, useTheme } from "@mui/material";

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
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (isSuccess) {
      showSnackbar("Регистрация успешна! Теперь вы можете войти.", "success");
      dispatch(clearSuccess());
      reset();
      setTimeout(() => {
        navigate("/sign-in");
      }, 2000);
    } else if (error) {
      showSnackbar(error, "error");
    }
  }, [isSuccess, error, navigate, dispatch]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(signUp({ email: data.email, password: data.password }));
  };

  const handleNavigate = () => {
    navigate("/sign-in");
  };
  const handleChange = useCallback(
    (fieldName: keyof FormData, value: string) => {
      const getPasswordValue = () => watch("password");

      const rules = {
        email: validationRules.email,
        password: validationRules.password,
        confirmPassword: validationRules.confirmPassword(getPasswordValue),
      };

      const { onChange } = register(fieldName, rules[fieldName]);

      onChange({
        target: {
          name: fieldName,
          value: value,
        },
      });
    },
    [register, watch]
  );

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

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
            <Input
              field={registerFields[0]}
              value={emailValue ?? ""}
              onChange={(value) => handleChange("email", value)}
            />

            <Input
              field={registerFields[1]}
              value={passwordValue ?? ""}
              onChange={(value) => handleChange("password", value)}
            />

            <Input
              field={registerFields[2]}
              value={confirmPasswordValue ?? ""}
              onChange={(value) => handleChange("confirmPassword", value)}
            />

            <Stack height={30} alignItems="center" justifyContent="center">
              {(errors.password || errors.email || errors.confirmPassword) && (
                <Typography
                  variant="inherit"
                  component="p"
                  sx={{
                    color: theme.colors.danger,
                    textAlign: "center",
                    fontSize: theme.fontSizes.xxs,
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

/* import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "@components/Input";
import { registerFields } from "@constants";
import { validationRules } from "@constants";
import UserSnackbar from "@hooks/useSnackbar";
import { Alert, Button, Paper, Snackbar, Stack, Typography, useTheme } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@store/redux";
import { signUp } from "@store/slices/auth";
import { selectIsError, selectIsSuccess } from "@store/selectors/auth";
import { useEffect } from "react";

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(signUp({ email: data.email, password: data.password }));
  };

  const handleNavigate = () => {
    navigate("/sign-in");
  };

  useEffect(() => {
    if (isSuccess) {
      showSnackbar("Регистрация успешна! Теперь вы можете войти.", "success");
    } else {
      showSnackbar(error, "error");
    }
  }, [isSuccess, error, showSnackbar, navigate, dispatch]);
 

  const handleChange = (fieldName: keyof FormData, value: string) => {
    const event = {
      target: {
        value: value,
        name: fieldName,
      },
    };

    const getPasswordValue = () => watch("password");

    const rules = {
      email: validationRules.email,
      password: validationRules.password,
      confirmPassword: validationRules.confirmPassword(getPasswordValue),
    };

    register(fieldName, rules[fieldName]).onChange(event);
  };

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

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
            <Input
              field={registerFields[0]}
              value={emailValue ?? ""}
              onChange={(value) => handleChange("email", value)}
            />

            <Input
              field={registerFields[1]}
              value={passwordValue ?? ""}
              onChange={(value) => handleChange("password", value)}
            />

            <Input
              field={registerFields[2]}
              value={confirmPasswordValue ?? ""}
              onChange={(value) => handleChange("confirmPassword", value)}
            />

            <Stack height={30} alignItems="center" justifyContent="center">
              {(errors.password || errors.email || errors.confirmPassword) && (
                <Typography
                  variant="inherit"
                  component="p"
                  sx={{
                    color: theme.colors.danger,
                    textAlign: "center",
                    fontSize: theme.fontSizes.xxs,
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
 */
