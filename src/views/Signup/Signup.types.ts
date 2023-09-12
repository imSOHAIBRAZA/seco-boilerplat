import * as React from "react";
import { Asserts, object, string, ref } from "yup";

export const RegisterSchema = object({
  email: string().required("Email is required.").email("Invalid email format."),
  password: string().required("Password is required."),
  confirmPassword: string().oneOf([ref("password"), null], "Passwords must match."),
});

export type RegisterValues = Asserts<typeof RegisterSchema>;

export type PasswordBtnT = {
  onClick: () => void;
  isPassword: boolean;
};

export type SignupProps = React.FC;
