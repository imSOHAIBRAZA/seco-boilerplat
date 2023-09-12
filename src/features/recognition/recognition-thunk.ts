import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";
import { setVehiclePage } from "./recognition-slice";
import _ from "lodash";

export const fetchVehicles = createAsyncThunk(
  "vehicles/fetchPaginated",
  async ({ query, filter }: { query?: string; filter?: string[] }, { getState }) => {
    const state = getState() as RootState;

    const trimmedQuery = query?.trim();
    let filters: Record<string, string> = {};

    if (trimmedQuery) {
      _.map(filter, (value) => {
        filters = { ...filters, [value]: trimmedQuery };
      });

      filters._scope = "OR";
    }

    const { data } = await axiosIns.get(apis.vehicle, {
      params: {
        limit: state.vehicles.rowsPerPage,
        page: state.vehicles.pageNo + 1,
        ordering: state.vehicles.ordering,
      },
    });

    return data;
  },
);

export const fetchAllVehicles = createAsyncThunk(
  "vehicles/fetchNonPaginated",
  async ({ query, filter }: { query?: string; filter?: string[] }) => {

    const trimmedQuery = query?.trim();
    let filters: Record<string, string> = {};

    if (trimmedQuery) {
      _.map(filter, (value) => {
        filters = { ...filters, [value]: trimmedQuery };
      });

      filters._scope = "OR";
    }

    const { data } = await axiosIns.get(`${apis.vehicle}?all`, {
      params: {
      },
    });

    return data;
  },
);

export const searchVehicles = createAsyncThunk(
  "vehicles/search",
  async (
    { filter, query }: { query: string; filter: string[] },
    { getState, signal, dispatch },
  ) => {
    const state = getState() as RootState;
    const initialPage = 0;

    const trimmedQuery = query.trim();
    let filters = {};

    _.map(filter, (value) => {
      filters = { ...filters, [value]: trimmedQuery };
    });

    dispatch(setVehiclePage(initialPage));

    const { data } = await axiosIns.get(apis.vehicle, {
      params: {
        limit: state.vehicles.rowsPerPage,
        page: initialPage + 1,
        _scope: "OR",
        ...filters,
      },
      signal,
    });
    return data?.data;
  },
);
