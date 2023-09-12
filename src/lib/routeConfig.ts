import {
  DashboardIcon,
  AdvertisingIcon,
  SwitchIcon,
  AppsIcon,
  OperatorIcon,
  UsersIcon,
  EvChargerIcon,
  SupportIcon,
  DigitalSignatureIcon,
  RevenueAndPriceIcon,
  CounterAndTrackingIcon,
  CarAndPlateIcon,
} from "../assets/icons";
import type { NavItem } from "../types";
import LocationIcon from "../assets/icons/LocationIcon";

import * as views from "../views";

const routeConstants = {
    /** Auth screen routes */
    authRoot: "/auth",
    auth: {
      login: "/auth/login",
      signup: "/auth/signup",
    },
  
    /** Dashboard routes */
    dashboardRoot: "/",
    dashboard: {
      index: "/dashboard",
    },
    users: {
      index: "/users",
    },
    apps: {
      index: "/apps-store",
    },
    operators: {
      index: "/operators",
    },
    maintenanceAndSupport: {
      index: "/maintenance-support",
    },
    digitalSignature: {
      index: "/signature",
      campaign: "/signature/campaign",
      advertise: "/signature/advertise",
    },
    revenueAndPrice: {
      index: "/revenue-and-price",
      prices: "/revenue-and-price/prices",
      promos: "/revenue-and-price/promos",
    },
    counterAndTracking: {
      index: "/counter-and-tracking",
    },
    carAndPlateRecognition: {
      index: "/car-plate-recognition",
    },
    advertisement: {
      index: "/advertisement",
    },
    evCharger: {
      index: "/ev-charger",
    },
    alerts: {
      index: "/alerts",
    },
    location: {
      index: "/locations",
    },
    bookingManagement: {
      index: "/booking-management",
      history: "/booking-management/history",
    },
    
  };
  
  export const routes: typeof routeConstants = routeConstants;

export const navConfig: NavItem[] = [
    {
      key: "dashboard_dashboard",
      label: "Dashboard",
      route: routes.dashboard.index,
      icon: DashboardIcon,
      static: true,
      hasAccess: [],
      tabs: [
        {
          route: routes.dashboard.index,
          label: "Dashboard",
          element: views.Dashboard,
        },
      ],
    },
    {
      key: "dashboard_ev_charger",
      label: "EV Charger",
      route: routes.evCharger.index,
      icon: EvChargerIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          route: routes.evCharger.index,
          label: "EV Charger",
          element: views.EVCharger,
          description:
            "Manage your EV Chargers devices here. You can add, edit, remove or transfer your EV chargers to suboperators from your account.",
        },
      ],
    },
    {
      key: "dashboard_maintenance_and_support",
      label: "Maintenance and Support",
      route: routes.maintenanceAndSupport.index,
      icon: SupportIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          route: routes.maintenanceAndSupport.index,
          label: "Maintenance and Support",
          element: views.MaintenanceAndSupport,
          description:
            "View details about the current status of the device. Also, review suggestions for predictive maintance and support required for your EV charger devices.",
        },
      ],
    },
    {
      key: "dashboard_advertising",
      label: "Advertising",
      route: routes.advertisement.index,
      icon: AdvertisingIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          route: routes.advertisement.index,
          label: "Advertising",
          element: views.Advertising,
          description:
            "All Advertising that are in ads automatically show up here. You can edit these ad to and filter that ad.",
        },
      ],
    },
    {
      key: "dashboard_alerts",
      label: "Alerts",
      route: routes.alerts.index,
      icon: SwitchIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          route: routes.alerts.index,
          label: "Alerts",
          element: views.Alert,
          description:
            "Check the detailed alerts and logs about all EV Chargers and user activities.",
        },
      ],
    },
    {
      key: "dashboard_digital_signage",
      label: "Digital Signage",
      route: routes.digitalSignature.index,
      icon: DigitalSignatureIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          route: routes.digitalSignature.index,
          label: "Audience",
          element: views.DigitalSignage,
        },
        {
          route: routes.digitalSignature.advertise,
          label: "Advertising",
          element: views.DigitalSignageAdvertise,
        },
        {
          route: routes.digitalSignature.campaign,
          label: "Campaign",
          element: views.DigitalSignageCampaign,
          description:
            "Manage the campaigns and Ads that will be playing on your EV Charger display screen.",
        },
      ],
    },
    {
      key: "dashboard_revenue_and_price",
      label: "Revenue & Price",
      route: routes.revenueAndPrice.index,
      icon: RevenueAndPriceIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          route: routes.revenueAndPrice.index,
          label: "Overview",
          element: views.Revenue,
        },
        {
          route: routes.revenueAndPrice.prices,
          label: "Prices",
          element: views.RevenuePrices,
          description: "Manage the Prices that will be applied onto your EV charger.",
        },
        {
          route: routes.revenueAndPrice.promos,
          label: "Promos",
          element: views.RevenuePromos,
          description: "Manage the Promos that will be applied onto your EV charger.",
        },
      ],
    },
    {
      key: "dashboard_counter_and_tracking",
      label: "People Counter & Tracking",
      route: routes.counterAndTracking.index,
      icon: CounterAndTrackingIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          route: routes.counterAndTracking.index,
          label: "People Counter & Tracking",
          element: views.Alert,
        },
      ],
    },
    {
      key: "dashboard_car_and_plate_recognition",
      label: "Car and Plate Recognition",
      route: routes.carAndPlateRecognition.index,
      icon: CarAndPlateIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          route: routes.carAndPlateRecognition.index,
          label: "Car and Plate Recognition",
          element: views.Recognition,
          description:
            "Car plate Recognition: Check the history of cars that were parked in front of the EV Charger station.",
        },
      ],
    },
    {
      key: "booking_management",
      label: "Booking Management",
      route: routes.bookingManagement.index,
      icon: CarAndPlateIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          route: routes.bookingManagement.index,
          label: "Booking Management",
          element: views.BookingManagement,
          description:
            "Booking Management: Manage the booking of ev charger machines.",
        },
        {
          route: routes.bookingManagement.history,
          label: "Booking History",
          element: views.BookingManagementHistory,
          description:
            "Booking Management: Manage the booking of ev charger machines.",
        },
      ],
    },
    {
      key: "dashboard_location",
      label: "Location",
      route: routes.location.index,
      icon: LocationIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          route: routes.location.index,
          label: "Location",
          element: views.Location,
          description:
            "All Locations are listed here. You can create a new location where an EV Charger will be installed.",
        },
      ],
    },
    {
      key: "dashboard_operators",
      label: "Operators",
      route: routes.operators.index,
      icon: OperatorIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          label: "Operators",
          route: routes.operators.index,
          element: views.Operators,
          description:
            "Add your Operators here. After creating an Operator, create users (Operator Admin) for that Operator and then assign EV Chargers to their account.",
        },
      ],
    },
    {
      key: "dashboard_users",
      label: "Users",
      route: routes.users.index,
      icon: UsersIcon,
      static: false,
      hasAccess: [],
      tabs: [
        {
          label: "Users",
          route: routes.users.index,
          element: views.Users,
          description:
            "You can add more users based on the user's role. Operator Admin is the administrator of the operator account and has access to all the content and features.",
        },
      ],
    },
    {
      key: "dashboard_apps",
      label: "Apps",
      route: routes.apps.index,
      icon: AppsIcon,
      static: true,
      hasAccess: ["SA", "OP", "VU"],
      tabs: [
        {
          label: "Apps",
          route: routes.apps.index,
          element: views.AppStore,
          description: "",
        },
      ],
    },
  ];