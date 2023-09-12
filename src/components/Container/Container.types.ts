import React from "react";
import { NavItem } from "../../types";
import * as Yup  from "yup";

export type NavItemT = {
  label: string;
  route: string;
  icon: React.FC;
};

export type AnchorEleT = null | HTMLElement;

export type MouseEventT = React.MouseEvent<HTMLElement>;

export type TitleT = string | undefined;

export type ContainerProps = { sidebarItems: NavItem[] };

export const EditProfileSchema = Yup.object({
  username: Yup.string().required("This field is required."),
  first_name: Yup.string().required("This field is required."),
  last_name: Yup.string().required("This field is required."),
  type: Yup.string().required("This field is required."),
});

export const ChangePassowrdSchema = Yup.object({
  old_password: Yup.string().required("Current password is required"),
  new_password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{9,})/,
    "Must Contain 9 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ).required("New password is required"),
  confirm_password: Yup.string().oneOf([Yup.ref("new_password"), null], "New password & confirm password must be same."),
});
