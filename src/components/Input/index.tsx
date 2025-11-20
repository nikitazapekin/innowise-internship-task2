import { TextField } from "@mui/material";

import type { InputProps } from "./interfaces";

const Input = ({ field, value, onChange }: InputProps) => {
  return (
    <TextField
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
