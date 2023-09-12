import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns, RootState } from "../../lib";
import { setBookingPage } from "./booking-management-slice";

import _ from "lodash";

export const fetchBookings = createAsyncThunk(
  "booking-management/fetchPaginated",
  async ({ query, filter }: { query?: string; filter?: string[] }, { getState }) => {
    const state = getState() as RootState;

    if (!query) {
      query = state.bookingManagementSlice.query;
    }
    const trimmedQuery = query?.trim();
    let filters: Record<string, string> = {};

    if (trimmedQuery) {
      _.map(filter, (value) => {
        filters = { ...filters, [value]: trimmedQuery };
      });

      filters._scope = "OR";
    }

    let order = state.bookingManagementSlice.ordering;

    if (order.includes("serial_number")) {
      order = order.replace("serial_number", "device__serial_number");
    } else if (order.includes("users")) {
      order = order.replace("users", "user__first_name");
    } else if (order.includes("vm_name")) {
      order = order.replace("vm_name", "device__vm_name");
    } else if (order.includes("booking_date")) {
      order = order.replace("booking_date", "created_at");
    } else if (order.includes("due_booking_date")) {
      order = order.replace("due_booking_date", "schedule_at");
    } else if (order.includes("booking_cancelation")) {
      order = order.replace("booking_cancelation", "cancel_at");
    } else if (order.includes("location")) {
      order = order.replace("location", "device__address__address");
    }

    const { data } = await axiosIns.get(`${apis.bookingManagement}${query}`, {
      params: {
        limit: state.bookingManagementSlice.rowsPerPage,
        page: state.bookingManagementSlice.pageNo + 1,
        ordering: order,
      },
    });

    return data;
  },
);

export const fetchBookingsAll = createAsyncThunk(
  "booking-management/fetchNonPaginated",
  async ({ query, filter }: { query?: string; filter?: string[] }, { getState }) => {
    const state = getState() as RootState;

    if (!query) {
      query = state.bookingManagementSlice.query;
    }
    const trimmedQuery = query?.trim();
    let filters: Record<string, string> = {};

    if (trimmedQuery) {
      _.map(filter, (value) => {
        filters = { ...filters, [value]: trimmedQuery };
      });

      filters._scope = "OR";
    }

    if (query) {
      query += "&all";
    } else {
      query = "?all";
    }

    const { data } = await axiosIns.get(`${apis.bookingManagement}${query}`, {
      params: {
        ordering: state.bookingManagementSlice.ordering,
      },
    });

    return data;
  },
);

export const fetchBookingUsers = createAsyncThunk(
  "booking-users/fetchPaginated",
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

    const { data } = await axiosIns.get(apis.bookingUsers, {
      params: {
        limit: state.bookingManagementSlice.rowsPerPage,
        page: state.bookingManagementSlice.pageNo + 1,
        ordering: state.bookingManagementSlice.ordering,
      },
    });

    return data;
  },
);

export const searchBookingManagement = createAsyncThunk(
  "booking/search",
  async (
    { query, filter }: { query: string; filter: string[] },
    { getState, signal, dispatch },
  ) => {
    const state = getState() as RootState;
    const initialPage = 0;
    console.log({ query, filter });
    let params: Record<string, unknown> = {
      limit: state.bookingManagementSlice.rowsPerPage,
      page: initialPage + 1,
      ordering: state.bookingManagementSlice.ordering,
    };

    const trimmedQuery = query.trim();

    if (trimmedQuery !== "") {
      params = {
        _scope: "OR",
        ...params,
        // ...filters,
      };
    }

    dispatch(setBookingPage(initialPage));

    const { data } = await axiosIns.get(`${apis.bookingManagement}?search=${query}`, {
      params,
      signal,
    });
    return data;
  },
);

export const patchBooking = createAsyncThunk(
  "locations/edit",
  async (values: any, { dispatch }) => {
    const { data } = await axiosIns.put(`${apis.bookingManagement}${values[0]?.id}/`, {
      booking_status: "cancelled",
    });
    dispatch(fetchBookings({ query: "" }));

    return data;
  },
);
