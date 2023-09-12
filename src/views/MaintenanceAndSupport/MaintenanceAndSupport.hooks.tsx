import * as React from "react";
import {
  fetchMaintenanceHistory,
  fetchMaintenanceStats,
} from "../../features/maintenance-support/maintenance-support-thunk";
import { updateTemperatureFilters } from "../../features/maintenance-support/maintenance-support-slice";
import { useAppDispatch, useAppSelector } from "../../lib";
import _map from "lodash/map";
import _omit from "lodash/omit";
import _filter from "lodash/filter";
import _forEach from "lodash/forEach";

export function useMaintenanceAndSupport() {
  const pageNo = useAppSelector((state) => state.maintenanceSupport.pageNo);
  const rowsPerPage = useAppSelector((state) => state.maintenanceSupport.rowsPerPage);
  const selectedStation = useAppSelector((state) => state.maintenanceSupport.selectedStation);
  const temperatureData = useAppSelector((state) => state.maintenanceSupport.temperatureData);
  const temperatureFilter = useAppSelector((state) => state.maintenanceSupport.temperatureFilter);
  const selectedFilters = useAppSelector((state) => state.maintenanceSupport.filters);
  const orderBy = useAppSelector((state) => state.maintenanceSupport.ordering);

  const temperatureDate = _map(temperatureData, ({ date }) => date);

  // eslint-disable-next-line
  let temperaturChartSeries: ApexAxisChartSeries = [];

  _forEach(temperatureData, (value) => {
    const removeDate = _omit(value, ["date"]);
    temperaturChartSeries = _map(removeDate, (_, key) => ({ name: key, data: [] }));
  });

  _forEach(temperatureData, (value) => {
    _map(value, (val: number, key) => {
      temperaturChartSeries = _map(temperaturChartSeries, (data) =>
        data.name === key
          ? { ...data, type: "line", data: [...data?.data, val] as number[] }
          : data,
      );
    });
  });

  temperaturChartSeries = _filter(
    temperaturChartSeries,
    (value) => value.name === temperatureFilter,
  );

  const dispatch = useAppDispatch();

  const handleFilters = (values: { name: string; value: string }) => {
    const { name, value } = values;
    if (Object.keys(selectedFilters).includes(name)) {
      const updatedFilters = {
        ...selectedFilters,
        [name]: value,
      };
      dispatch(updateTemperatureFilters(updatedFilters));
    }
  };

  React.useEffect(() => {
    if (selectedStation) {
      dispatch(fetchMaintenanceHistory(selectedStation.id));
    }
  }, [selectedStation]);

  React.useEffect(() => {
    if (selectedStation) {
      dispatch(fetchMaintenanceStats(selectedStation.id));
    }
  }, [selectedStation, selectedFilters]);

  React.useEffect(() => {
    if (selectedStation) {
      dispatch(fetchMaintenanceHistory(selectedStation.id));
    }
  }, [selectedStation, pageNo, rowsPerPage, orderBy]);

  return {
    temperatureDate,
    temperaturChartSeries,
    handleFilters,
  };
}
