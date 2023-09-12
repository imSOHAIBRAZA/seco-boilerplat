import React from "react";
import { Box, Button, Chip } from "@mui/material";
import { HeadCell } from "../../components/Table/Table.types";
import * as rootStyles from "../../lib/rootStyles";
import { dispatch } from "../../lib";
import {
  setSelectedVehicles,
  setStationSelected,
} from "../../features/recognition/recognition-slice";
import { Vehicle } from "../../types/Recognition";
import { EVCharger } from "../../types";

export const HistoryHeadRowData: HeadCell[] = [
  {
    id: "model",
    label: "Model",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "plate",
    label: "Plate",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "entry",
    label: "Entry",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "exit",
    label: "Exit",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "date",
    label: "Date",
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
      <Chip color={value !== "Online" ? "error" : "success"} label={value || "Working"} />
    ),
  },
];

export const HistoryData = [
  {
    model: "Opel-e-corsa 940kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Online",
  },
  {
    model: "Tesla modelX 240kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Offline",
  },
  {
    model: "Opel-e-corsa 940kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Online",
  },
  {
    model: "Tesla modelX 240kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Offline",
  },
  {
    model: "Opel-e-corsa 940kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Online",
  },
  {
    model: "Tesla modelX 240kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Offline",
  },
];

export const VehicleRowData: HeadCell[] = [
  {
    id: "vehicle_number",
    label: "Number",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "vehicle_model",
    label: "Model",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "plate_Date",
    label: "Plate Date",
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
    render: (vehicle) => (
      <Button
        onClick={() => dispatch(setSelectedVehicles([vehicle as Vehicle]))}
        variant='contained'
        size='small'
      >
        View Details
      </Button>
    ),
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
