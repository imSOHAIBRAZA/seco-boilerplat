import * as React from "react";
import { AlertChip } from "./Alert.components";
import { BodyCell, HeadCell } from "../../components/Table/Table.types";
import moment from "moment";

export const filterOptions = [
  { value: "device_id", label: "Device ID" },
  { value: "vm_name", label: "Device Name" },
  { value: "message", label: "Message" },
  { value: "operator", label: "Operator" },
];

export const HeadRowData: HeadCell[] = [
  {
    id: "id",
    label: "Alert ID",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "device_id",
    label: "Device ID",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "vm_name",
    label: "Device Name",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "vm_serial",
    label: "VM Serial",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "alert_type_capital",
    label: "Alert Type",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "alert_level",
    label: "Alert Level",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (_, value: string) => <AlertChip label={value} />,
  },
  {
    id: "organization",
    label: "Operator",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "location_name",
    label: "Location",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "reporting_time",
    label: "Reporting Time",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (row, value: string) => moment(value).format("MM-DD-YYYY hh:mm:ss A"),
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
