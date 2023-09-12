/* eslint-disable camelcase */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { User } from "../../types";

interface AuthState {
  user: User | null;
  lastTokenRefresh: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  lastTokenRefresh: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    updateUserName(state, action: PayloadAction<{ first_name: string; last_name: string }>) {
      if (state.user) {
        const { first_name, last_name } = action.payload;
        state.user = { ...state.user, first_name, last_name };
      }
    },
    removeUser(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
    resetLastTokenRefresh(state) {
      state.lastTokenRefresh = moment().toISOString();
    },
    logout(state) {
      state.user = null;
      state.lastTokenRefresh = null;
      state.isLoggedIn = false;
    },
  },
});

export const { removeUser, setUser, updateUserName, resetLastTokenRefresh, logout } =
  authSlice.actions;

export default authSlice;
