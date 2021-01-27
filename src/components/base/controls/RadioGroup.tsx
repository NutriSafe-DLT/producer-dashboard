import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { Option } from "./Option";

export interface RadioGroupProps {
  name: string;
  label: string;
  items: Option[];
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

export default function RadioGroup(props: RadioGroupProps) {
  const { name, label, value, onChange, items } = props;

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<Radio />}
            label={item.title}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
}
