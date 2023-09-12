import axios from "axios";
import * as React from "react";
import { apis, axiosIns, useAppDispatch } from "../../lib";
import authSlice from "./auth-slice";

export const useLogin = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useAppDispatch();

  const login = async (credentials: { username: string; password: string }) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const { data } = await axiosIns.post(apis.auth, credentials);
      dispatch(authSlice.actions.setUser(data));
      setIsSuccess(true);
    } catch (err: unknown) {
      setIsError(true);
      if (axios.isAxiosError(err)) {
        if (err.response?.status) {
          if (err.response?.status >= 400 && err.response?.status <= 500) {
            /** do something */
          } else if (err.response?.status >= 500) {
            /** do something */
          }
        } else {
          /** do something */
        }
      } else if (err instanceof Error) {
        /** do something */
      } else {
        /** do something */
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isSuccess, isError, isLoading };
};
