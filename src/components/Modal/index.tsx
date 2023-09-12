import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button } from "@mui/material";
import FormikMultiAutoComplete from "../FormikMultiAutoComplete";
import FormikTextField from "../FormikTextField";
import FormikFileInput from "../FormikFileInput";
import FormikSelectField from "../FormikSelectField";
import _map from "lodash/map";
import * as sx from "./Modal.styles";

import type { Field, ModalProps } from "./Modal.types";
import { CloseIcon } from "../../assets/icons";

const Modal = <InitialValues extends object>({
  open = false,
  onClose,
  fields,
  description,
  title,
  submitButtonText,
  closeButtonText,
  formik,
  onSubmit,
  disabled,
  icon,
  align = "left",
}: ModalProps<InitialValues>) => {
  const renderField = (field: Field) => {
    switch (field.type) {
      case "text":
        return (
          <FormikTextField
            key={field.key}
            label={field.label}
            name={field.key}
            required={field.required}
            disabled={field.disabled || disabled}
            {...formik}
          />
        );
      case "multiSelect":
        return (
          <FormikMultiAutoComplete
            key={field.key}
            name={field.key}
            label={field.label}
            required={field.required}
            disabled={field.disabled || disabled}
            options={field.options}
            {...formik}
          />
        );
      case "select":
        return (
          <FormikSelectField
            key={field.key}
            disabled={field.disabled || disabled}
            required={field.required}
            options={field.options}
            label={field.label}
            name={field.key}
            {...formik}
          />
        );
      case "file":
        return (
          <FormikFileInput
            key={field.key}
            disabled={field.disabled || disabled}
            label={field.label}
            name={field.key}
            accept={field?.accept}
            multiple={field?.multiple}
            {...formik}
          />
        );
      default:
        return (
          <FormikTextField
            key={field.key}
            label={field.label}
            name={field.key}
            required={field.required}
            disabled={field.disabled || disabled}
            type={field.type}
            {...formik}
          />
        );
    }
  };

  return (
    <Box component='form' onSubmit={onSubmit}>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        aria-labelledby='responsive-dialog-title'
        sx={sx.root}
      >
        <DialogTitle sx={sx.dialogTitle} id='responsive-dialog-title'>
          {title}
          <CloseIcon onClick={onClose} sx={sx.closeIcon} />
        </DialogTitle>
        <DialogContent sx={sx.contentWrapper}>
          {icon && (
            <Box sx={sx.iconWrapper}>
              <Box component={icon} />
            </Box>
          )}
          <DialogContentText sx={{ ...sx.contentText, textAlign: align }}>
            {description ?? "Please fill in the details below."}
          </DialogContentText>
          {formik && (
            <Box sx={sx.formWrapper}>
              {_map(fields, ({ size = "full", ...field }, index) => (
                <Box
                  key={index}
                  gridColumn={{ sm: `span ${size === "full" ? 2 : 1}`, xs: "span 2" }}
                >
                  {renderField(field)}
                </Box>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={sx.dailogAction}>
          <Button disabled={disabled} onClick={onClose} variant='outlined' size='small'>
            {closeButtonText ?? "Close"}
          </Button>
          <Button
            disabled={disabled}
            type='submit'
            onClick={onSubmit}
            variant='contained'
            size='small'
            autoFocus
          >
            {submitButtonText ?? "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Modal;
