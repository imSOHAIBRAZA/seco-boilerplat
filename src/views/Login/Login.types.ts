import { Asserts, object, string } from "yup";

export const LoginSchema = object({
  username: string().required("This field is required."),
  password: string().required("Password is required."),
});

export type LoginValues = Asserts<typeof LoginSchema>;
