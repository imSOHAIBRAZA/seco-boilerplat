import { format, subDays } from "date-fns";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMaintenanceHistory, fetchMaintenanceStats ,} from "./maintenance-support-thunk";
import type { StatsT, CurrentTempT, MaintenanceSupportState, EVCharger } from "../../types";


const today = new Date();
const initialFilters = {
  start_date: format(subDays(today, 15), "yyyy-MM-dd"),
  end_date: format(today, "yyyy-MM-dd"),
};

const initialStats: StatsT = {
  energy_weekly: 0,
  electricity_cost: 0,
  energy_supply: 0,
  co2: 0,
  status_efficiency: 0,
  real_time_energy: 0,
};

const initialCurrentTemp: CurrentTempT = {
  cable_temperature: 0,
  module_temperature: 0,
  warning_message: null,
  warning_status: false,
};

const initialState: MaintenanceSupportState = {
  selectedStation: null,
  isLoading: false,
  isMutating: false,
  stats: initialStats,
  temperatureData: [],
  currentTemperature: initialCurrentTemp,
  temperatureFilter: "cable",
  maintenanceHistory: [],
  pageNo: 0,
  ordering: "",
  dataCount: 0,
  rowsPerPage: 10,
  filters: initialFilters,
};

const MaintenanceSupportSlice = createSlice({
  name: "maintenance-support-slice",
  initialState,
  reducers: {
    setHistoryRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setHistoryPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setStationSelected(state, action: PayloadAction<EVCharger | null>) {
      state.selectedStation = action.payload;
    },
    deselectStation(state) {
      state.selectedStation = null;
    },
    setTemperatureFilter(state, action) {
      state.temperatureFilter = action.payload;
    },
    updateTemperatureFilters(state, action) {
      state.filters = action.payload;
    },
    setMaintenanceSupportOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaintenanceStats.fulfilled, (state, action) => {
        state.stats = action?.payload?.stats;
        state.temperatureData = action?.payload?.tempreture?.calendar;
        state.currentTemperature = action?.payload?.tempreture?.currents;
        state.isLoading = false;
      })
      .addCase(fetchMaintenanceStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMaintenanceStats.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchMaintenanceHistory.fulfilled, (state, action) => {
        state.maintenanceHistory = action?.payload?.results;
        state.dataCount = action.payload?.count;
        state.isMutating = false;
      })
      .addCase(fetchMaintenanceHistory.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(fetchMaintenanceHistory.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

export const {
  setStationSelected,
  setTemperatureFilter,
  setHistoryRowsPerPage,
  setHistoryPage,
  updateTemperatureFilters,
  setMaintenanceSupportOrdering,
} = MaintenanceSupportSlice.actions;

export default MaintenanceSupportSlice;
