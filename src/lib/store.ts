import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authSlice from "../features/auth/auth-slice";
import uiConfig from "../features/config/ui-config-slice";
import operatorSlice from "../features/operator/operator-slice";
import userSlice from "../features/user/user-slice";
import appstoreSlice from "../features/appstore/appstore-slice";
import evchargerSlice from "../features/ev-charger/ev-charger-slice";
import dropdownSlice from "../features/dropdown-data/dropdown-slice";
import locationSlice from "../features/location/location-slice";
import alertSlice from "../features/alert/alert-slice";
import digitalSignageSlice from "../features/digital-signage/digital-signage-slice";
import maintenanceSupportSlice from "../features/maintenance-support/maintenance-support-slice";
import recognitionSlice from "../features/recognition/recognition-slice";
import bookingManagementSlice from "../features/booking-management/booking-management-slice";
import advertisingSlice from "../features/advertising/advertising-slice";
import dashboardSlice from "../features/dashboard/dashboard-slice";
import revenueAndPriceSlice from "../features/revenue-and-price/revenue-and-price-slice";
import notificationSlice from "../features/notification/notification-slice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  config: uiConfig.reducer,
  operators: operatorSlice.reducer,
  users: userSlice.reducer,
  apps: appstoreSlice.reducer,
  dropdown: dropdownSlice.reducer,
  evchargers: evchargerSlice.reducer,
  locations: locationSlice.reducer,
  alerts: alertSlice.reducer,
  digitalsignage: digitalSignageSlice.reducer,
  maintenanceSupport: maintenanceSupportSlice.reducer,
  recognitionSlice: recognitionSlice.reducer,
  bookingManagementSlice: bookingManagementSlice.reducer,
  advertising: advertisingSlice.reducer,
  dashboard: dashboardSlice.reducer,
  revenueAndPrice: revenueAndPriceSlice.reducer,
  notification: notificationSlice.reducer,
  vehicles: recognitionSlice.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth", "dropdown", "apps"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const dispatch: AppDispatch = store.dispatch;

/** Typed useSelector and useDispatch hooks */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
