import * as React from "react";
import { ListItemText, MenuItem, SxProps, TextField } from "@mui/material";
import { dropDownStyle, menuItemStyle, listItemTextStyle } from "./SelectField.styles";
import { Option } from "../Modal/Modal.types";

type PropsT = {
  sx?: SxProps;
  options?: Option[];
  value?: string | number;
  label: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const SelectField: React.FC<PropsT> = (props) => {
  const { options, value, label, sx, disabled, required, onChange, name } = props;

  return (
    <TextField
      data-testid='select'
      label={label}
      disabled={disabled}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      select
      size='small'
      sx={{
        ...dropDownStyle({
          placeholder: !value,
        }),
        ...sx,
      }}
    >
      {options?.map(({ value, label }: Option, index: number) => (
        <MenuItem sx={{ ...menuItemStyle }} key={index} value={value}>
          <ListItemText sx={{ ...listItemTextStyle }} primary={label} />
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectField;
