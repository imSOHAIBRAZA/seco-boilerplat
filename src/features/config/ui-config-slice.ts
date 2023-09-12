import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UIConfig } from "../../types";
import { initialUIConfig } from "../../lib";

interface AppConfig {
  ui: UIConfig;
}

const initialState: AppConfig = {
  ui: initialUIConfig,
};

const uiConfig = createSlice({
  name: "ui-config-slice",
  initialState,
  reducers: {
    patchConfig(state, action: PayloadAction<UIConfig>) {
      state.ui = action.payload;
    },
  },
});

export const { patchConfig } = uiConfig.actions;

export default uiConfig;
