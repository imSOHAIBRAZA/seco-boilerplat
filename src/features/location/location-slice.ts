import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../types";
import {
  addLocation,
  deleteLocation,
  editLocation,
  fetchAllLocations,
  fetchLocations,
  searchLocations,
} from "./location-thunk";

interface LocationState {
  locations: Location[];
  allLocations: Location[];
  selectedLocations: Location[];
  pageNo: number;
  isLoading: boolean;
  ordering: string;
  rowsPerPage: number;
  dataCount: number;
  isMutating: boolean;
}

const initialState: LocationState = {
  locations: [],
  allLocations: [],
  pageNo: 0,
  isLoading: false,
  ordering: "",
  rowsPerPage: 10,
  dataCount: 0,
  isMutating: false,
  selectedLocations: [],
};

const locationSlice = createSlice({
  name: "location-slice",
  initialState,
  reducers: {
    setLocationRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setLocationPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setLocationSelected(state, action: PayloadAction<Location[]>) {
      state.selectedLocations = action.payload;
    },
    setLocationOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchLocations.pending, (state) => {
        state.selectedLocations = [];
        state.isLoading = true;
      })
      .addCase(fetchLocations.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllLocations.fulfilled, (state, action) => {
        state.allLocations = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchAllLocations.pending, (state) => {
        state.selectedLocations = [];
        state.isLoading = true;
      })
      .addCase(fetchAllLocations.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(searchLocations.fulfilled, (state, action) => {
        state.locations = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(searchLocations.pending, (state) => {
        state.selectedLocations = [];
        state.isLoading = true;
      })
      .addCase(searchLocations.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addLocation.fulfilled, (state) => {
        state.selectedLocations = [];
        state.isMutating = false;
      })
      .addCase(addLocation.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(addLocation.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(editLocation.fulfilled, (state) => {
        state.selectedLocations = [];
        state.isMutating = false;
      })
      .addCase(editLocation.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(editLocation.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(deleteLocation.fulfilled, (state) => {
        state.selectedLocations = [];
        state.isMutating = false;
      })
      .addCase(deleteLocation.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(deleteLocation.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

export const { setLocationRowsPerPage, setLocationPage, setLocationSelected, setLocationOrdering } =
  locationSlice.actions;

export default locationSlice;
