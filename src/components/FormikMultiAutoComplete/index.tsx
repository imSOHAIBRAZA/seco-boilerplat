import * as React from "react";
import Autocomplete from "@mui/lab/Autocomplete";
import { Chip, TextField } from "@mui/material";
import { FormikValues } from "formik";

export default function FormikMultiAutoComplete({
  name,
  setFieldValue,
  touched,
  errors,
  options,
  values,
  label,
}: FormikValues) {
  const _value = values[name];

  const defaultValue = options.filter((x: { label: string; value: string | number }) =>
    (_value || []).includes(x.value),
  );

  return (
    <Autocomplete
      multiple
      id='checkboxes-autocomplete'
      disableCloseOnSelect
      options={options}
      onChange={(e, val = []) => {
        setFieldValue(
          name,
          val.map((x) => x.value),
        );
      }}
      defaultValue={defaultValue}
      limitTags={2}
      getOptionLabel={(option) => option.label}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant='outlined'
            label={option.label}
            size='small'
            {...getTagProps({ index })}
            key={index}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ py: 0 }}
          variant='outlined'
          label={label}
          placeholder={label}
          error={touched[name] && Boolean(errors[name])}
          helperText={touched[name] && errors[name]}
        />
      )}
    />
  );
}
