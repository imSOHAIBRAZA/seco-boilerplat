import React from "react";
import { Box, Chip } from "@mui/material";
import { BodyCell, HeadCell } from "../../components/Table/Table.types";
import { rootStyles } from "../../lib";

export const filterOptions = [
  { value: "location_name", label: "Location Name" },
  { value: "operator_name", label: "Operator" },
  { value: "country", label: "Country" },
  { value: "city", label: "City" },
  { value: "latitude", label: "Latitude" },
  { value: "longitude", label: "Longitude" },
  { value: "detailed_address", label: "Detailed Address" },
];

export const HeadRowData: HeadCell[] = [
  {
    id: "location_name",
    label: "Location Name",
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
    id: "country",
    label: "Country",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "city",
    label: "City",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "latitude",
    label: "Latitude",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "longitude",
    label: "Longitude",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "detailed_address",
    label: "Detailed Address",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (_, value: string) => (
      <Chip
        color={value === "Disable" ? "error" : "success"}
        label={
          <>
            <Box
              sx={value === "Disable" ? rootStyles.errorIndicator : rootStyles.successIndicator}
            />
            {value}
          </>
        }
      />
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
