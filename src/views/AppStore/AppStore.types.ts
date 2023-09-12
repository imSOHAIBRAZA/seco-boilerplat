import * as React from "react";
import { Asserts, mixed, object, string, number, array } from "yup";

export type ComponentT = React.FC;

export type ActionButton = {
  onClick: () => void;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  disabled?: boolean;
};

export const AddAppSchema = object({
  name: string().required("This field is required"),
  app_type: string().required("This field is required."),
  category: string().required("This field is required."),
  description: string().required("This field is required."),
  app_slug: string(),
  company_ids: array(number()),
  icon: mixed(),
  sidebar_icon: mixed(),
});

export type AppFieldValues = Asserts<typeof AddAppSchema>;
