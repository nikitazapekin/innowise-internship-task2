import { forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";

interface InputProps extends Omit<TextFieldProps, "onChange"> {
  register?: UseFormRegisterReturn;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ register, ...textFieldProps }, ref) => {
  return (
    <TextField
      {...register}
      {...textFieldProps}
      inputRef={ref}
      variant="outlined"
      fullWidth
      required
    />
  );
});

export default Input;
