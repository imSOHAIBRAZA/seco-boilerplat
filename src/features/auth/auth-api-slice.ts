import { createApi } from "@reduxjs/toolkit/query/react";
import { apis } from "../../lib";
import { fetchBaseQueryExtended } from "../../lib/fetchBaseQueryExtended";
import { User } from "../../types";

const authApi = createApi({
  // reducerPath: "api",
  baseQuery: fetchBaseQueryExtended,
  endpoints: (build) => ({
    login: build.mutation<User, { username: string; password: string }>({
      query: (credentials) => ({
        url: apis.auth,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
