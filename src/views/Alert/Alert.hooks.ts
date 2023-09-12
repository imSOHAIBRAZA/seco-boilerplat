import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../lib";
import { fetchAlerts, fetchAllAlerts } from "../../features/alert/alert-thunk";
import { fetchAlertOptions } from "../../features/dropdown-data/dropdown-thunk";
import {
  setAlertSearchQuery,
  setAlertsSearchFilter,
  updateAlertFilters,
  updateAlertSearchQuery,
} from "../../features/alert/alert-slice";
import { fetchAllLocations } from "../../features/dropdown-data/dropdown-slice";
import { SearchPromiseT, SearchTimeoutT } from "../../types";

let searchPromise: SearchPromiseT;
let searchTimeout: SearchTimeoutT;

export const useAlert = () => {
  const rowsPerPage = useAppSelector((state) => state.alerts.rowsPerPage);
  const pageNo = useAppSelector((state) => state.alerts.pageNo);
  const orderBy = useAppSelector((state) => state.alerts.ordering);
  const selectedFilters = useAppSelector((state) => state.alerts.filters);
  const searchQuery = useAppSelector((state) => state.alerts.searchQuery);
  const searchFilter = useAppSelector((state) => state.alerts.searchFilter);

  const locationDropDownOption = useAppSelector((state) => state.dropdown.locations);
  const dispatch = useAppDispatch();

  const handleSelectFilter = (value: string[]) => dispatch(setAlertsSearchFilter(value));

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: query },
  }) => {
    clearTimeout(searchTimeout);

    dispatch(setAlertSearchQuery(query));

    searchTimeout = window.setTimeout(() => {
      searchPromise?.abort?.();
      searchPromise = dispatch(updateAlertSearchQuery(query));
    }, 500);
  };

  const handleFilters = (values: { name: string; value: string }) => {
    const { name, value } = values;
    if (Object.keys(selectedFilters).includes(name)) {
      const updatedFilters = {
        ...selectedFilters,
        [name]: value,
      };
      dispatch(updateAlertFilters(updatedFilters));
    }
  };

  React.useEffect(() => {
    dispatch(fetchAllLocations());
    dispatch(fetchAlertOptions());
    dispatch(fetchAlerts(null));

    return () => {
      searchPromise = undefined;
      clearTimeout(searchTimeout);
      searchTimeout = undefined;
    };
  }, []);

  React.useEffect(() => {
    dispatch(fetchAlerts(null));
    dispatch(fetchAllAlerts(null));
  }, [dispatch, rowsPerPage, pageNo, searchQuery, selectedFilters, orderBy]);

  return {
    handleSearch,
    searchQuery,
    searchFilter,
    handleSelectFilter,
    locationDropDownOption,
    selectedFilters,
    handleFilters,
  };
};
