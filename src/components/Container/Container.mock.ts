import { Field } from "../Modal/Modal.types";

export const userProfileFields: Field[] = [
  {
    key: "username",
    label: "Username",
    required: true,
    visible: true,
    type: "text",
    disabled: true
  },
 
  {
    key: "first_name",
    label: "First Name",
    required: true,
    visible: true,
    type: "text",
  },
  {
    key: "last_name",
    label: "Last Name",
    required: true,
    visible: true,
    type: "text",
  },
];
export const userChangePasswordFields: Field[] = [
  {
    key: "old_password",
    label: "Current Password",
    required: true,
    visible: true,
    type: "password",
  },
 
  {
    key: "new_password",
    label: "New Password",
    required: true,
    visible: true,
    type: "password",
  },
  {
    key: "confirm_password",
    label: "Confirm Password",
    required: true,
    visible: true,
    type: "password",
  },
];
