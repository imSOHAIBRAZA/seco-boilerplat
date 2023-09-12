import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";
import { setEVChargerPage } from "./ev-charger-slice";
import _ from "lodash";

export const fetchEVChargers = createAsyncThunk(
  "evchargers/fetchPaginated",
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

    let order = state.evchargers.ordering;
    if (order.includes("company")) {
      order = order.replace("company", "company__business_name");
    } else if (order.includes("address")) {
      order = order.replace("address", "address__address");
    } else if (order.includes("device_type")) {
      order = order.replace("device_type", "device_type__name");
    }

    const { data } = await axiosIns.get(apis.device, {
      params: {
        limit: state.evchargers.rowsPerPage,
        page: state.evchargers.pageNo + 1,
        ordering: order,
      },
    });
    return data?.data;
  },
);

export const fetchAllEVChargers = createAsyncThunk(
  "evchargers/fetchNonPaginated",
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
    const { data } = await axiosIns.get(`${apis.device}?all`, {
      params: {
        ordering: state.evchargers.ordering,
      },
    });
    return data?.data;
  },
);

export const searchEVChargers = createAsyncThunk(
  "evchargers/search",
  async (
    { query, filter }: { query: string; filter: string[] },
    { getState, signal, dispatch },
  ) => {
    const state = getState() as RootState;
    const initialPage = 0;

    let params: Record<string, unknown> = {
      limit: state.evchargers.rowsPerPage,
      page: initialPage + 1,
      ordering: state.evchargers.ordering,
    };

    const trimmedQuery = query.trim();

    if (trimmedQuery !== "") {
      let filters: any = {};

      _.map(filter, (value) => {
        filters = { ...filters, [value]: trimmedQuery };
      });
      if (filters.status) {
        const CONNECTED = "Conneted";
        const NOT_CONNECTED: any = " Not connected";

        if (NOT_CONNECTED.toLowerCase().includes(filters.status)) {
          filters.status = false;
        } else if (CONNECTED.toLowerCase().includes(filters.status)) {
          filters.status = true;
        }
      }
      params = {
        _scope: "OR",
        ...params,
        ...filters,
      };
    }

    dispatch(setEVChargerPage(initialPage));

    const { data } = await axiosIns.get(apis.device, {
      params,
      signal,
    });
    return data?.data;
  },
);

export const addEVCharger = createAsyncThunk(
  "evchargers/add",
  async (
    values: Record<string, string | number | Record<string, number | string>>,
    { dispatch },
  ) => {
    const { data } = await axiosIns.post(apis.device, values);
    dispatch(fetchEVChargers({ query: "" }));

    return data;
  },
);

export const editEVCharger = createAsyncThunk(
  "evchargers/edit",
  async (
    values: Record<string, string | number | Record<string, number | string>> & {
      id: number;
    },
    { dispatch },
  ) => {
    const { data } = await axiosIns.put(`${apis.device}/${values.id}`, values);
    dispatch(fetchEVChargers({ query: "" }));

    return data;
  },
);

export const deleteEVCharger = createAsyncThunk(
  "evchargers/delete",
  async (id: number, { dispatch }) => {
    const { data } = await axiosIns.delete(`${apis.device}/${id}`);
    dispatch(fetchEVChargers({ query: "" }));

    return data;
  },
);
