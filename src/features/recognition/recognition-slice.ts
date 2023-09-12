import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EVCharger } from "../../types";
import { Vehicle } from "../../types/Recognition";
import { fetchAllVehicles, fetchVehicles, searchVehicles } from "./recognition-thunk";

interface RecognitionState {
  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  selectedVehicles: Vehicle[];
  selectedStation: EVCharger | null;
  pageNo: number;
  isLoading: boolean;
  ordering: string;
  rowsPerPage: number;
  dataCount: number;
  isMutating: boolean;
}

const initialState: RecognitionState = {
  vehicles: [],
  allVehicles: [],
  pageNo: 0,
  isLoading: false,
  ordering: "",
  rowsPerPage: 10,
  dataCount: 0,
  isMutating: false,
  selectedVehicles: [],
  selectedStation: null,
};

const RecognitionSlice = createSlice({
  name: "recognition-slice",
  initialState,
  reducers: {
    setStationSelected(state, action: PayloadAction<EVCharger | null>) {
      state.selectedStation = action.payload;
    },
    deselectStation(state) {
      state.selectedStation = null;
    },

    setVehicleRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setVehiclePage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setSelectedVehicles(state, action: PayloadAction<Vehicle[]>) {
      state.selectedVehicles = action.payload;
    },
    setVehicleOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchVehicles.pending, (state) => {
        state.selectedVehicles = [];
        state.isLoading = true;
      })
      .addCase(fetchVehicles.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllVehicles.fulfilled, (state, action) => {
        state.allVehicles = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchAllVehicles.pending, (state) => {
        state.selectedVehicles = [];
        state.isLoading = true;
      })
      .addCase(fetchAllVehicles.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(searchVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(searchVehicles.pending, (state) => {
        state.selectedVehicles = [];
        state.isLoading = true;
      })
      .addCase(searchVehicles.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setStationSelected, setSelectedVehicles, setVehiclePage, setVehicleRowsPerPage, setVehicleOrdering } =
  RecognitionSlice.actions;

export default RecognitionSlice;
