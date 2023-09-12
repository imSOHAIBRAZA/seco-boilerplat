import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import moment from "moment";
import authSlice from "../features/auth/auth-slice";
import { User } from "../types";
import { apis } from "./config";
import { routes } from "./routeConfig";
import { store } from "./store";

const axiosIns: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosIns.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const auth = store.getState().auth;
    if (auth.isLoggedIn) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${auth?.user?.token}`;
      }
      if (moment().diff(moment(auth?.lastTokenRefresh || new Date()), "minutes") > 15) {
        authRefreshLogic();
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosIns.interceptors.response.use(
  (response) => {
    const dispatch = store.dispatch;

    if (response.config.url === apis.auth && response.status === 200) {
      dispatch(authSlice.actions.resetLastTokenRefresh());
    }
    return response;
  },
  function (error) {
    const dispatch = store.dispatch;

    if (error.response && error.response.status === 401) {
      if (error.response.config.url === apis.auth) {
        dispatch(authSlice.actions.logout());
      } else {
        authRefreshLogic()
      }
    }
    
    return Promise.reject(error);
  },
);

const authRefreshLogic = () => {
  const auth = store.getState().auth;
  const dispatch = store.dispatch;
  axios
    .post(`${process.env.REACT_APP_API_BASE_URL}/${apis.refreshToken}`, {
      token: auth.user?.token,
    })
    .then((tokenRefreshResponse) => {
      const user = {...auth.user} as User;
      dispatch(authSlice.actions.resetLastTokenRefresh());

      user.token = tokenRefreshResponse.data.token;
      dispatch(authSlice.actions.setUser(user));
    })
    .catch(() => {
      dispatch(authSlice.actions.logout());
      window.location.href = `${routes.auth.login}?next=${window.location.pathname}`;
    });
};

export { axiosIns };
