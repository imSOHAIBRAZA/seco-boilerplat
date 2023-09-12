import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import format from "date-fns/format";
import { GraphAdd } from "../../types/campaign";
import { Asset, IAdvertising, IVehicleVendor } from "../../types/digital-signage";
import type { EmotionT, EVCharger } from "../../types/ev-charger";
import {
  bulkCampaignSave,
  fetchAssetInfo,
  fetchDeviceCampaign,
  fetchAudienceAnalytic,
  fetchAdvertising,
  fetchVehicleVendors,
  fetchDataViews,
  fetchAdvertisingGraph,
} from "./digital-signage-thunk";

interface DigitalSignageState {
  selectedStation: EVCharger[];
  isLoading: boolean;
  isMutating: boolean;
  assets: Asset[];
  rowsPerPage: number;
  dataCount: number;
  pageNo: number;
  ordering: string;
  analytics: (Record<string, number> & { date: string })[];
  advertising: number;
  average: number;
  performance: number;
  total_presence: number;
  vehicleVendors: IVehicleVendor[];
  advertisingList: IAdvertising[];
  viewType: EmotionT;
  viewStartDate: string | Date;
  viewEndDate: string | Date;
  adsStartDate: string | Date;
  adsEndDate: string | Date;
  audienceViews: {
    [key: string]: number;
  };
  selectedAds: number[];
  adsGraphData: {
    [key: string]: GraphAdd[];
  };
}

const today = format(new Date(), "yyyy-MM-dd");
const initialState: DigitalSignageState = {
  selectedStation: [],
  isLoading: false,
  isMutating: false,
  assets: [],
  rowsPerPage: 5,
  pageNo: 0,
  ordering: "",
  dataCount: 0,
  analytics: [],
  advertising: 0,
  average: 0,
  performance: 0,
  total_presence: 0,
  vehicleVendors: [],
  advertisingList: [],
  viewType: "age",
  viewStartDate: today,
  viewEndDate: today,
  audienceViews: {},
  selectedAds: [],
  adsStartDate: "2020-01-01",
  adsEndDate: today,
  adsGraphData: {},
};

const digitalSignageSlice = createSlice({
  name: "digital-signage-slice",
  initialState,
  reducers: {
    setStationSelected(state, action: PayloadAction<EVCharger[]>) {
      state.selectedStation = action.payload;
    },
    setAssetRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setAssetPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setAssetsOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
    setViewType(state, action: PayloadAction<EmotionT>) {
      state.viewType = action.payload;
    },
    setViewStartDate(state, action: PayloadAction<string>) {
      state.viewStartDate = action.payload;
    },
    setViewEndDate(state, action: PayloadAction<string>) {
      state.viewEndDate = action.payload;
    },

    setSelectedAds(state, action: PayloadAction<number[]>) {
      state.selectedAds = action.payload;
    },
    setAdsStartDate(state, action: PayloadAction<string>) {
      state.adsStartDate = action.payload;
    },
    setAdsEndDate(state, action: PayloadAction<string>) {
      state.adsEndDate = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDeviceCampaign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDeviceCampaign.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDeviceCampaign.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(bulkCampaignSave.fulfilled, (state) => {
        state.isMutating = false;
      })
      .addCase(bulkCampaignSave.pending, (state) => {
        state.isMutating = true;
      })
      .addCase(bulkCampaignSave.rejected, (state) => {
        state.isMutating = false;
      })
      .addCase(fetchAssetInfo.fulfilled, (state, action) => {
        state.assets = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(fetchAssetInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAssetInfo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAudienceAnalytic.fulfilled, (state, action) => {
        state.analytics = action.payload.analytics;
        state.advertising = action.payload.advertising;
        state.average = action.payload.average;
        state.performance = action.payload.performance;
        state.total_presence = action.payload.total_presence;
        state.isLoading = false;
      })
      .addCase(fetchAudienceAnalytic.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAudienceAnalytic.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAdvertising.fulfilled, (state, action) => {
        state.advertisingList = action.payload?.results;
        state.isLoading = false;
      })
      .addCase(fetchAdvertising.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdvertising.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchVehicleVendors.fulfilled, (state, action) => {
        state.vehicleVendors = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchVehicleVendors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVehicleVendors.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchDataViews.fulfilled, (state, action) => {
        state.audienceViews = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDataViews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDataViews.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAdvertisingGraph.fulfilled, (state, action) => {
        state.adsGraphData = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAdvertisingGraph.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdvertisingGraph.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setStationSelected,
  setAssetRowsPerPage,
  setAssetPage,
  setAssetsOrdering,
  setViewType,
  setViewStartDate,
  setViewEndDate,
  setSelectedAds,
  setAdsStartDate,
  setAdsEndDate,
} = digitalSignageSlice.actions;

export default digitalSignageSlice;
