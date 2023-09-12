export type Asset = {
  id: number;
  total_view: number;
  total_audience: number;
  view_rate: number;
  avg_duration: number;
  status: string;
  created_at: string;
  updated_at: string;
  name: string;
  brand: string;
  start_date: string;
  end_date: string;
  file_type: null | string;
  file: string;
  file_url: string;
  age_range: string;
  emotions: string;
  is_active: boolean;
  device: number;
  logo: null | string;
};

export interface IVehicleVendor {
  id: number;
  brand_name: string;
  total_view: number;
}
export interface IAdvertising {
  id: number;
  age_range: string;
  avg_duration: string;
  device: number;
  name: string;
  is_active: boolean;
  brand: string;
  total_audience: number;
  total_view: number;
  view_rate: number;
}
