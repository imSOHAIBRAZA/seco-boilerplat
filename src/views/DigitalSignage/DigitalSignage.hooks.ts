import * as React from "react";
import {
  bulkCampaignSave,
  fetchAdvertising,
  fetchAssetInfo,
  fetchDeviceCampaign,
  fetchAudienceAnalytic,
  fetchVehicleVendors,
  fetchDataViews,
  fetchAdvertisingGraph,
} from "../../features/digital-signage/digital-signage-thunk";
import { serverErrorHandlers, useAppDispatch, useAppSelector, useSnackbar } from "../../lib";
import { Campaign } from "../../types/campaign";
import * as mocks from "./DigitalSignage.mocks";
import { fetchEVChargers } from "../../features/ev-charger/ev-charger-thunk";
import { resetEVChargerState } from "../../features/ev-charger/ev-charger-slice";
import {
  setAssetPage,
  setAssetRowsPerPage,
  setAssetsOrdering,
  setSelectedAds,
  setViewEndDate,
  setViewStartDate,
  setAdsStartDate,
  setAdsEndDate,
  setViewType,
} from "../../features/digital-signage/digital-signage-slice";
import _map from "lodash/map";
import _filter from "lodash/filter";
import _omit from "lodash/omit";
import _forEach from "lodash/forEach";
import format from "date-fns/format";
import { endOfMonth, endOfWeek, endOfYear, startOfMonth, startOfWeek, startOfYear } from "date-fns";

export const useDigitalSignageAudience = () => {
  const dispatch = useAppDispatch();
  const analytics = useAppSelector((state) => state.digitalsignage.analytics);
  const viewType = useAppSelector((state) => state.digitalsignage.viewType);
  const viewStartDate = useAppSelector((state) => state.digitalsignage.viewStartDate);
  const viewEndDate = useAppSelector((state) => state.digitalsignage.viewEndDate);

  const [selectedTime, setSelectedTime] = React.useState("day");

  const analyticsDate = _map(analytics, ({ date }) => date);

  // eslint-disable-next-line
  let analyticsChartSeries: ApexAxisChartSeries = [];

  _forEach(analytics, (value) => {
    const removeDate = _omit(value, ["date"]);
    analyticsChartSeries = _map(removeDate, (_, key) => ({ name: key, data: [] }));
  });

  _forEach(analytics, (value) => {
    _map(value, (val, key) => {
      analyticsChartSeries = _map(analyticsChartSeries, (data, index: number) =>
        data.name === key
          ? { ...data, type: index === 0 ? "line" : "bar", data: [...data?.data, val] as number[] }
          : data,
      );
    });
  });

  React.useEffect(() => {
    dispatch(fetchAudienceAnalytic());
    dispatch(fetchVehicleVendors());
  }, []);

  React.useEffect(() => {
    dispatch(fetchDataViews(null));
  }, [viewType, viewStartDate, viewEndDate]);

  const onViewTypeChange = (event: React.SyntheticEvent, view: "age" | "emotion") => {
    dispatch(setViewType(view));
  };
  const onViewTimeChange = (event: React.SyntheticEvent, viewTime: string) => {
    let sDate: Date | string = new Date();
    let eDate: Date | string = new Date();
    setSelectedTime(viewTime);
    if (viewTime === "day") {
      sDate = format(sDate, "yyyy-MM-dd");
      dispatch(setViewStartDate(sDate));
      dispatch(setViewEndDate(sDate));
    }
    if (viewTime === "week") {
      sDate = format(startOfWeek(sDate as Date), "yyyy-MM-dd");
      eDate = format(endOfWeek(eDate as Date), "yyyy-MM-dd");

      dispatch(setViewStartDate(sDate));
      dispatch(setViewEndDate(eDate));
    }
    if (viewTime === "month") {
      sDate = format(startOfMonth(sDate as Date), "yyyy-MM-dd");
      eDate = format(endOfMonth(eDate as Date), "yyyy-MM-dd");
      dispatch(setViewStartDate(sDate));
      dispatch(setViewEndDate(eDate));
    }
    if (viewTime === "year") {
      sDate = format(startOfYear(sDate as Date), "yyyy-MM-dd");
      eDate = format(endOfYear(eDate as Date), "yyyy-MM-dd");
      dispatch(setViewStartDate(sDate));
      dispatch(setViewEndDate(eDate));
    }
  };
  const handleStartDate = (date: string) => {
    dispatch(setViewStartDate(date));
  };

  const handleEndDate = (date: string) => {
    dispatch(setViewEndDate(date));
  };

  return {
    analyticsDate,
    analyticsChartSeries,
    selectedTime,
    onViewTypeChange,
    handleEndDate,
    handleStartDate,
    onViewTimeChange,
  };
};

