import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { logout, setUser } from "../features/auth/auth-slice";
import { User } from "../types";
import { RootState } from "./store";
import moment from "moment";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BASE_URL,
  prepareHeaders(headers, api) {
    const state = api.getState() as RootState;
    headers.set("Authorization", state.auth.user?.token || "");

    return headers;
  },
});

export const fetchBaseQueryExtended: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const state = api.getState() as RootState;

  if (state.auth.isLoggedIn) {
    if (moment().diff(moment(state.auth?.lastTokenRefresh || new Date()), "minutes") > 15) {
      authRefreshLogic();
    }
  }

  async function authRefreshLogic() {
    const refreshResult = await baseQuery("user/refresh-token", api, extraOptions);
    if (refreshResult.data) {
      // store the new token
      api.dispatch(setUser(refreshResult.data as User));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  let result = await baseQuery(args, api, { ...extraOptions });
  if (result.error && result.error.status === 401) {
    // try to get a new token
    authRefreshLogic();
  }
  return result;
};
