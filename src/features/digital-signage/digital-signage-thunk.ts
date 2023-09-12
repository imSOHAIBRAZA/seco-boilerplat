import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";
import { Campaign } from "../../types/campaign";
import _ from "lodash";

export const fetchDeviceCampaign = createAsyncThunk("fetch/device-campaign", async (id: number) => {
  const { data } = await axiosIns.get(apis.campaign, {
    params: {
      device: id,
      all: true,
    },
  });

  return data;
});

export const addDeviceCampaign = createAsyncThunk("add/device-campaign", async (id: number) => {
  const { data } = await axiosIns.post(apis.campaign, {
    params: {
      device: id,
      all: true,
    },
  });

  return data;
});

export const editDeviceCampaign = createAsyncThunk("edit/device-campaign", async (id: number) => {
  const { data } = await axiosIns.put(apis.campaign, {
    params: {
      device: id,
      all: true,
    },
  });

  return data;
});

export const deleteDeviceCampaign = createAsyncThunk(
  "delete/device-campaign",
  async (id: number) => {
    const { data } = await axiosIns.delete(`${apis.campaign}/${id}`);

    return data;
  },
);

export const bulkCampaignSave = createAsyncThunk(
  "save/device-campaign",
  async (data: { data: Campaign[]; device: number }[]) => {
    const res = await Promise.all(
      _.map(data, (payload) => axiosIns.post(apis.saveCampaign, payload)),
    );

    return res;
  },
);

export const fetchAssetInfo = createAsyncThunk(
  "dashboard/fetchAssetInfo",
  async (_: unknown, { getState }) => {
    const state = getState() as RootState;

    const { data } = await axiosIns.get(apis.digitalSignageAssetInfo, {
      params: {
        limit: state.digitalsignage.rowsPerPage,
        ordering: state.digitalsignage.ordering,
        page: state.digitalsignage.pageNo + 1,
      },
    });
    return data;
  },
);

export const fetchAudienceAnalytic = createAsyncThunk("fetch/audience_analytic", async () => {
  const { data } = await axiosIns.get(apis.audienceAnalytics);
  return data;
});

export const fetchAdvertising = createAsyncThunk("fetch/advertising_list", async () => {
  const { data } = await axiosIns.get(apis.advertising);
  return data;
});

export const fetchVehicleVendors = createAsyncThunk("fetch/vehicle_vendors", async () => {
  const { data } = await axiosIns.get(apis.vehicleVendor);
  return data;
});

export const fetchDataViews = createAsyncThunk(
  "fetch/audienceDataViews",
  async (_: unknown, { getState }) => {
    const state = getState() as RootState;
    const { data } = await axiosIns.get(apis.audienceDataViews, {
      params: {
        view_type: state.digitalsignage.viewType,
        start_date: state.digitalsignage.viewStartDate,
        end_date: state.digitalsignage.viewEndDate,
      },
    });
    return data;
  },
);

export const fetchAdvertisingGraph = createAsyncThunk(
  "fetch/advertisingGraph",
  async (_: unknown, { getState }) => {
    const state = getState() as RootState;
    const { data } = await axiosIns.get(apis.advertisingGraph, {
      params: {
        start_date: state.digitalsignage.adsStartDate,
        end_date: state.digitalsignage.adsEndDate,
        campaigns: state.digitalsignage.selectedAds.join(","),
      },
    });
    return data;
  },
);
