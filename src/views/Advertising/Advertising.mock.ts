import { BodyCell, HeadCell } from "../../components/Table/Table.types";
import _ from "lodash";
import moment from "moment";

export const filterOptions = [
  { value: "business_name", label: "Name" },
  { value: "address", label: "Address" },
  { value: "contact_info", label: "Contact Info" },
  { value: "parent_operator", label: "Parent Operator" },
  { value: "created_at", label: "Created At" },
];

export const HeadRowData: HeadCell[] = [
  {
    id: "ad_id",
    label: "ID",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "ad_name",
    label: "Name",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "operator_name",
    label: "Operator",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "ad_type",
    label: "Type",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "ad_screen",
    label: "Screen",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "devices",
    label: "Visible on Devices",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (x, devices) =>
      _.map(devices, (device: { vm_name: string }) => device.vm_name).toString(),
  },
  {
    id: "created_at",
    label: "Created At",
    numeric: false,
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
