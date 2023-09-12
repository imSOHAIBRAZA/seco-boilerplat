import React from "react";
import { FormikProps } from "formik";

export interface Option {
  value: string | number;
  label: string;
}

export type FieldType =
  | "text"
  | "select"
  | "checkbox"
  | "file"
  | "multiSelect"
  | "password"
  | "number";

export interface Field {
  key: string;
  type: FieldType;
  visible: boolean;
  required: boolean;
  options?: Option[];
  label: string;
  accept?: string;
  multiple?: boolean;
  size?: "full" | "half";
  disabled?: boolean;
  
}

export interface ModalProps<T> {
  open?: boolean;
  onClose: () => void;
  content?: React.ReactNode;
  description?: string;
  title?: string;
  submitButtonText?: string;
  fields?: Field[];
  formik?: FormikProps<T>;
  closeButtonText?: string;
  disabled?: boolean;
  onSubmit: () => void;
  icon?: React.FC;
  align?: "center" | "left";
}
