import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";

export const fetchMaintenanceStats = createAsyncThunk(
  "fetch/maintenance-stats",
  async (id: number, { getState }) => {
    const state = getState() as RootState;

    const { data } = await axiosIns.get(apis.maintenanceStats, {
      params: {
        device_id: 10,
        ...state.revenueAndPrice.filters,
      },
    });
    console.log(id);
    return data;
  },
);


/*
TODO: Implement pagination like other APIs i.e operator, user 
*/
export const fetchMaintenanceHistory = createAsyncThunk(
  "fetch/maintenance-history",
  async (id: number, { getState }) => {
    const state = getState() as RootState;

    const { data } = await axiosIns.get(apis.maintenanceHistory, {
      params: {
        limit: state.maintenanceSupport.rowsPerPage,
        page: state.maintenanceSupport.pageNo + 1,
        device_id: 10,
        ordering: state.maintenanceSupport.ordering,
      },
      
    });
    
    return data;
  },
);
