export interface Location {
  location_id: number;
  created_at: string;
  updated_at: string;
  creator: string;
  latitude: string;
  longitude: string;
  status: string;
  description?: string;
  location_name: string;
  location_type: string;
  district?: string;
  country: string;
  province: string;
  city: string;
  detailed_address: string;
  chiller_temperature?: number;
  operator_id: number;
  operator_name: string;
  is_location_associated: boolean;
}
