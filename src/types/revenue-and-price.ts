import { EVCharger } from "./ev-charger";

export type ChargingPrice = {
  id?: number;
  device?: number;
  name: string;
  start_time: string;
  end_time: string;
  cost: string;
  price: string;
};

export type RevenueOccupancy = {
  id?: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  start_time: string;
  end_time: string;
  price: string;
  device?: number;
};

export type RevenueCommonT = {
  id?: number;
  device?: number;
  name: string;
  start_time: string;
  end_time: string;
  cost?: string;
  price?: string;
  reserved?: string;
  is_default: Boolean;
};

export interface RevenueAndPriceStatsT {
  average_duration: number;
  total_sessions: number;
  usage_time: { recharge: number; occupancy: number };
  week_active_promotion: number;
  week_electricity_cost: number;
  week_enery_supply: number;
  week_profit: number;
  week_revenue: number;
}

export interface RevenueAndPriceState {
  selectedStation: EVCharger[];
  isLoading: boolean;
  isMutating: boolean;
  isFetching: boolean;
  stats: RevenueAndPriceStatsT;
  revenues: RevenuesChartDataT[];
  history: RevenueAndPriceHistoryT[];
  rowsPerPage: number;
  pageNo: number;
  ordering: string;
  dataCount: number;
  filters: { start_date: string; end_date: string };
}

export type RevenuesChartDataT = Record<string, number> & {
  date: string;
};

export interface RevenueAndPriceHistoryT {
  id: number;
  vehicle: {
    id: number;
    vehicle_model: string;
    vehicle_number: string;
    plate_date?: string;
  };
  driver: {
    id: number;
    name: string;
    id_number: number | string;
  };
  device: 5;
  start_time: string;
  end_time: string;
  charging_time: string;
  occupancy: number;
  spot: number;
  status: string;
  cost: string | number;
  kwh: string | number;
  payment_method: string;
}
