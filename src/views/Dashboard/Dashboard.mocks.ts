import { HeadCell } from "../../components/Table/Table.types";
import {
  RevenueIcon,
  ElectricityCostIcon,
  EnergySupplyIcon,
  AverageDuractionIcon,
  DeviceStatusIcon,
  ConnectionIcon,
} from "../../assets/icons";
import Image from "../../assets/Rectangle.png";
import Image1 from "../../assets/Rectangle1.png";
import Image2 from "../../assets/Rectangle2.png";
import Image3 from "../../assets/Rectangle3.png";

export const featuredStatsLabels = [
  {
    icon: RevenueIcon,
    label: "This week",
    tag: "Total revenue",
    totalValue: "0",
    valueSuffix: "$",
    id: "total_revenue",
  },
  {
    icon: ElectricityCostIcon,
    label: "This week",
    tag: "Electricity Cost",
    totalValue: "0",
    valueSuffix: "$",
    id: "electricity_costs",
  },
  {
    icon: EnergySupplyIcon,
    label: "This week",
    tag: "Energy Supply",
    totalValue: "0",
    valuePrefix: "kWh",
    id: "energy_supply",
  },
  {
    icon: AverageDuractionIcon,
    label: "This week",
    tag: "Average Duration",
    totalValue: "0",
    valuePrefix: "min",
    id: "average_duration",
  },
  {
    icon: DeviceStatusIcon,
    label: "Real time",
    totalValue: "9/10",
    id: "real_time",
  },
  {
    icon: ConnectionIcon,
    label: "Real time",
    tag: "Devices with warning",
    totalValue: "0",
    id: "device_with_warning",
  },
];

export const chartLabels = [
  { label: "Available", series: 5661, id: "available" },
  { label: "Occupied", series: 3569, id: "occupied" },
  { label: "Booked", series: 123, id: "booked" },
  { label: "Locked", series: 36, id: "locked" },
];

export const DashboadMock2 = [
  {
    label: "This week",
    totalValue: 0,
    tag: "Total revenue",

    id: "total_revenue",
  },
  {
    label: "This week",
    totalValue: 0,
    tag: "Electricity cost",
    id: "electricity_costs",
  },
];

export const DashboadMock3 = [
  {
    label: "This week",
    totalValue: 4830,
    tag: "Total revenue",
    id: "total_revenue",
  },
];

export const DashboadMockEnvData = [
  {
    count: 183,
    heading: "Total sessions",
    subHeading: "This week",
  },
  {
    count: 34,
    heading: "CO2 reduction",
    subHeading: "Kilogram",
  },
  {
    count: 295,
    heading: "Fuel replaced",
    subHeading: "Liters",
  },
];

export const DashboadMockUserData = [
  {
    count: 154,
    heading: "Total users",
    subHeading: "This week",
  },
  {
    count: 97,
    heading: "New users",
    subHeading: "This week",
  },
  {
    count: 35,
    heading: "New account",
    subHeading: "This weel",
  },
];

export const DashboadMockRealTimeData = [
  {
    label: "Real Time",
    totalValue: 33.9,
    tag: "Temperature",
  },
];

export const DashboadMockPredictiveData = [
  {
    title: "Predictive Maintenance",
    heading: "No warning",
    description:
      "EV charging station is in very good condition. Predictive maintenance will alert you in time of any anomalies so you can schedule a technician's intervention. ",
  },
];

export const DashboadMockDigitalCard = [
  {
    label: "This week",
    totalValue: 34,
    tag: "Total Advertisments",
    icon: RevenueIcon,
  },
  {
    label: "This week",
    totalValue: 2345,
    tag: "Total Interactions",
    icon: ElectricityCostIcon,
  },
  {
    label: "This week",
    totalValue: 12,
    tag: "Active Promo",
    icon: RevenueIcon,
  },
];

export const DashboadMockMostViewCard = [
  {
    label: "40 times this week",
    year: "24 - 54 years, Man",
    image: Image,
  },
  {
    label: "37 times this week",
    year: "22 - 49 years, Man",
    image: Image1,
  },
  {
    label: "22 times this week",
    year: "25 - 36 years, Women",
    image: Image2,
  },
  {
    label: "15 times this week",
    year: "17 - 28 years, Man",
    image: Image3,
  },
];

export const HeadRowData: HeadCell[] = [
  {
    id: "id",
    label: "ID Charge",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "vehicle",
    label: "Vehicle",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (_: unknown, vehicle) => `${vehicle?.vehicle_number} - ${vehicle?.vehicle_model}`,
  },
  {
    id: "driver",
    label: "ID Driver",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (_: unknown, driver) => `${driver?.id_number} - ${driver?.name}`,
  },
  {
    id: "start_time",
    label: "Start Time",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "end_time",
    label: "End Time",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "location",
    label: "Location",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "charging_time",
    label: "Recharge Time",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "occupancy",
    label: "Occupancy",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
];