export function useDigitalSignage() {
  const [deviceCampaignList, setDeviceCampaignList] = React.useState<Campaign[]>([]);

  const selectedStation = useAppSelector((state) => state.digitalsignage.selectedStation);

  const { snackbar } = useSnackbar();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const fetchCampaigns = async (id: number) => {
      try {
        const data = await dispatch(fetchDeviceCampaign(id)).unwrap();
        setDeviceCampaignList(data);
      } catch (err) {
        serverErrorHandlers(err, snackbar);
      }
    };

    if (selectedStation?.length === 1) {
      fetchCampaigns(selectedStation[0].id);
    } else {
      setDeviceCampaignList(mocks.CampaignList);
    }
  }, [selectedStation]);

  React.useEffect(() => {
    dispatch(fetchEVChargers({ query: "" }));

    return () => {
      dispatch(resetEVChargerState());
    };
  }, []);

  const addCampaign = () => {
    setDeviceCampaignList((prevState) => [...prevState, mocks.singleCampaign]);
  };

  const editCampaign = async (index: number, field: string, value: string) => {
    setDeviceCampaignList((prevState) =>
      _map(prevState, (campaign, i) => {
        if (i === index) {
          return { ...campaign, [field]: value };
        } else {
          return campaign;
        }
      }),
    );
  };

  const deleteCampaign = (index: number) => {
    setDeviceCampaignList((prevState) => _filter(prevState, (_r, i) => i !== index));
  };

  const saveCampaigns = async () => {
    try {
      const payload = _map(selectedStation, (station) => ({
        data: _map(deviceCampaignList, (campaign) => ({ device: station?.id, ...campaign })),
        device: station?.id as number,
      }));

      await dispatch(bulkCampaignSave(payload)).unwrap();
      snackbar({ message: "Campaign(s) saved successfully", type: "success" });
    } catch (err: unknown) {
      serverErrorHandlers(err, snackbar);
    }
  };

  return {
    deviceCampaignList,
    addCampaign,
    editCampaign,
    deleteCampaign,
    saveCampaigns,
  };
}

export const useDigitalSignageAdvertise = () => {
  const rowsPerPage = useAppSelector((state) => state.digitalsignage.rowsPerPage);
  const pageNo = useAppSelector((state) => state.digitalsignage.pageNo);
  const orderBy = useAppSelector((state) => state.digitalsignage.ordering);
  const selectedAds = useAppSelector((state) => state.digitalsignage.selectedAds);
  const adsStartDate = useAppSelector((state) => state.digitalsignage.adsStartDate);
  const adsEndDate = useAppSelector((state) => state.digitalsignage.adsEndDate);

  const dispatch = useAppDispatch();

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setAssetRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setAssetPage(page));
  };

  const handleSort = (order: string) => {
    dispatch(setAssetsOrdering(order));
  };
  const handleAdsSelection = (selected: number[]) => {
    dispatch(setSelectedAds(selected));
  };
  const handleStartDate = (date: string) => {
    dispatch(setAdsStartDate(date));
  };

  const handleEndDate = (date: string) => {
    dispatch(setAdsEndDate(date));
  };

  React.useEffect(() => {
    dispatch(fetchAdvertising());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(fetchAssetInfo(null));
  }, [dispatch, rowsPerPage, pageNo, orderBy]);

  React.useEffect(() => {
    dispatch(fetchAdvertisingGraph(null));
  }, [selectedAds, adsStartDate, adsEndDate]);
  return {
    handleRowsPerPageChange,
    handlePageChange,
    handleSort,
    handleAdsSelection,
    handleStartDate,
    handleEndDate,
  };
};
