import * as React from "react";
import { Box, Chip } from "@mui/material";
import { HeadCell } from "../../components/Table/Table.types";
import * as rootStyles from "../../lib/rootStyles";
import { RevenueCommonT } from "../../types/revenue-and-price";

export const ChampagnList = [
  {
    name: "Big Hamburger 1",
    reserved: "all",
    emotions: "Happy, xyz...",
    age: "18-25 Years",
    brand: "Type your brand name",
    date: "07-27-2022",
    kwh: "0.125 $",
  },
  {
    name: "Big Hamburger 2",
    reserved: "all",
    emotions: "Happy, xyz...",
    age: "18-25 Years",
    brand: "Type your brand name",
    date: "07-27-2022",
    kwh: "0.125 $",
  },
  {
    name: "Big Hamburger 3",
    reserved: "all",
    emotions: "Happy, xyz...",
    age: "18-25 Years",
    brand: "Type your brand name",
    date: "07-27-2022",
    kwh: "0.125 $",
  },
];

export const HeadRowData: HeadCell[] = [
  {
    id: "adv",
    label: "Adv",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "total_audience",
    label: "Total Audience",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "total_views",
    label: "Total Views",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "viewing_rate",
    label: "Viewing rate (%)",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "average_duration",
    label: "Average Duration (sec)",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
];

export const AdsViewAnalysis = [
  {
    adv: "Big Hamburger",
    total_audience: 76,
    total_views: 61,
    viewing_rate: 31.7,
    average_duration: 16.5,
  },
  {
    adv: "Easy Trip",
    total_audience: 76,
    total_views: 61,
    viewing_rate: 31.7,
    average_duration: 16.5,
  },
];

export const AssetHeadRowData: HeadCell[] = [
  {
    id: "name",
    label: "Name",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "brand",
    label: "Brand",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "views",
    label: "Views",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "age",
    label: "Age",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "type",
    label: "Type",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "duration",
    label: "Duration",
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
    render: (_, value: string) => (
      <Chip color={value !== "Working" ? "error" : "success"} label={value || "Working"} />
    ),
  },
];

export const AssetInformation = [
  {
    name: "Big Hamburger",
    brand: "Fast fooed",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Working",
  },
  {
    name: "Big Hamburger",
    brand: "Fast fooed",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Ended",
  },
  {
    name: "Big Hamburger",
    brand: "Fast fooed",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Working",
  },
  {
    name: "Big Hamburger",
    brand: "Fast fooed",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Ended",
  },
  {
    name: "Big Hamburger",
    brand: "Fast fooed",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Working",
  },
  {
    name: "Big Hamburger",
    brand: "Fast fooed",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Ended",
  },
  {
    name: "Big Hamburger",
    brand: "Fast fooed",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Working",
  },
  {
    name: "Big Hamburger",
    brand: "Fast fooed",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Ended",
  },
];

export const AudienceHeadRowData: HeadCell[] = [
  {
    id: "total_precence",
    label: "Total Precence",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "average",
    label: "Average (min)",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "advertising",
    label: "Advertising",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "performance",
    label: "Performance (%)",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
];
export const AudienceData = [
  {
    total_precence: 158,
    average: 3.6,
    advertising: 12,
    performance: 63,
  },
];

export const MaintenanceList = [
  {
    label: "Price 1",
    totalValue: 32,
    tag: "Times price 1 used",
  },
  {
    label: "Pricce 2",
    totalValue: 75,
    tag: "Times price 2 used",
  },
];

export const HistoryHeadRowData: HeadCell[] = [
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
    render: (_, value) => value?.vehicle_model,
  },
  {
    id: "driver",
    label: "ID Driver",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (_, value) => value?.id,
  },
  {
    id: "payment_method",
    label: "Payment",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "cost",
    label: "Cost",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "kwh",
    label: "kWh",
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
    render: (_, value: string) => (
      <Chip
        color={value.toLowerCase() === "ended" ? "error" : "success"}
        label={
          value && (
            <>
              <Box
                sx={
                  value.toLowerCase() === "ended"
                    ? rootStyles.errorIndicator
                    : rootStyles.successIndicator
                }
              />
              {value}
            </>
          )
        }
      />
    ),
  },
];

export const HistoryData = [
  {
    id: "11213123111",
    vehicle: "Opel-e-corsa 940kw",
    id_driver: "1231231222",
    payment: "nfc",
    cost: "$31.9",
    kwh: "75",
    status: "Working",
  },
  {
    id: "11213123111",
    vehicle: "Opel-e-corsa 940kw",
    id_driver: "1231231222",
    payment: "nfc",
    cost: "$31.9",
    kwh: "75",
    status: "Ended",
  },
  {
    id: "11213123111",
    vehicle: "Opel-e-corsa 940kw",
    id_driver: "1231231222",
    payment: "nfc",
    cost: "$31.9",
    kwh: "75",
    status: "Ended",
  },
  {
    id: "11213123111",
    vehicle: "Opel-e-corsa 940kw",
    id_driver: "1231231222",
    payment: "nfc",
    cost: "$31.9",
    kwh: "75",
    status: "Ended",
  },
  {
    id: "11213123111",
    vehicle: "Opel-e-corsa 940kw",
    id_driver: "1231231222",
    payment: "nfc",
    cost: "$31.9",
    kwh: "75",
    status: "Ended",
  },
  {
    id: "11213123111",
    vehicle: "Opel-e-corsa 940kw",
    id_driver: "1231231222",
    payment: "nfc",
    cost: "$31.9",
    kwh: "75",
    status: "Ended",
  },
];

const today = new Date();

export const emptyRevenuePromo: RevenueCommonT = {
  name: "",
  start_time: today.toString(),
  end_time: today.toString(),
  cost: "",
  reserved: "ALL",
  is_default: false,
};

export const emptyChargingPrice: RevenueCommonT = {
  name: "",
  start_time: today.toString(),
  end_time: today.toString(),
  cost: "",
  price: "",
  is_default: false,
};

export const emptyRevenueOccupancy: RevenueCommonT = {
  name: "",
  start_time: today.toString(),
  end_time: today.toString(),
  price: "",
  is_default: false,
};

export const reservedOptions = [
  {
    label: "ALL",
    value: "ALL",
  },
  {
    label: "USERS",
    value: "USERS",
  },
];
