import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";
import { OperatorFieldValues } from "../../views/Operators/Operators.types";
import { setAdvertisingPage } from "./advertising-slice";
import _ from "lodash";

export const fetchAdvertise = createAsyncThunk(
  "advertising/fetchPaginated",
  async (_: unknown, { getState }) => {
    const state = getState() as RootState;

    const { data } = await axiosIns.get(apis.advertisement, {
      params: {
        limit: state.advertising.rowsPerPage,
        page: state.advertising.pageNo + 1,
        ordering: state.advertising.ordering,

      },
    });
    return data;
  },
);

export const fetchAllAdvertise = createAsyncThunk(
  "advertising/fetchNonPaginated",
  async () => {
    const { data } = await axiosIns.get(`${apis.advertisement}?all`, {
      params: {},
    });
    return data;
  },
);

export const searchAdvertisings = createAsyncThunk(
  "advertising/search",
  async (
    { query, filter }: { query: string; filter: string[] },
    { getState, signal, dispatch },
  ) => {
    const state = getState() as RootState;
    const initialPage = 0;

    const trimmedQuery = query.trim();
    let filters = {};

    _.map(filter, (value) => {
      filters = { ...filters, [value]: trimmedQuery };
    });

    dispatch(setAdvertisingPage(initialPage));

    const { data } = await axiosIns.get(apis.advertisement, {
      params: {
        limit: state.advertising.rowsPerPage,
        page: initialPage + 1,
        _scope: "OR",
        ...filters,
      },
      signal,
    });
    return data?.data;
  },
);

export const addAdvertise = createAsyncThunk(
  "advertising/add",
  async (values: Record<string, string | number | undefined>, { dispatch }) => {
    const { data } = await axiosIns.post(apis.advertisement, values);
    dispatch(fetchAdvertise(null));

    return data;
  },
);

export const editAdvertise = createAsyncThunk(
  "advertising/edit",
  async (
    values: Partial<OperatorFieldValues> & {
      id: number;
    },
    { dispatch },
  ) => {
    const { data } = await axiosIns.put(`${apis.advertising}/${values.id}`, values);
    dispatch(fetchAdvertise(null));

    return data;
  },
);

export const deleteAdvertise = createAsyncThunk(
  "advertising/delete",
  async (id: number, { dispatch }) => {
    const { data } = await axiosIns.delete(`${apis.advertising}/${id}`);
    dispatch(fetchAdvertise(null));

    return data;
  },
);
