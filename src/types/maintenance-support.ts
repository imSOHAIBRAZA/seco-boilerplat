import { EVCharger } from "./ev-charger";

export interface StatsT {
  energy_weekly: number;
  electricity_cost: number;
  energy_supply: number;
  co2: number;
  status_efficiency: number;
  real_time_energy: number;
}

export interface CurrentTempT {
  cable_temperature: number;
  module_temperature: number;
  warning_message: string | null;
  warning_status: boolean;
}

export interface MaintenanceSupportState {
  selectedStation: EVCharger | null;
  isLoading: boolean;
  isMutating: boolean;
  stats: StatsT;
  temperatureFilter: string;
  currentTemperature: CurrentTempT;
  temperatureData: (Record<string, number> & { date: string }[]) | [];
  maintenanceHistory: Record<string, string | null>[];
  pageNo: number;
  dataCount: number;
  rowsPerPage: number;
  filters: { start_date: string; end_date: string };
  ordering: string;
}
