import * as React from "react";
import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { Table, SearchField, SelectField, IconButton } from "../../components";
import * as sx from "./Alert.styles";
import * as types from "./Alert.types";
import * as mock from "./Alert.mock";
import { getScreenDescription, useAppDispatch, useAppSelector } from "../../lib";
import { setAlertPage, setAlertRowsPerPage, setAlertOrdering } from "../../features/alert/alert-slice";
import { useAlert } from "./Alert.hooks";
import { ExportIcon } from "../../assets/icons";
import { CSVLink } from "react-csv";

const Alert: types.ComponentT = () => {
  const dispatch = useAppDispatch();

  const alerts = useAppSelector((state) => state.alerts.alerts);
  const allAlerts = useAppSelector((state) => state.alerts.allAlerts);
  const rowsPerPage = useAppSelector((state) => state.alerts.rowsPerPage);
  const pageNo = useAppSelector((state) => state.alerts.pageNo);
  const orderBy = useAppSelector((state) => state.alerts.ordering);
  const isLoading = useAppSelector((state) => state.alerts.isLoading);
  const dataCount = useAppSelector((state) => state.alerts.dataCount);
  const alertLevel = useAppSelector((state) => state.dropdown.alertLevel);
  const alertType = useAppSelector((state) => state.dropdown.alertType);

  const {
    searchQuery,
    handleSearch,
    searchFilter,
    selectedFilters,
    handleFilters,
    handleSelectFilter,
    locationDropDownOption,
  } = useAlert();

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setAlertRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setAlertPage(page));
  };

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    handleFilters({ name: target.name, value: target.value });
  };
  const handleSort = (order: string) => {
    dispatch(setAlertOrdering(order));
  };
  return (
    <React.Fragment>
      <Box>
        <Typography variant='body2' sx={sx.appDescription}>
          {getScreenDescription(location.pathname)}
        </Typography>

        <Box sx={sx.fieldWrapper}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              onChange={(value) => {
                if (value) {
                  handleFilters({
                    name: "start_date",
                    value: format(value, "yyyy-MM-dd"),
                  });
                }
              }}
              label='Start Date'
              value={new Date(selectedFilters.start_date as Date)}
              maxDate={new Date(selectedFilters.end_date as Date)}
              renderInput={(params: TextFieldProps) => (
                <TextField
                  name='start_date'
                  {...params}
                  InputLabelProps={{ shrink: true }}
                  size='small'
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              onChange={(value) => {
                if (value) {
                  handleFilters({
                    name: "end_date",
                    value: format(value, "yyyy-MM-dd"),
                  });
                }
              }}
              label='End Date'
              value={new Date(selectedFilters.end_date as Date)}
              maxDate={new Date()}
              minDate={new Date(selectedFilters.start_date as Date)}
              renderInput={(params: TextFieldProps) => (
                <TextField
                  name='end_date'
                  {...params}
                  InputLabelProps={{ shrink: true }}
                  size='small'
                />
              )}
            />
          </LocalizationProvider>
          <SelectField
            label='Location'
            options={locationDropDownOption}
            value={selectedFilters.vm__location}
            name='vm__location'
            onChange={onInputChange}
          />
          <SelectField
            label='Alert Type'
            options={alertType}
            onChange={onInputChange}
            value={selectedFilters.alert_type}
            name='alert_type'
          />
          <SelectField
            label='Alert Severity'
            options={alertLevel}
            onChange={onInputChange}
            value={selectedFilters.alert_level}
            name='alert_level'
          />
          <SearchField
            value={searchQuery}
            filterValue={searchFilter}
            onChange={handleSearch}
            onSelect={handleSelectFilter}
            options={mock.filterOptions}
          />
          <CSVLink data={allAlerts} filename={"allAlerts.csv"} style={{ textDecoration: "none" }}>
            <IconButton icon={ExportIcon} variant='contained'>
              Export
            </IconButton>
          </CSVLink>
        </Box>
        <Box sx={sx.tableWrapper}>
          <Table
            headData={mock.HeadRowData}
            data={alerts}
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
    </React.Fragment>
  );
};

export default Alert;
