import * as React from "react";
import { TextField } from "@mui/material";
import { FormikValues } from "formik";

const FormikTextField: React.FC<FormikValues> = (props) => {
  const {
    sx,
    name,
    label,
    values,
    errors,
    touched,
    handleChange,
    placeholder,
    InputProps,
    type,
    InputLabelProps,
  } = props;

  return (
    <TextField
      placeholder={placeholder}
      label={label}
      variant='outlined'
      required={true}
      name={name}
      value={values[name]}
      onChange={handleChange}
      error={touched[name] && Boolean(errors[name])}
      helperText={touched[name] && errors[name]}
      sx={{ ...sx }}
      InputProps={InputProps}
      InputLabelProps={InputLabelProps}
      type={type}
      fullWidth
    />
  );
};

export default FormikTextField;
