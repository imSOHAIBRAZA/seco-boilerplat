import React from "react";
import { Asserts, object, string } from "yup";

export type ComponentT = React.FC;

export interface ModalStateT {
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export const LocationSchema = object({
  location_name: string().required("This field is required."),
  country: string().required("This field is required."),
  city: string().required("This field is required."),
  latitude: string().required("This field is required."),
  longitude: string().required("This field is required."),
  detailed_address: string().required("This field is required."),
  province: string().required("This field is required."),
});

export type LocationFieldValues = Asserts<typeof LocationSchema>;
