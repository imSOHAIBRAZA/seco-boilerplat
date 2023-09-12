import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";
import { UserValues } from "../../views/Users/Users.types";
import { updateUserName } from "../auth/auth-slice";
import { setUserPage } from "./user-slice";
import _ from "lodash";

export const fetchUsers = createAsyncThunk(
  "users/fetchPaginated",
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
    let order = state.users.ordering;
    if (order.includes("company")) {
      order = order.replace("company", "company__business_name");
    } else if (order.includes("created_by_user")) {
      order = order.replace("created_by_user", "created_by__username");
    }
    const { data } = await axiosIns.get(apis.user, {
      params: {
        limit: state.users.rowsPerPage,
        page: state.users.pageNo + 1,
        ordering: order,
        ...filters,
      },
    });
    return data?.data;
  },
);

export const fetchAllUsers = createAsyncThunk(
  "users/fetchNonPaginated",
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

    const { data } = await axiosIns.get(`${apis.user}?all`, {
      params: {
        ordering: state.users.ordering,
      },
    });
    return data?.data;
  },
);

export const searchUsers = createAsyncThunk(
  "users/search",
  async (
    { query, filter }: { query: string; filter: string[] },
    { getState, signal, dispatch },
  ) => {
    const state = getState() as RootState;
    const initialPage = 0;

    let params: Record<string, unknown> = {
      limit: state.users.rowsPerPage,
      page: initialPage + 1,
      ordering: state.users.ordering,
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

    dispatch(setUserPage(initialPage));

    const { data } = await axiosIns.get(apis.user, {
      params,
      signal,
    });
    return data?.data;
  },
);

export const addUser = createAsyncThunk("users/add", async (values: UserValues, { dispatch }) => {
  const { data } = await axiosIns.post(apis.user, values);
  dispatch(fetchUsers({ query: "" }));

  return data;
});

export const editUser = createAsyncThunk(
  "users/edit",
  async (
    values: Partial<UserValues> & {
      id: number;
    },
    { dispatch },
  ) => {
    const { data } = await axiosIns.put(`${apis.user}/${values.id}`, values);
    dispatch(fetchUsers({ query: "" }));
    return data;
  },
);
export const patchUser = createAsyncThunk(
  "users/edit",
  async (
    values: Partial<UserValues> & {
      id: number;
    },
    { dispatch },
  ) => {
    const { data } = await axiosIns.patch(`${apis.user}/${values.id}`, values);
    dispatch(updateUserName(data.data));
    return data;
  },
);
export const changePassowrd = createAsyncThunk(
  "users/changePassword",
  async (
    values: Partial<UserValues> & {
      confirm_password: string;
      new_password: string;
      old_password: string;
    },
    { dispatch },
  ) => {
    const { data } = await axiosIns.post(`${apis.changePassword}`, values);
    dispatch(fetchUsers({ query: "" }));

    return data;
  },
);

export const deleteUser = createAsyncThunk("users/delete", async (id: number, { dispatch }) => {
  const { data } = await axiosIns.delete(`${apis.user}/${id}`);
  dispatch(fetchUsers({ query: "" }));

  return data;
});
