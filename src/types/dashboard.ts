export interface FrequentAdT {
  name: string;
  age_range: string;
  image: string;
}

export interface DigitalSignageDataT {
  active_promotions?: number;
  total_advertisments?: number;
  total_interactions?: number;
  frequent_ads?: FrequentAdT[];
}

export interface IStatistics {
  total_revenue?: number;
  electricity_costs?: number;
  energy_supply?: number;
  average_duration?: number;
  device_with_warning?: number;
  device_connected?: number;
}

export interface IWorkingMinutes {
  available?: number;
  occupied?: number;
  locked?: number;
  booked?: number;
}

export interface DashboardStateT {
  history: DashboardHistoryT[];
  isLoadingHistory: boolean;
  digitalSignage: DigitalSignageDataT;
  pageNo: number;
  isLoading: boolean;
  ordering: string;
  rowsPerPage: number;
  dataCount: number;
  statistics: IStatistics;
  workingMinutes: IWorkingMinutes;
  devices: string[];
}

export interface DashboardHistoryT {
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
