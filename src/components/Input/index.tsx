import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";

interface InputProps extends Omit<TextFieldProps, "onChange"> {
  onChange: (value: string) => void;
}

const Input = ({ value, onChange, ...textFieldProps }: InputProps) => {
  return (
    <TextField
      {...textFieldProps}
      variant="outlined"
      fullWidth
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  );
};

export default Input;
