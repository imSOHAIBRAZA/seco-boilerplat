import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format, subDays } from "date-fns";
import type { EVCharger } from "../../types/ev-charger";
import type { RevenueAndPriceState, RevenueAndPriceStatsT } from "../../types/revenue-and-price";
import {
  bulkRevenueOccupancySave,
  bulkRevenuePriceSave,
  fetchRevenueOccupancy,
  fetchRevenuePrice,
  fetchRevenueStats,
  fetchRevenueGraph,
  fetchRevenueAndPriceHistory,
} from "./revenue-and-price-thunk";

const today = new Date();
const initialFilters = {
  start_date: format(subDays(today, 15), "yyyy-MM-dd"),
  end_date: format(today, "yyyy-MM-dd"),
};

const initialStats: RevenueAndPriceStatsT = {
  average_duration: 0,
  total_sessions: 0,
  usage_time: { recharge: 0, occupancy: 0 },
  week_active_promotion: 0,
  week_electricity_cost: 0,
  week_enery_supply: 0,
  week_profit: 0,
  week_revenue: 0,
};

const initialState: RevenueAndPriceState = {
  selectedStation: [],
  isLoading: false,
  isFetching: false,
  isMutating: false,
  stats: initialStats,
  revenues: [],
  history: [],
  pageNo: 0,
  ordering: "",
  dataCount: 0,
  rowsPerPage: 10,
  filters: initialFilters,
};

const revenueAndPriceSlice = createSlice({
  name: "revenue-and-price-slice",
  initialState,
  reducers: {
    setHistoryRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setHistoryPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setStationSelected(state, action: PayloadAction<EVCharger[]>) {
      state.selectedStation = action.payload;
    },
    deselectStation(state) {
      state.selectedStation = [];
    },
    updateRevenueFilters(state, action) {
      state.filters = action.payload;
    },
    setRevenueAndPriceOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRevenueAndPriceHistory.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchRevenueAndPriceHistory.fulfilled, (state, action) => {
        state.history = action?.payload?.results;
        state.dataCount = action?.payload?.count;
        state.isFetching = false;
      })
      .addCase(fetchRevenueAndPriceHistory.rejected, (state) => {
        state.isFetching = false;
      })
      .addCase(fetchRevenueStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRevenueStats.fulfilled, (state, action) => {
        state.stats = action?.payload;
        state.isLoading = false;
      })
      .addCase(fetchRevenueStats.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchRevenueGraph.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRevenueGraph.fulfilled, (state, action) => {
        state.revenues = action?.payload;
        state.isLoading = false;
      })
      .addCase(fetchRevenueGraph.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchRevenuePrice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRevenuePrice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchRevenuePrice.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchRevenueOccupancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRevenueOccupancy.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchRevenueOccupancy.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(bulkRevenuePriceSave.fulfilled, (state) => {
        state.isMutating = false;
      })
      .addCase(bulkRevenuePriceSave.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(bulkRevenuePriceSave.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(bulkRevenueOccupancySave.fulfilled, (state) => {
        state.isMutating = false;
      })
      .addCase(bulkRevenueOccupancySave.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(bulkRevenueOccupancySave.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

export const {
  setStationSelected,
  deselectStation,
  setHistoryRowsPerPage,
  setHistoryPage,
  updateRevenueFilters,
  setRevenueAndPriceOrdering,
} = revenueAndPriceSlice.actions;

export default revenueAndPriceSlice;
