import { FormikValues } from "formik";

export type PropsT = FormikValues & {
  label: string;
  name: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
};

export type ChangeEventT = React.ChangeEvent<HTMLInputElement & { files: FileList }>;
