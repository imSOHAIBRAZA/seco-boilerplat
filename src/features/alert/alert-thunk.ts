import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";
import _ from "lodash";
import { IAlertFilters } from "../../views/Alert/Alert.types";

export const fetchAlerts = createAsyncThunk(
  "alerts/fetchPaginated",
  async (_x: unknown, { getState }) => {
    const state = getState() as RootState;
    const activeFilter = state.alerts.activeFilter;

    let updatedSearchFilters = {} as any;
    if (activeFilter === "search") {
      const searchFilter = state.alerts.searchFilter;
      const query = state.alerts.searchQuery;
      const trimmedQuery = query.trim();
      _.forEach(searchFilter, (value) => {
        updatedSearchFilters = {
          ...updatedSearchFilters,
          [value]: trimmedQuery,
        };
      });
      updatedSearchFilters._scope = "OR";
    }
    if (activeFilter === "filters") {
      const selectedFilters = state.alerts.filters;

      _.forEach(Object.keys(selectedFilters), (f) => {
        const value = selectedFilters[f as keyof IAlertFilters];
        if (value && value !== "all") {
          updatedSearchFilters = {
            ...updatedSearchFilters,
            [f]: value,
          };
        }
      });
    }

    const { data } = await axiosIns.get(apis.alerts, {
      params: {
        limit: state.alerts.rowsPerPage,
        page: state.alerts.pageNo + 1,
        ordering: state.alerts.ordering,
        ...updatedSearchFilters,
      },
    });
    return data;
  },
);

export const fetchAllAlerts = createAsyncThunk(
  "alerts/fetchNonPaginated",
  async (_x: unknown, { getState }) => {
    const state = getState() as RootState;
    const activeFilter = state.alerts.activeFilter;

    let updatedSearchFilters = {} as any;

    if (activeFilter === "search") {
      const searchFilter = state.alerts.searchFilter;
      const query = state.alerts.searchQuery;
      const trimmedQuery = query.trim();
      _.forEach(searchFilter, (value) => {
        updatedSearchFilters = {
          ...updatedSearchFilters,
          [value]: trimmedQuery,
        };
      });
      updatedSearchFilters._scope = "OR";
    }
    if (activeFilter === "filters") {
      const selectedFilters = state.alerts.filters;

      _.forEach(Object.keys(selectedFilters), (f) => {
        const value = selectedFilters[f as keyof IAlertFilters];
        if (value && value !== "all") {
          updatedSearchFilters = {
            ...updatedSearchFilters,
            [f]: value,
          };
        }
      });
    }

    const { data } = await axiosIns.get(`${apis.alerts}?all`, {
      params: {
        ...updatedSearchFilters,
      },
    });
    return data;
  },
);
