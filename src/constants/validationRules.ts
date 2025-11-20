export const validationRules = {
  email: {
    required: "Email обязателен для заполнения",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Введите корректный email",
    },
  },
  password: {
    required: "Пароль обязателен для заполнения",
    minLength: {
      value: 6,
      message: "Пароль должен содержать минимум 6 символов",
    },
  },
  confirmPassword: (getPasswordValue: () => string) => ({
    required: "Подтверждение пароля обязательно",
    validate: (value: string) => value === getPasswordValue() || "Пароли не совпадают",
  }),
};
