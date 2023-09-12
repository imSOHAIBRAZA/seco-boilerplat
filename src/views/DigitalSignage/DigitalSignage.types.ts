import { Asserts, object, string } from "yup";

export interface NaveDateAndURLPropsT {
  name: string;
  date: string;
  enddate: string;
  URL: string;
  onChange: (field: string, value: string) => void;
  disabled: boolean;
}

export const CampaignSchema = object({
  name: string().required("This field is required."),
  start_date: string().required("This field is required."),
  end_date: string().required("This field is required."),
  file_url: string().required("This field is required."),
  age_range: string().required("This field is required."),
  emotions: string().required("This field is required."),
  brand: string().required("This field is required."),
});

export type CampaignFieldValues = Asserts<typeof CampaignSchema>;

export interface TableDataT {
  label: string;
  value: number;
}
