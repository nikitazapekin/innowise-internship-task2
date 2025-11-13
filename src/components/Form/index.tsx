import Input from "@components/Input";
import { loginFields } from "@constants/login";
import { Button, Paper, Stack, Typography, useTheme } from "@mui/material";

const Form = () => {
  const theme = useTheme();

  return (
    <>
      <Paper elevation={6} sx={{ p: 2, maxWidth: 600, width: "100%", padding: theme.spaces.xxs }}>
        <Typography variant="h2" component="h2" align="center">
          Вход
        </Typography>
        <Stack direction="column" spacing={2} style={{ marginTop: 10 }}>
          {loginFields.map((field) => (
            <Input key={field.id} field={field} />
          ))}
        </Stack>
        <Button
          size="large"
          color="info"
          variant="contained"
          style={{ width: "100%", cursor: "pointer", marginTop: 10 }}
        >
          Войти
        </Button>
        <Typography
          variant="inherit"
          component="p"
          align="center"
          style={{ marginTop: 10, cursor: "pointer" }}
        >
          Зарегистрироваться
        </Typography>
      </Paper>
    </>
  );
};

export default Form;
