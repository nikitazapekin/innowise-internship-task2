import { TextField } from "@mui/material";

import type { InputProps } from "./interfaces";

const Input = ({ field }: InputProps) => {
  return <TextField placeholder={field.placeholder} />;
};

export default Input;
