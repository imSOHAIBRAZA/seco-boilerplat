import * as React from "react";
import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { CloseIcon } from "../../assets/icons";
import { Upload } from "@mui/icons-material";
import * as sx from "./FormikFileInput.styles";
import * as types from "./FormikFileInput.types";
import _ from "lodash";

const FormikFileInput: React.FC<types.PropsT> = (props) => {
  const { disabled, label, accept, multiple, name, ...formik } = props;

  const handleChangeFile = (event: types.ChangeEventT) =>
    formik.setFieldValue(name, multiple ? event.target.files : event.target?.files[0]);

  const handleRemoveImg = () => formik.setFieldValue(name, null);

  return (
    <Box>
      <Button
        disabled={disabled}
        variant='outlined'
        color='secondary'
        size='small'
        component='label'
        sx={sx.root}
      >
        <Upload sx={{ marginRight: 0.5 }} />
        {label}
        <input type='file' onChange={handleChangeFile} accept={accept} multiple={multiple} hidden />
      </Button>
      {formik.values[name] && (
        <Box sx={sx.selectedWrapper}>
          {formik.values[name]?.lenght ? (
            _.map(formik.values[name], (value, index) => (
              <Box sx={sx.fileNameWrapper} key={index}>
                <Box sx={sx.iconWrapper}>
                  <CloseIcon onClick={handleRemoveImg} sx={sx.closeIcon} />
                </Box>
                <Typography variant='body2'>{value.name}</Typography>
              </Box>
            ))
          ) : (
            <Box sx={sx.fileNameWrapper}>
              <Box sx={sx.iconWrapper}>
                <CloseIcon onClick={handleRemoveImg} sx={sx.closeIcon} />
              </Box>
              <Typography variant='body2'>{formik.values[name].name}</Typography>
            </Box>
          )}
        </Box>
      )}
      {formik?.errors[name] && (
        <FormHelperText sx={{ marginLeft: 1.75 }} error>
          {formik?.errors[name]}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FormikFileInput;
