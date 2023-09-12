import type { UIConfig } from "../types/ui-config";

export const initialUIConfig: UIConfig = {
  meta: {
    name: "© 2022 Secomind.ai. - All Rights Reserved",
    title: "EV Charger Manager",
    description: "We change your electric vehicle",
    favIcon: require("../assets/favicon.ico"),
    url: "https://ev-charger.secomind.ai/",
    /** seoImage >> Recommended format : .png */
    seoImage: require("../assets/nav-logo.png"),
  },
  theme: {
    primaryColor: "#0071C5",
    secondaryColor: "#636363",
    tertiaryColor: "#005A9E",
  },
  images: {
    backgroundImage: require("../assets/cover-image.jpg"),
    /** navLogo >> Recommended format : .png */
    navLogo: require("../assets/nav-logo.png"),
  },
  chartColor: ["#F19A37", "#5AA32F", "#5DBBB6", "#03A9F4", "#3F51B5"],
};

const apiEndpoint = {
  auth: "user/auth",
  advertisement: "advertisement",
  advertising: "advertising/",
  advertisingGraph: "advertising/graph/",
  refreshToken: "user/refresh-token",
  operator: "operator",
  user: "user",
  changePassword: "user/change-password",
  device: "device",
  devices: "devices",
  apps: "apps",
  alerts: "machine_event",
  alertOptions: "machine_event/alerts_options",
  location: "locations",
  deviceType: "device_type",
  campaign: "campaign/",
  saveCampaign: "campaign/bulk-save/",
  dashboardHistory: "dashboard/history/",
  dashboardDigitalSignage: "dashboard/digital_signage/",
  digitalSignageAssetInfo: "asset-info/",
  dashboardStatistics: "dashboard/statistics/",
  dashboardWorkingMinutes: "dashboard/working_minutes/",
  revenuePrices: "charging-price/",
  saveRevenuePrices: "charging-price/bulk-save/",
  revenueOccupancy: "occupancy-price/",
  saveRevenueOccupancy: "occupancy-price/bulk-save/",
  revenuePromos: "promo-price/",
  saveRevenuePromos: "promo-price/bulk-save/",
  notifications: "/alerts",
  vehicle: "/vehicle/",
  maintenanceStats: "maintenance-and-support/stats/",
  maintenanceHistory: "maintenance-and-support/",
  vehicleVendor: "/vehicle-vendor/",
  audienceAnalytics: "/audience/analytic/",
  revenueOverview: "revenue/overview/",
  revenueGraph: "revenue/graph/",
  audienceDataViews: "/audience/data-view/",
  bookingManagement: "/booking-management/",
  bookingUsers: "/booking-user/",
  
};

export const apis: typeof apiEndpoint = apiEndpoint;

export const mapErrorMessage = {
  server: "An Error occurred in the server, Please try again later",
  generic: "Something went wrong, Please try again",
};

export const API_KEYS = {
  GOOGLE_MAP: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
};
