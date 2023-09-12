import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns } from "../../lib";
import { generateFormData } from "../../lib/generateFormData";
import { AppFieldValues } from "../../views/AppStore/AppStore.types";
import { setAppStorePage } from "./appstore-slice";
import _ from "lodash";

export const fetchApps = createAsyncThunk("apps/fetchPaginated", async () => {
  const { data } = await axiosIns.get(apis.apps, {
    params: {
      all: true,
    },
  });
  return data?.data;
});

export const fetchInitialApps = createAsyncThunk("apps/fetchInitialApp", async () => {
  const { data } = await axiosIns.get(apis.apps, {
    params: {
      all: true,
    },
  });
  return data?.data;
});

export const searchApps = createAsyncThunk(
  "apps/search",
  async ({ filter, query }: { query: string; filter: string[] }, { signal, dispatch }) => {
    const initialPage = 0;

    const trimmedQuery = query.trim();

    let filters = {};

    _.map(filter, (value) => {
      filters = { ...filters, [value]: trimmedQuery };
    });


    dispatch(setAppStorePage(initialPage));

    let params = {}
    if (query) {
      params = {
        _scope: "OR",
        ...filters,
      }
    } else {
      params = {
        all: true,
      }
    }
    const { data } = await axiosIns.get(apis.apps, {
      params,
      signal,
    });
    return data?.data;
  },
);

export const addApp = createAsyncThunk("apps/add", async (values: AppFieldValues, { dispatch }) => {
  const formValues = generateFormData(values);

  const { data } = await axiosIns.post(apis.apps, formValues);
  dispatch(fetchApps());

  return data;
});

export const insatllApp = createAsyncThunk("apps/install", async (id: number, { dispatch }) => {
  const { data } = await axiosIns.post(`${apis.apps}/${id}/install_app`);
  dispatch(fetchApps());

  return data;
});


export const editApp = createAsyncThunk(
  "apps/edit",
  async (
    values: Partial<AppFieldValues> & {
      id: number;
    },
    { dispatch },
  ) => {
    const formValues = generateFormData(values, {
      removeEmpty: true,
    });

    const { data } = await axiosIns.put(`${apis.apps}/${values.id}`, formValues);
    dispatch(fetchApps());

    return data;
  },
);

export const deleteApp = createAsyncThunk("apps/delete", async (id: number, { dispatch }) => {
  const { data } = await axiosIns.delete(`${apis.apps}/${id}`);
  dispatch(fetchApps());

  return data;
});
