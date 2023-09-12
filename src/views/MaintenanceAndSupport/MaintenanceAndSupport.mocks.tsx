import * as React from "react";
import { Chip, Box, Button } from "@mui/material";
import { HeadCell } from "../../components/Table/Table.types";
import * as rootStyles from "../../lib/rootStyles";
import { dispatch } from "../../lib";
import { setStationSelected } from "../../features/maintenance-support/maintenance-support-slice";
import { EVCharger } from "../../types";
import moment from "moment";

export const HistoryHeadRowData: HeadCell[] = [
  {
    id: "module_temp",
    label: "Module Temp.",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "cable_temp",
    label: "Cable Temp.",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "kwh",
    label: "KWh",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "updated_at",
    label: "Time",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (_, value: string) => moment(value).format("MM-DD-YYYY hh:mm:ss A"),
  },
  {
    id: "co2_emission",
    label: "CO2",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "warning",
    label: "Status",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (_, value: string) => (
      <Chip
        color={value ? "warning" : "success"}
        label={
          <>
            <Box sx={value ? rootStyles.warningIndicator : rootStyles.successIndicator} />
            {value || "No warning"}
          </>
        }
      />
    ),
  },
];

export const HistoryData = [
  {
    module_temp: "75.5 C",
    cable_temp: "75.5 C",
    kwh: 85,
    time: "21:49 min",
    co2: "1.9 kg",
    status: "No Warning",
  },
  {
    module_temp: "75.5 C",
    cable_temp: "75.5 C",
    kwh: 85,
    time: "21:49 min",
    co2: "1.9 kg",
    status: "No Warning",
  },
  {
    module_temp: "75.5 C",
    cable_temp: "75.5 C",
    kwh: 85,
    time: "21:49 min",
    co2: "1.9 kg",
    status: "No Warning",
  },
  {
    module_temp: "75.5 C",
    cable_temp: "75.5 C",
    kwh: 85,
    time: "21:49 min",
    co2: "1.9 kg",
    status: "No Warning",
  },
  {
    module_temp: "75.5 C",
    cable_temp: "75.5 C",
    kwh: 85,
    time: "21:49 min",
    co2: "1.9 kg",
    status: "No Warning",
  },
  {
    module_temp: "75.5 C",
    cable_temp: "75.5 C",
    kwh: 85,
    time: "21:49 min",
    co2: "1.9 kg",
    status: "No Warning",
  },
];

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
    id: "warning",
    label: "Warning status",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: ({ id }) => {
      const showWarning = [2, 5, 9].includes(id);
      return (
        <Chip
          color={showWarning ? "warning" : "success"}
          label={showWarning ? "Warning" : "No warning"}
        />
      );
    },
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
        onClick={() => dispatch(setStationSelected(evcharger as EVCharger))}
        variant='contained'
        size='small'
      >
        View Details
      </Button>
    ),
  },
];

export const tempModules = Array(33)
  .fill(0)
  .map((_, i) => {
    if (i === 21) return -1;
    if (i < 26) return 1;
    return 0;
  });
