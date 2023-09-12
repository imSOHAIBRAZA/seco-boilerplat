import { createAsyncThunk } from "@reduxjs/toolkit";
import { apis, axiosIns } from "../../lib";

export const fetchNotifications = createAsyncThunk("fetch/notifications", async () => {
  const { data } = await axiosIns.get(apis.notifications, {
    params: {
      limit: 5,
    },
  });
  return data;
});
export const fetchNextNotifications = createAsyncThunk(
  "loadMore/notifications",
  async (page: number) => {
    const { data } = await axiosIns.get(apis.notifications, {
      params: {
        limit: 5,
        page,
      },
    });
    return { ...data, page };
  },
);
export const patchNotification = createAsyncThunk("patch/notifications", async (id: number) => {
  const { data } = await axiosIns.patch(`${apis.notifications}/${id}`, {
    is_read: true,
  });
  return data;
});
