import React from "react";
import { Asserts, object, string, number, lazy } from "yup";

export type ComponentT = React.FC;

export interface ModalStateT {
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export const EVChargerSchema = object({
  serial_number: string().required("This field is required.").typeError("Must be a number."),
  vm_name: string().required("This field is required."),
  company: number().min(1, "This field is required.").required("This field is required."),
  device_type: number().min(1, "This field is required.").required("This field is required."),
  latitude: lazy((value) =>
  typeof value === 'string'
    ? string().nullable(true).required("This field is required.")
    : number().nullable(true).required("This field is required.")
  ),
  longitude: lazy((value) =>
  typeof value === 'string'
    ? string().nullable(true).required("This field is required.")
    : number().nullable(true).required("This field is required.")
  ),
  address_text: string().required("This field is required."),
  max_power: number().min(1, "This field is required.").required("This field is required."),
  connector_type: string().required("This field is required.")
});


export type EVChargerFieldValues = Asserts<typeof EVChargerSchema>;
