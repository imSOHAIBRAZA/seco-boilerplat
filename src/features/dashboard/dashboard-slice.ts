import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchHistory,
  fetchDigitalSignage,
  fetchStatistics,
  fetchWorkingMinutes,
  fetchDevicesList,
} from "./dashboard-thunk";
import { DashboardStateT } from "../../types/dashboard";

const initialState: DashboardStateT = {
  history: [],
  digitalSignage: {},
  pageNo: 0,
  isLoading: false,
  isLoadingHistory: false,
  ordering: "",
  rowsPerPage: 10,
  dataCount: 0,
  statistics: {},
  workingMinutes: {},
  devices: [],
};

const dashboardSlice = createSlice({
  name: "dashboard-slice",
  initialState,
  reducers: {
    setHistoryRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setHistoryPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setDashoardHistoryOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoadingHistory = false;
      })
      .addCase(fetchHistory.pending, (state) => {
        state.isLoadingHistory = true;
      })
      .addCase(fetchHistory.rejected, (state) => {
        state.isLoadingHistory = false;
      })
      .addCase(fetchDigitalSignage.fulfilled, (state, action) => {
        state.digitalSignage = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDigitalSignage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDigitalSignage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchStatistics.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchWorkingMinutes.fulfilled, (state, action) => {
        state.workingMinutes = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchWorkingMinutes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWorkingMinutes.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDevicesList.fulfilled, (state, action) => {
        state.devices = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDevicesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDevicesList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setHistoryRowsPerPage, setHistoryPage , setDashoardHistoryOrdering} = dashboardSlice.actions;

export default dashboardSlice;
