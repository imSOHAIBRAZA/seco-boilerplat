import React from "react";
import { Asserts, object, string } from "yup";

export type ComponentT = React.FC;

export interface ModalStateT {
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export const AdvertiseSchema = object({
  serial_number: string().required("This field is required.").typeError("Must be a number."),
  vm_name: string().required("This field is required."),
  company: string().required("This field is required."),
  device_type: string(),
});

export type AdvertiseFieldValues = Asserts<typeof AdvertiseSchema>;
