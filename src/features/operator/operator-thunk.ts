import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";
import { OperatorFieldValues } from "../../views/Operators/Operators.types";
import { setOperatorPage } from "./operator-slice";
import _ from "lodash";

export const fetchOperators = createAsyncThunk(
  "operators/fetchPaginated",
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

    let order = state.operators.ordering;
    if (order.includes("parent_operator")) {
      order = order.replace("parent_operator", "parent_operator__business_name");
    }

    const { data } = await axiosIns.get(apis.operator, {
      params: {
        limit: state.operators.rowsPerPage,
        ordering: order,
        page: state.operators.pageNo + 1,
      },
    });
    return data?.data;
  },
);


export const fetchAllOperators = createAsyncThunk(
  "operators/fetchNonPaginated",
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

    const { data } = await axiosIns.get(apis.operator, {
      params: {
        limit: state.operators.rowsPerPage,
        ordering: state.operators.ordering,
      },
    });
    return data?.data;
  },
);

export const searchOperators = createAsyncThunk(
  "operators/search",
  async (
    { filter, query }: { query: string; filter: string[] },
    { getState, signal, dispatch },
  ) => {
    const state = getState() as RootState;
    const initialPage = 0;

    let params: Record<string, unknown> = {
      limit: state.operators.rowsPerPage,
      page: initialPage + 1,
      ordering: state.operators.ordering,
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

    dispatch(setOperatorPage(initialPage));

    const { data } = await axiosIns.get(apis.operator, {
      params,
      signal,
    });
    return data?.data;
  },
);

export const addOperator = createAsyncThunk(
  "operators/add",
  async (
    values: OperatorFieldValues & {
      device_type_ids?: string;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { data } = await axiosIns.post(apis.operator, values);
      dispatch(fetchOperators({ query: "" }));
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const editOperator = createAsyncThunk(
  "operators/edit",
  async (
    values: Partial<OperatorFieldValues> & {
      id: number;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const { data } = await axiosIns.put(`${apis.operator}/${values.id}`, values);
      dispatch(fetchOperators({ query: "" }));
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteOperator = createAsyncThunk(
  "operators/delete",
  async (id: number, { dispatch }) => {
    const { data } = await axiosIns.delete(`${apis.operator}/${id}`);
    dispatch(fetchOperators({ query: "" }));

    return data;
  },
);
