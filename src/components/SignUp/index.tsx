import { useState } from "react";
import Input from "@components/Input";
import { registerFields } from "@constants";
import UserSnackbar from "@hooks/useSnackbar";
import { Alert, Button, Paper, Snackbar, Stack, Typography, useTheme } from "@mui/material";

import { useAppDispatch } from "@store/redux";
import { register } from "@store/slices/auth";

const SignUp = ({ onToggleForm }: { onToggleForm: () => void }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { snackbar, showSnackbar, closeSnackbar } = UserSnackbar();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      showSnackbar("Заполните все поля", "error");

      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showSnackbar("Пароли не совпадают", "error");

      return;
    }

    try {
      dispatch(register({ email: formData.email, password: formData.password }));
      showSnackbar("Регистрация успешна! Теперь вы можете войти.", "success");
    } catch {
      showSnackbar("Ошибка регистрации", "error");
    }
  };

  return (
    <>
      <Paper elevation={6} sx={{ p: 2, maxWidth: 600, width: "100%", padding: theme.spaces.xxs }}>
        <Typography variant="h2" component="h2" align="center">
          Регистрация
        </Typography>
        <Stack direction="column" spacing={2} style={{ marginTop: 10 }}>
          {registerFields.map((field) => (
            <Input
              key={field.id}
              field={field}
              value={formData[field.name as keyof typeof formData] || ""}
              onChange={(value) => handleInputChange(field.name, value)}
            />
          ))}
        </Stack>
        <Button
          size="large"
          color="info"
          variant="contained"
          style={{ width: "100%", cursor: "pointer", marginTop: 10 }}
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </Button>
        <Typography
          variant="inherit"
          component="p"
          align="center"
          style={{ marginTop: 10, cursor: "pointer" }}
          onClick={onToggleForm}
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
