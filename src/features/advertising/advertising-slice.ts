import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addAdvertise,
  deleteAdvertise,
  editAdvertise,
  fetchAdvertise,
  fetchAllAdvertise,
  searchAdvertisings,
} from "./advertising-thunk";

interface AdvertisingState {
  advertise: any[];
  allAdvertise: any[];
  selectedAdvertise: any[];
  pageNo: number;
  isLoading: boolean;
  ordering: string;
  rowsPerPage: number;
  dataCount: number;
  isMutating: boolean;
}

const initialState: AdvertisingState = {
  advertise: [],
  allAdvertise: [],
  pageNo: 0,
  isLoading: false,
  ordering: "",
  rowsPerPage: 10,
  dataCount: 0,
  isMutating: false,
  selectedAdvertise: [],
};

const advertisingSlice = createSlice({
  name: "advertising-slice",
  initialState,
  reducers: {
    setAdvertisingRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setAdvertisingPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setAdvertisingSelected(state, action: PayloadAction<any[]>) {
      state.selectedAdvertise = action.payload;
    },
    setAdvertisingOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdvertise.fulfilled, (state, action) => {
        state.advertise = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchAdvertise.pending, (state) => {
        state.selectedAdvertise = [];
        state.isLoading = true;
      })
      .addCase(fetchAdvertise.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAdvertise.fulfilled, (state, action) => {
        state.allAdvertise = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchAllAdvertise.pending, (state) => {
        state.selectedAdvertise = [];
        state.isLoading = true;
      })
      .addCase(fetchAllAdvertise.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(searchAdvertisings.fulfilled, (state, action) => {
        state.advertise = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(searchAdvertisings.pending, (state) => {
        state.selectedAdvertise = [];
        state.isLoading = true;
      })
      .addCase(searchAdvertisings.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addAdvertise.fulfilled, (state) => {
        state.selectedAdvertise = [];
        state.isMutating = false;
      })
      .addCase(addAdvertise.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(addAdvertise.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(editAdvertise.fulfilled, (state) => {
        state.selectedAdvertise = [];
        state.isMutating = false;
      })
      .addCase(editAdvertise.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(editAdvertise.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(deleteAdvertise.fulfilled, (state) => {
        state.selectedAdvertise = [];
        state.isMutating = false;
      })
      .addCase(deleteAdvertise.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(deleteAdvertise.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

export const { setAdvertisingRowsPerPage, setAdvertisingPage, setAdvertisingSelected, setAdvertisingOrdering } =
  advertisingSlice.actions;

export default advertisingSlice;
