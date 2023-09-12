import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Notification } from "../../types";
import {
  fetchNotifications,
  fetchNextNotifications,
  patchNotification,
} from "./notification-thunk";

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  limit: number;
  page: number;
  hasNextPage: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  isLoading: false,
  limit: 5,
  page: 2,
  hasNextPage: true,
};

const notificationSlice = createSlice({
  name: "notification-slice",
  initialState,
  reducers: {
    setNotifications(state, action: PayloadAction<Notification[] | []>) {
      state.notifications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload.results;
        state.hasNextPage = !!action.payload.next;
        state.isLoading = false;
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchNextNotifications.fulfilled, (state, action) => {
        state.notifications = [...state.notifications, ...action.payload.results];
        state.hasNextPage = !!action.payload.next;
        state.page = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchNextNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNextNotifications.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(patchNotification.fulfilled, (state, action) => {
        state.notifications.forEach((notification) => {
          if (action.payload.id === notification.id) {
            notification.is_read = action.payload.is_read;
          }
        });
      });
  },
});

export const { setNotifications } = notificationSlice.actions;

export default notificationSlice;
