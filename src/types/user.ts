import { App } from "./app";
import { Company } from "./company";
import { Operator } from "./operator";

export type UserType = "SA" | "OP" | "EM" | "DA" | "VU";

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  type: UserType;
  company: Operator & Company;
  created_by_user: string | null;
  created_by: number | null;
  distributor_id: number | null;
  vendor_name: null;
  device_types: null;
  nurse_detail: null;
  video_url: null;
  token: string;
  user_id: number;
  first_access: boolean;
  apps: App[];
  companies: number[];
  is_default: boolean;
  package: string;
  restricted_users: number[];
  preferences: Record<string, any>[];
  operators: {
    id: number;
    business_name: string;
    created_by: number | null;
    customer_type: string;
    web_store_url: string | null;
  }[];
};
