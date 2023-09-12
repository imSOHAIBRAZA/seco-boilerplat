import { createAsyncThunk } from "@reduxjs/toolkit";
import { Option } from "../../components/Modal/Modal.types";
import { apis, axiosIns } from "../../lib";

export const fetchAlertOptions = createAsyncThunk("fetch/device-campaign", async () => {
  const { data } = await axiosIns.get(apis.alertOptions);

  const defaultOption: Option = { value: "all", label: "All" };

  let alertTypeList: Option[] = [defaultOption];
  Object.keys(data.alert_choices).forEach(function (key) {
    alertTypeList = [...alertTypeList, { label: key, value: data.alert_choices[key] }];
  });

  let alertLevelList: Option[] = [defaultOption];
  Object.keys(data.alert_levels).forEach(function (key) {
    alertLevelList = [...alertLevelList, { label: key, value: data.alert_levels[key] }];
  });

  return { alertTypeList, alertLevelList };
});
