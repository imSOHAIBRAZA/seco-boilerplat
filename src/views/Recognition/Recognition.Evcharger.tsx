import * as React from "react";
import Table from "../../components/Table";
import * as mocks from "./Recognition.mocks";
import { Box, Typography } from "@mui/material";
import {
  setEVChargerOrdering,
  setEVChargerRowsPerPage,
  setEVChargerPage,
} from "../../features/ev-charger/ev-charger-slice";
import { ExportIcon } from "../../assets/icons";
import { useAppDispatch, useAppSelector, rootStyles, getScreenDescription } from "../../lib";
import { useEVChargers } from "../EVCharger/EVCharger.hooks";
import { SearchField, IconButton } from "../../components";
import { CSVLink } from "react-csv";

export const filterOptions = [
  { value: "serial_number", label: "Serial Number" },
  { value: "vm_name", label: "Name" },
  { value: "company", label: "Operator" },
  { value: "device_type", label: "Device Type" },
  { value: "status", label: "Status" },
];

const RecognitionEvchargers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery, handleSearch, handleSelectFilter, handleFetchEVChargers, searchFilter } =
    useEVChargers();

  const allVehicles = useAppSelector((state) => state.recognitionSlice.allVehicles);
  const evchargers = useAppSelector((state) => state.evchargers.evchargers);
  const rowsPerPage = useAppSelector((state) => state.evchargers.rowsPerPage);
  const pageNo = useAppSelector((state) => state.evchargers.pageNo);
  const isLoading = useAppSelector((state) => state.evchargers.isLoading);
  const dataCount = useAppSelector((state) => state.evchargers.dataCount);
  const orderBy = useAppSelector((state) => state.evchargers.ordering);

  const selectedStation = useAppSelector((state) => state.recognitionSlice.selectedStation);

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setEVChargerRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setEVChargerPage(page));
  };
  const handleSort = (order: string) => {
    dispatch(setEVChargerOrdering(order));
  };
  React.useEffect(() => {
    handleFetchEVChargers();
  }, []);

  if (selectedStation) {
    return null;
  }
  return (
    <Box sx={rootStyles.rootContentWrapper}>
      <Typography variant='body2'>{getScreenDescription(location.pathname)}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <SearchField
          value={searchQuery}
          filterValue={searchFilter}
          onChange={handleSearch}
          onSelect={handleSelectFilter}
          options={filterOptions}
        />
        <Box sx={{ marginRight: "10px" }}>
          <CSVLink data={allVehicles} filename={"allVehicles.csv"} style={{ textDecoration: "none" }}>
            <IconButton icon={ExportIcon} variant='contained'>
              Export
            </IconButton>
          </CSVLink>
        </Box>
      </Box>
      <Box sx={rootStyles.rootTableWrapper}>
        <Box sx={rootStyles.tableBorderlessWrapper}>
          <Table
            headData={mocks.EvChargerHeadRowData}
            data={evchargers}
            isLoading={isLoading}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pageNo}
            orderBy={orderBy}
            onSort={handleSort}
            onPageChange={handlePageChange}
            dataCount={dataCount}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RecognitionEvchargers;
