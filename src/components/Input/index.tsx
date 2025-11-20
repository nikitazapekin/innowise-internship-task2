import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";

interface Field {
  id: string | number;
  label?: string;
  name?: string;
  type: string;
  placeholder: string;
}

interface InputProps extends Omit<TextFieldProps, "onChange"> {
  field: Field;
  onChange: (value: string) => void;
}

const Input = ({ field, value, onChange, ...textFieldProps }: InputProps) => {
  return (
    <TextField
      {...textFieldProps}
      label={field.label}
      type={field.type}
      variant="outlined"
      placeholder={field.placeholder}
      fullWidth
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  );
};

export default Input;
