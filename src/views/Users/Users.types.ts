import React from "react";
import { Asserts, object, string, number } from "yup";

export type ComponentT = React.FC;

export interface ModalStateT {
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export const UserSchema = object({
  username: string().required("This field is required."),
  email: string().required("This field is required.").email("Invalid email format"),
  first_name: string().required("This field is required."),
  last_name: string().required("This field is required."),
  password: string().required("This field is required."),
  type: string().required("This field is required."),
  company: number(),
});

export type UserValues = Asserts<typeof UserSchema>;

export const EditUserSchema = object({
  username: string().required("This field is required."),
  email: string().required("This field is required.").email("Invalid email format"),
  first_name: string().required("This field is required."),
  last_name: string().required("This field is required."),
  password: string(),
  type: string().required("This field is required."),
  company: number(),
});


export interface LabelsT {
  [key: string]: string
}