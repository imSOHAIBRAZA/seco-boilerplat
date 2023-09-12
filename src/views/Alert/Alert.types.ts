import React from "react";
import { Asserts, object, string } from "yup";

export type ComponentT = React.FC;

export interface ModalStateT {
  add: boolean;
  edit: boolean;
  delete: boolean;
}

export const AddOperatorSchema = object({
  customer_type: string(),
  business_name: string().required("This field is required."),
  address: string().required("This field is required."),
  contact_info: string().required("This field is required."),
});

export type OperatorFieldValues = Asserts<typeof AddOperatorSchema>;

export interface IAlertFilters {
  start_date?: string | number | Date;
  end_date?: string | number | Date;
  alert_type?: string;
  alert_level?: string;
  vm__location?: string;
}
