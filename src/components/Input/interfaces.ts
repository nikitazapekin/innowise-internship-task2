export interface Field {
  id: string | number;
  label?: string;
  name?: string;
  type: string;
  placeholder: string;
}

export interface InputProps {
  field: Field;
  value?: string;
  onChange: (value: string) => void;
}
