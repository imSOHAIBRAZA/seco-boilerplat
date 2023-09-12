import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";
import { LocationFieldValues } from "../../views/Location/Location.types";
import { setLocationPage } from "./location-slice";
import _ from "lodash";

export const fetchLocations = createAsyncThunk(
  "locations/fetchPaginated",
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

    const { data } = await axiosIns.get(apis.location, {
      params: {
        limit: state.locations.rowsPerPage,
        page: state.locations.pageNo + 1,
        ordering: state.locations.ordering,
        state: "all",
      },
    });
    return data;
  },
);

export const fetchAllLocations = createAsyncThunk(
  "locations/fetchNonPaginated",
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

    const { data } = await axiosIns.get(`${apis.location}?all`, {
      params: {
        ordering: state.locations.ordering,
        state: "all",
      },
    });
    return data;
  },
);

export const searchLocations = createAsyncThunk(
  "locations/search",
  async (
    { query, filter }: { query: string; filter: string[] },
    { getState, signal, dispatch },
  ) => {
    const state = getState() as RootState;
    const initialPage = 0;

    let params: Record<string, unknown> = {
      limit: state.locations.rowsPerPage,
      page: initialPage + 1,
      ordering: state.locations.ordering,
      state: "all",
    };

    const trimmedQuery = query.trim();

    if (trimmedQuery !== "") {
      let filters = {};

      _.map(filter, (value) => {
        filters = { ...filters, [value]: trimmedQuery };
      });

      params = {
        _scope: "OR",
        ...params,
        ...filters,
      };
    }
    dispatch(setLocationPage(initialPage));

    const { data } = await axiosIns.get(apis.location, {
      params,
      signal,
    });
    return data;
  },
);

export const addLocation = createAsyncThunk(
  "locations/add",
  async (
    values: LocationFieldValues & {
      device_type_ids?: string;
    },
    { dispatch },
  ) => {
    const { data } = await axiosIns.post(apis.location, values);
    dispatch(fetchLocations({ query: "" }));

    return data;
  },
);

export const editLocation = createAsyncThunk(
  "locations/edit",
  async (
    values: Partial<LocationFieldValues> & {
      id: number;
    },
    { dispatch },
  ) => {
    const { data } = await axiosIns.put(`${apis.location}/${values.id}`, values);
    dispatch(fetchLocations({ query: "" }));

    return data;
  },
);

export const deleteLocation = createAsyncThunk(
  "locations/delete",
  async (id: number, { dispatch }) => {
    const { data } = await axiosIns.delete(`${apis.location}/${id}`);
    dispatch(fetchLocations({ query: "" }));

    return data;
  },
);
