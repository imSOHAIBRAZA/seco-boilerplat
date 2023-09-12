import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format, subDays } from "date-fns";
import { App } from "../../types";
import { IAlertFilters } from "../../views/Alert/Alert.types";
import { fetchAlerts, fetchAllAlerts } from "./alert-thunk";

interface AlertState {
  alerts: App[];
  allAlerts: App[];
  pageNo: number;
  isLoading: boolean;
  ordering: string;
  rowsPerPage: number;
  dataCount: number;
  isMutating: boolean;
  filters: IAlertFilters;
  searchQuery: string;
  searchFilter: string[];
  activeFilter: string;
}

const today = new Date();
const defaultFilters = {
  start_date: format(subDays(today, 15), "yyyy-MM-dd"),
  end_date: format(today, "yyyy-MM-dd"),
  alert_type: "all",
  alert_level: "all",
  vm__location: "all",
};

const initialState: AlertState = {
  alerts: [],
  allAlerts: [],
  pageNo: 0,
  isLoading: false,
  ordering: "",
  rowsPerPage: 10,
  dataCount: 0,
  isMutating: false,
  filters: defaultFilters,
  searchQuery: "",
  searchFilter: ["device_id", "vm_name", "message", "operator"],
  activeFilter: "filters",
};

const alertSlice = createSlice({
  name: "alert-slice",
  initialState,
  reducers: {
    setAlertRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setAlertPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setAlertFilters(state, action: PayloadAction<IAlertFilters>) {
      state.filters = action.payload;
    },
    setAlertSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setAlertsSearchFilter(state, action: PayloadAction<string[]>) {
      state.searchFilter = action.payload;
    },
    setAlertActiveFilter(state, action: PayloadAction<string>) {
      state.activeFilter = action.payload;
    },
    setAlertOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
    updateAlertFilters(state, action: PayloadAction<IAlertFilters>) {
      if (state.activeFilter !== "filters") {
        state.activeFilter = "filters";
      }
      state.pageNo = 0;
      state.filters = action.payload;
    },

    updateAlertSearchQuery(state, action: PayloadAction<string>) {
      if (state.activeFilter !== "search") {
        state.pageNo = 0;
        state.activeFilter = "search";
        state.filters = defaultFilters;
      }
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlerts.fulfilled, (state, action) => {
        state.alerts = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchAlerts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAlerts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAlerts.fulfilled, (state, action) => {
        state.allAlerts = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchAllAlerts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAlerts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setAlertRowsPerPage,
  setAlertPage,
  setAlertFilters,
  setAlertSearchQuery,
  setAlertsSearchFilter,
  setAlertOrdering,
  updateAlertFilters,
  updateAlertSearchQuery,
} = alertSlice.actions;

export default alertSlice;
