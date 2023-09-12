import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";
import { RevenueCommonT } from "../../types/revenue-and-price";
import _ from "lodash";

export const fetchRevenueAndPriceHistory = createAsyncThunk(
  "fetch/revenue-and-price-history",
  async (_, { getState }) => {
    const state = getState() as RootState;
    let order = state.revenueAndPrice.ordering;
    if (order.includes("vehicle")) {
      order = order.replace("vehicle", "vehicle__vehicle_number");
    }else if (order.includes("driver")) {
      order = order.replace("driver", "driver__id_number");
    }
    const { data } = await axiosIns.get(apis.dashboardHistory, {
      params: {
        limit: state.revenueAndPrice.rowsPerPage,
        page: state.revenueAndPrice.pageNo + 1,
        ordering: order,
      },
    });
    return data;
  },
);

export const fetchRevenueStats = createAsyncThunk("fetch/revenue-overview", async () => {
  const { data } = await axiosIns.get(apis.revenueOverview);
  return data;
});

export const fetchRevenueGraph = createAsyncThunk(
  "fetch/revenue-graph",
  async (_, { getState }) => {
    const state = getState() as RootState;

    const { data } = await axiosIns.get(apis.revenueGraph, {
      params: { ...state.revenueAndPrice.filters },
    });
    return data;
  },
);

export const fetchRevenuePrice = createAsyncThunk("fetch/revenue-price", async (id: number) => {
  const { data } = await axiosIns.get(apis.revenuePrices, {
    params: {
      device: id,
      all: true,
    },
  });

  return data;
});

export const fetchRevenueOccupancy = createAsyncThunk(
  "fetch/revenue-occupancy",
  async (id: number) => {
    const { data } = await axiosIns.get(apis.revenueOccupancy, {
      params: {
        device: id,
        all: true,
      },
    });

    return data;
  },
);

export const fetchRevenuePromos = createAsyncThunk("fetch/revenue-promos", async (id: number) => {
  const { data } = await axiosIns.get(apis.revenuePromos, {
    params: {
      device: id,
      all: true,
    },
  });

  return data;
});

export const bulkRevenuePriceSave = createAsyncThunk(
  "save/revenue-price",
  async (data: { data: RevenueCommonT[]; device: number }[]) => {
    const res = await Promise.all(
      _.map(data, (payload) => axiosIns.post(apis.saveRevenuePrices, payload)),
    );

    return res;
  },
);

export const bulkRevenueOccupancySave = createAsyncThunk(
  "save/revenue-occupancy",
  async (data: { data: RevenueCommonT[]; device: number }[]) => {
    const res = await Promise.all(
      _.map(data, (payload) => axiosIns.post(apis.saveRevenueOccupancy, payload)),
    );

    return res;
  },
);

export const bulkRevenuePromosSave = createAsyncThunk(
  "save/revenue-promos",
  async (data: { data: RevenueCommonT[]; device: number }[]) => {
    const res = await Promise.all(
      _.map(data, (payload) => axiosIns.post(apis.saveRevenuePromos, payload)),
    );

    return res;
  },
);
