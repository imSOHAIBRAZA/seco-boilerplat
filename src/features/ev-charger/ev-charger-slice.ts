import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EVCharger } from "../../types";
import {
  addEVCharger,
  deleteEVCharger,
  editEVCharger,
  fetchAllEVChargers,
  fetchEVChargers,
  searchEVChargers,
} from "./ev-charger-thunk";

interface EVChargerState {
  evchargers: EVCharger[];
  allEvchargers: EVCharger[];
  selectedEVChargers: EVCharger[];
  pageNo: number;
  isLoading: boolean;
  ordering: string;
  rowsPerPage: number;
  dataCount: number;
  isMutating: boolean;
  history: any;
}

const initialState: EVChargerState = {
  evchargers: [],
  allEvchargers: [],
  pageNo: 0,
  isLoading: false,
  ordering: "",
  rowsPerPage: 10,
  dataCount: 0,
  isMutating: false,
  history: null,
  selectedEVChargers: [],
};

const evchargerSlice = createSlice({
  name: "evcharger-slice",
  initialState,
  reducers: {
    setEVChargerRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setEVChargerPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setEVChargerSelected(state, action: PayloadAction<EVCharger[]>) {
      state.selectedEVChargers = action.payload;
    },
    setEVChargerOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
    setHistoryEvcharger(state, action: PayloadAction<any>) {
      state.history = action.payload;
    },
    resetEVChargerState(state) {
      state.evchargers = [];
      state.pageNo = 0;
      state.isLoading = false;
      state.ordering = "business_name";
      state.rowsPerPage = 10;
      state.dataCount = 0;
      state.isMutating = false;
      state.selectedEVChargers = [];
      state.history = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEVChargers.fulfilled, (state, action) => {
        state.evchargers = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchEVChargers.pending, (state) => {
        state.selectedEVChargers = [];
        state.isLoading = true;
      })
      .addCase(fetchEVChargers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllEVChargers.fulfilled, (state, action) => {
        state.allEvchargers = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchAllEVChargers.pending, (state) => {
        state.selectedEVChargers = [];
        state.isLoading = true;
      })
      .addCase(fetchAllEVChargers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(searchEVChargers.fulfilled, (state, action) => {
        state.evchargers = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(searchEVChargers.pending, (state) => {
        state.selectedEVChargers = [];
        state.isLoading = true;
      })
      .addCase(searchEVChargers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addEVCharger.fulfilled, (state) => {
        state.selectedEVChargers = [];
        state.isMutating = false;
      })
      .addCase(addEVCharger.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(addEVCharger.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(editEVCharger.fulfilled, (state) => {
        state.selectedEVChargers = [];
        state.isMutating = false;
      })
      .addCase(editEVCharger.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(editEVCharger.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(deleteEVCharger.fulfilled, (state) => {
        state.selectedEVChargers = [];
        state.isMutating = false;
      })
      .addCase(deleteEVCharger.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(deleteEVCharger.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

export const {
  setEVChargerRowsPerPage,
  setEVChargerPage,
  setEVChargerSelected,
  setHistoryEvcharger,
  resetEVChargerState,
  setEVChargerOrdering
} = evchargerSlice.actions;

export default evchargerSlice;
