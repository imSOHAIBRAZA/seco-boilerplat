import * as React from "react";
import { Chip, Box, Button } from "@mui/material";
import { HeadCell } from "../../components/Table/Table.types";
import { ApexOptions } from "apexcharts";
import * as rootStyles from "../../lib/rootStyles";
import { dispatch } from "../../lib";
import { setStationSelected } from "../../features/digital-signage/digital-signage-slice";
import type { EVCharger } from "../../types";
import { Campaign } from "../../types/campaign";

export const EvChargerHeadRowData: HeadCell[] = [
  {
    id: "serial_number",
    label: "Serial Number",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "vm_name",
    label: "Name",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "company",
    label: "Operator",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (_: unknown, value) => value?.business_name,
  },
  {
    id: "status",
    label: "Status",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (_: unknown, connected: boolean) => (
      <Chip
        color={connected ? "success" : "error"}
        label={
          <>
            <Box sx={connected ? rootStyles.successIndicator : rootStyles.errorIndicator} />
            {connected ? "Connected" : "Not Connected"}
          </>
        }
      />
    ),
  },
  {
    id: "device_type",
    label: "Device Type",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (evcharger) => (
      <Button
        onClick={() => dispatch(setStationSelected([evcharger] as EVCharger[]))}
        variant='contained'
        size='small'
      >
        Edit Campaign
      </Button>
    ),
  },
];

export const CampaignList: Campaign[] = [
  {
    name: "Campaign Name",
    file_url: "https://www.fileurl.com/",
    emotions: "Happy, xyz...",
    age_range: "18-25",
    brand: "Type your brand name",
    start_date: "2022-08-26",
    end_date: "2022-08-26",
  },
  {
    name: "Campaign Name",
    file_url: "https://www.fileurl.com/",
    emotions: "Happy, xyz...",
    age_range: "18-25",
    brand: "Type your brand name",
    start_date: "2022-08-26",
    end_date: "2022-08-26",
  },
  {
    name: "Campaign Name",
    file_url: "https://www.fileurl.com/",
    emotions: "Happy, xyz...",
    age_range: "18-25",
    brand: "Type your brand name",
    start_date: "2022-08-26",
    end_date: "2022-08-26",
  },
];

export const singleCampaign: Campaign = {
  name: "Campaign Name",
  file_url: "https://www.fileurl.com/",
  emotions: "Happy, xyz...",
  age_range: "18-25",
  brand: "Type your brand name",
  start_date: "2022-08-26",
  end_date: "2022-08-26",
};

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
    id: "total_view",
    label: "Views",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "age_range",
    label: "Age",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "file_type",
    label: "Type",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "avg_duration",
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
  },
];

export const AssetInformation = [
  {
    name: "Seco ELECTRA",
    brand: "Fast fooed",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Working",
  },
  {
    name: "Seco MAIA",
    brand: "Seco MAIA",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Ended",
  },
  {
    name: "Seco Pyxis",
    brand: "Fast fooed",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Working",
  },
  {
    name: "Hamburger",
    brand: "Ok fast food",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Ended",
  },
  {
    name: "Jewelry",
    brand: "Fernando Jorge",
    views: "97%",
    age: "20-59",
    type: "Video",
    duration: "25 s",
    status: "Working",
  },
];

export const barSeries = [
  {
    name: "Data Views",
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
  },
];
export const barOptions: ApexOptions = {
  chart: {
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: "top",
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#304758"],
    },
  },
  xaxis: {
    categories: ["20-29 years", "", "", "40-49 years", "", "", "", "60-69 years"],
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
          position: "bottom",
        },
      },
    },
  ],
};
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

export const HeadRowData: HeadCell[] = [
  {
    id: "name",
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
    id: "total_view",
    label: "Total Views",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "view_rate",
    label: "Viewing rate (%)",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "avg_duration",
    label: "Average Duration (sec)",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
];

export const AdsMock = [
  {
    name: "Seco ELECTRA",
    total_audience: 800,
    viewing_rate: 32.5,
    average_duration: 32,
    total_views: 499,
    data: [28, 26, 36, 30, 45, 35, 64, 52, 59, 80, 40, 90, 70, 10, 40],
  },
  {
    name: "Seco MAIA",
    total_audience: 320,
    viewing_rate: 31.5,
    average_duration: 52,
    total_views: 725,
    data: [28, 26, 12, 30, 45, 35, 64, 52, 59, 100, 84, 21, 55, 80, 98],
  },
  {
    name: "Seco PYXIS",
    total_audience: 521,
    viewing_rate: 71.5,
    average_duration: 22.9,
    total_views: 712,
    data: [10, 16, 52, 10, 35, 200, 24, 92, 59, 30, 24, 191, 5, 8, 76],
  },
  {
    name: "Hamburger",
    total_audience: 948,
    viewing_rate: 61.5,
    average_duration: 53.9,
    total_views: 499,
    data: [10, 16, 52, 120, 95, 5, 64, 22, 99, 30, 4, 131, 50, 89, 176],
  },
  {
    name: "Jewelry",
    total_audience: 948,
    viewing_rate: 61.5,
    average_duration: 53.9,
    total_views: 1299,
    data: [120, 70, 5, 90, 15, 25, 34, 72, 19, 30, 24, 11, 5, 8, 76],
  },
];

export const AdvAnalysisData = [
  { label: "Seco ELECTRA", value: 19 },
  { label: "Seco MAIA", value: 23 },
  { label: "Seco PYXIS", value: 8 },
  { label: "Hamburger", value: 15 },
  { label: "Jewelry", value: 5 },
];

export const VendorAnalysisData = [
  { label: "Tesla", value: 20 },
  { label: "Ford", value: 16 },
  { label: "Wolkswagen", value: 8 },
  { label: "Other", value: 5 },
];
