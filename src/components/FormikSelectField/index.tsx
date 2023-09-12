import * as React from "react";
import { ListItemText, MenuItem, SxProps, TextField } from "@mui/material";
import { dropDownStyle, menuItemStyle, listItemTextStyle } from "./FormikSelectField.styles";
import { Option } from "../Modal/Modal.types";
import { FormikValues } from "formik";

const FormikSelectField = (props: FormikValues & SxProps): React.ReactElement => {
  const { name, handleChange, touched, errors, options, values, label, sx, disabled, required } =
    props;

  return (
    <TextField
      data-testid='select'
      name={name}
      label={label}
      disabled={disabled}
      value={values[name]}
      required={required}
      onChange={handleChange}
      error={touched?.[name] && Boolean(errors?.[name])}
      helperText={touched?.[name] && errors?.[name]}
      select
      sx={{
        ...dropDownStyle({
          placeholder: !values[name],
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

export default FormikSelectField;
