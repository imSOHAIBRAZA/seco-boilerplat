import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { App } from "../../types";
import { addApp, deleteApp, editApp, fetchApps, fetchInitialApps, searchApps, insatllApp } from "./appstore-thunk";

interface AppStoreState {
  apps: App[];
  queriedApps: App[];
  selectedApps: App[];
  pageNo: number;
  isLoading: boolean;
  isInitialLoading: boolean;
  ordering: string;
  rowsPerPage: number;
  dataCount: number;
  isMutating: boolean;
}

const initialState: AppStoreState = {
  /** Separating the apps with appstore queried apps here 
   * apps is general purpose and is being used in the routes
   * and navigation flow, while the queriedApps is for CRUD
   * on appstore
  */
  apps: [],
  queriedApps: [],
  pageNo: 0,
  isLoading: false,
  isInitialLoading: false,
  ordering: "business_name",
  rowsPerPage: 9,
  dataCount: 0,
  isMutating: false,
  selectedApps: [],
};

const appstoreSlice = createSlice({
  name: "appstore-slice",
  initialState,
  reducers: {
    emptyApps(state) {
      state.apps = [];
    },
    setAppStoreRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setAppStorePage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setSelectedApps(state, action: PayloadAction<App[]>) {
      state.selectedApps = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApps.fulfilled, (state, action) => {
        state.apps = action.payload?.results;
        state.queriedApps = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchApps.pending, (state) => {
        state.selectedApps = [];
        state.isLoading = true;
      })
      .addCase(fetchApps.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchInitialApps.fulfilled, (state, action) => {
        state.apps = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isInitialLoading = false;
      })
      .addCase(fetchInitialApps.pending, (state) => {
        state.selectedApps = [];
        state.isInitialLoading = true;
      })
      .addCase(fetchInitialApps.rejected, (state) => {
        state.isInitialLoading = false;
      })
      .addCase(searchApps.fulfilled, (state, action) => {
        state.queriedApps = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(searchApps.pending, (state) => {
        state.selectedApps = [];
        state.isLoading = true;
      })
      .addCase(searchApps.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addApp.fulfilled, (state) => {
        state.selectedApps = [];
        state.isMutating = false;
      })
      .addCase(addApp.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(addApp.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(insatllApp.fulfilled, (state) => {
        state.selectedApps = [];
        state.isMutating = false;
      })
      .addCase(insatllApp.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(insatllApp.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(editApp.fulfilled, (state) => {
        state.selectedApps = [];
        state.isMutating = false;
      })
      .addCase(editApp.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(editApp.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(deleteApp.fulfilled, (state) => {
        state.selectedApps = [];
        state.isMutating = false;
      })
      .addCase(deleteApp.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(deleteApp.rejected, (state) => {
        state.isMutating = false;
      });
  },
});

export const { setAppStoreRowsPerPage, setAppStorePage, setSelectedApps, emptyApps } = appstoreSlice.actions;

export default appstoreSlice;
