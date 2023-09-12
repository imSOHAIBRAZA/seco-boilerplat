import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";

export const fetchHistory = createAsyncThunk(
  "dashboard/fetchPaginated",
  async (_: unknown, { getState }) => {
    const state = getState() as RootState;
    let order = state.dashboard.ordering;
    if (order.includes("vehicle")) {
      order = order.replace("vehicle", "vehicle__vehicle_number");
    } else if (order.includes("charging_time")) {
      order = order.replace("charging_time", "total_charging_time");
    } else if (order.includes("driver")) {
      order = order.replace("driver", "driver__id_number");
    }
    const { data } = await axiosIns.get(apis.dashboardHistory, {
      params: {
        limit: state.dashboard.rowsPerPage,
        page: state.dashboard.pageNo + 1,
        ordering: order,
      },
    });
    return data;
  },
);

export const fetchDigitalSignage = createAsyncThunk("dashboard/fetchDigitalSignage", async () => {
  const { data } = await axiosIns.get(apis.dashboardDigitalSignage);
  return data;
});
export const fetchStatistics = createAsyncThunk("dashboard/dashboardStatistics", async () => {
  const { data } = await axiosIns.get(apis.dashboardStatistics);
  return data;
});
export const fetchWorkingMinutes = createAsyncThunk(
  "dashboard/dashboardWorkingMinutes",
  async () => {
    const { data } = await axiosIns.get(apis.dashboardWorkingMinutes);
    return data;
  },
);
export const fetchDevicesList = createAsyncThunk("dashboard/devices", async () => {
  const { data } = await axiosIns.get(apis.devices);
  return data?.data || data;
});
