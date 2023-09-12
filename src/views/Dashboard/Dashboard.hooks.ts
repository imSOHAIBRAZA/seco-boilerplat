import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../lib";
import {
  fetchDevicesList,
  fetchDigitalSignage,
  fetchHistory,
  fetchStatistics,
  fetchWorkingMinutes,
} from "../../features/dashboard/dashboard-thunk";
import { featuredStatsLabels, chartLabels } from "./Dashboard.mocks";
import { IStatistics, IWorkingMinutes } from "../../types/dashboard";

export const useDashboard = () => {
  const rowsPerPage = useAppSelector((state) => state.dashboard.rowsPerPage);
  const pageNo = useAppSelector((state) => state.dashboard.pageNo);
  const statistics = useAppSelector((state) => state.dashboard.statistics);
  const workingMinutes = useAppSelector((state) => state.dashboard.workingMinutes);
  const devices = useAppSelector((state) => state.dashboard.devices);
  const orderBy = useAppSelector((state) => state.dashboard.ordering);

  const dispatch = useAppDispatch();
  const dashboardStatistics = React.useMemo(() => {
    return featuredStatsLabels.map((stat) => ({
      ...stat,
      totalValue:
        stat.id === "real_time"
          ? `${statistics?.device_connected}/${devices.length}`
          : `${stat.valueSuffix || ""}${statistics[stat.id as keyof IStatistics] || 0}${
              stat.valuePrefix || ""
            }`,
    }));
  }, [statistics, devices]);

  const pieData = React.useMemo(() => {
    return chartLabels.map((data) => ({
      ...data,
      series: workingMinutes[data.id as keyof IWorkingMinutes] || 0,
    }));
  }, [workingMinutes]);

  React.useEffect(() => {
    dispatch(fetchDevicesList());
    dispatch(fetchStatistics());
    dispatch(fetchWorkingMinutes());
    dispatch(fetchDigitalSignage());
  }, []);

  React.useEffect(() => {
    dispatch(fetchHistory(null));
  }, [dispatch, rowsPerPage, pageNo, orderBy]);

  return {
    pieData,
    dashboardStatistics,
  };
};
