import * as React from "react";
import { Box, Chip, Button } from "@mui/material";
import { BodyCell, HeadCell } from "../../components/Table/Table.types";
import { rootStyles , dispatch} from "../../lib";
import { setHistoryEvcharger } from "../../features/ev-charger/ev-charger-slice"

export const filterOptions = [
  { value: "serial_number", label: "Serial Number" },
  { value: "vm_name", label: "Name" },
  { value: "company", label: "Operator" },
  { value: "device_type", label: "Device Type" },
  { value: "status", label: "Status" },
];

const occupancyStateData: any = {
  available: "Available",
  occupied: "Occupied",
  out_of_service: "Out Of Service",
  booked: "Booked",
  locked: "Locked",
};

export const HeadRowData: HeadCell[] = [
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
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (_: unknown, value) => value?.business_name,
  },
  {
    id: "address",
    label: "Latitude",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (_: unknown, value) => value?.latitude,
  },
  {
    id: "address",
    label: "Longitude",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (_: unknown, value) => value?.longitude,
  },
  {
    id: "address",
    label: "Address",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (_: unknown, value) => value?.address,
  },
  {
    id: "max_power",
    label: "Max Power",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: ({ max_power: maxPower }) => maxPower,
  },
  {
    id: "connector_type",
    label: "Connector Type",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: ({ connector_type: connectorType }) => connectorType,
  },
  {
    id: "occupancy_state",
    label: "Status",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: ({ occupancy_state: occupancyState }) => (
      <Chip
        color={
          occupancyState === "available"
            ? "success"
            : occupancyState === "occupied" || occupancyState === "booked"
              ? "warning"
              : "error"
        }
        label={<>{occupancyStateData[occupancyState]}</>}
      />
    ),
  },
  {
    id: "status",
    label: "Network Status",
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
    render: (device) => (
      <Button
        onClick={() => dispatch(setHistoryEvcharger(device))}
        variant='contained'
        size='small'
      >
        Ev-charger History
      </Button>
    ),
  },
];

export const BodyRowData: BodyCell[] = [
  { id: 1, lastName: "Snow", firstName: "Jonnn", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 20 },
  { id: 6, lastName: "Melisandre", firstName: "a", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export const initialModalState = {
  add: false,
  edit: false,
  delete: false,
};


