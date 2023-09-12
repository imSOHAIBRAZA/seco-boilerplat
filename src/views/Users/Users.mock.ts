import { BodyCell, HeadCell } from "../../components/Table/Table.types";
import { LabelsT } from "./Users.types";

const typesLabels: LabelsT  = {
  SA: "Super Admin",
  CA: "Customer Admin",
  EU: "End User",
  SU: "Support User",
  DE: "DevOps Admin",
  FO: "Floor Operator",
  OP: "Operator",
  GA: "Group Admin",
  EM: "Employee",
};

export const filterOptions = [
  { value: "email", label: "Email" },
  { value: "username", label: "Username" },
  { value: "first_name", label: "First Name" },
  { value: "last_name", label: "Last Name" },
  { value: "type", label: "User Type" },
  { value: "company", label: "Operator" },
  { value: "created_by_user", label: "Created By" },
];

export const HeadRowData: HeadCell[] = [
  {
    id: "username",
    label: "Username",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "email",
    label: "Email",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "first_name",
    label: "First Name",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "last_name",
    label: "Last Name",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "type",
    label: "User Type",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (row, val: string) => typesLabels[val],
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
    id: "created_by_user",
    label: "Created By",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
];

export const BodyRowData: BodyCell[] = [
  { id: 1, lastName: "Snow", firstName: "Jonnn", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 20 },
  { id: 6, lastName: "Melisandre", firstName: "A", age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export const initialModalState = {
  add: false,
  edit: false,
  delete: false,
};
