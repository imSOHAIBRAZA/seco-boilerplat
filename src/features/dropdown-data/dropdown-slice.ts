import { createSlice } from "@reduxjs/toolkit";
import { Option } from "../../components/Modal/Modal.types";
import { apis } from "../../lib";
import { generateThunk } from "../../lib/generateThunk";
import { fetchAlertOptions } from "./dropdown-thunk";

interface DropdownState {
  operators: Option[];
  users: Option[];
  deviceTypes: Option[];
  status: Option[];
  alertType: Option[];
  alertLevel: Option[];
  locations: Option[];
  chartFilters: Option[];
}

const chartFilters: Option[] = [
  {
    value: "day",
    label: "Day",
  },
  {
    value: "week",
    label: "Week",
  },
  {
    value: "month",
    label: "Month",
  },
  {
    value: "year",
    label: "Year",
  },
];

const initialState: DropdownState = {
  chartFilters,
  operators: [],
  users: [],
  deviceTypes: [],
  status: [
    { value: "Enable", label: "Enable" },
    { value: "Disable", label: "Disable" },
  ],
  alertType: [],
  alertLevel: [],
  locations: [],
};

export const fetchAllOperators = generateThunk("operators/fetchAll", apis.operator, {
  mappings: {
    labelMap: "business_name",
  },
  defaultAllSelection: false,
});
export const fetchAllUsers = generateThunk("users/fetchAll", apis.user, {
  mappings: {
    labelMap: "name",
  },
  defaultAllSelection: false,
});
export const fetchAllDeviceTypes = generateThunk("deviceTypes/fetchAll", apis.deviceType, {
  mappings: {
    labelMap: "name",
  },
  defaultAllSelection: false,
});
export const fetchAllLocations = generateThunk("locations/fetchAll", apis.location, {
  mappings: {
    idMap: "location_id",
    labelMap: "location_name",
  },
  defaultAllSelection: true,
});

const dropdownSlice = createSlice({
  name: "dropdown-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOperators.fulfilled, (state, action) => {
        state.operators = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchAllDeviceTypes.fulfilled, (state, action) => {
        state.deviceTypes = action.payload;
      })
      .addCase(fetchAlertOptions.fulfilled, (state, action) => {
        state.alertType = action.payload.alertTypeList;
        state.alertLevel = action.payload.alertLevelList;
      })
      .addCase(fetchAllLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
      });
  },
});

export default dropdownSlice;
