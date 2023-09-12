import * as React from "react";
import * as sx from "./MaintenanceAndSupport.styles";
import * as mocks from "./MaintenanceAndSupport.mocks";
import * as rootStyles from "../../lib/rootStyles";

import { Box, TextField, Typography, Tabs, Tab, TextFieldProps } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { Chart, Table } from "../../components";
import { useAppDispatch, useAppSelector } from "../../lib";
import {
  setHistoryPage,
  setHistoryRowsPerPage,
  setTemperatureFilter,
  setMaintenanceSupportOrdering,
} from "../../features/maintenance-support/maintenance-support-slice";

export const HistoryTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const maintenanceHistory = useAppSelector((state) => state.maintenanceSupport.maintenanceHistory);
  const isLoading = useAppSelector((state) => state.maintenanceSupport.isLoading);
  const isMutating = useAppSelector((state) => state.maintenanceSupport.isMutating);
  const pageNo = useAppSelector((state) => state.maintenanceSupport.pageNo);
  const dataCount = useAppSelector((state) => state.maintenanceSupport.dataCount);
  const rowsPerPage = useAppSelector((state) => state.maintenanceSupport.rowsPerPage);
  const orderBy = useAppSelector((state) => state.maintenanceSupport.ordering);
  const handleRowsPerPage = (limit: number) => {
    dispatch(setHistoryRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setHistoryPage(page));
  };
  const handleSort = (order: string) => {
    dispatch(setMaintenanceSupportOrdering(order));
  };
  return (
    <Box sx={sx.historyCardWrapper}>
      <Typography sx={sx.cardTitle} variant='body1'>
        History
      </Typography>
      <Box sx={rootStyles.tableBorderlessWrapper}>
        <Table
          headData={mocks.HistoryHeadRowData}
          data={maintenanceHistory}
          isLoading={isLoading || isMutating}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPage}
          page={pageNo}
          orderBy={orderBy}
          onSort={handleSort}
          dataCount={dataCount}
          onPageChange={handlePageChange}
          isEmptyRows={false}
        />
      </Box>
    </Box>
  );
};

export const TemperatureGraph = ({
  date,
  series,
  handleFilters,
  isLoading,
}: {
  date: string[];
  // eslint-disable-next-line
  series: ApexAxisChartSeries;
  handleFilters: (Arg1: { name: string; value: string }) => void;
  isLoading?: boolean;
}) => {
  const dispatch = useAppDispatch();
  const temperatureFilter = useAppSelector((state) => state.maintenanceSupport.temperatureFilter);
  const selectedFilters = useAppSelector((state) => state.maintenanceSupport.filters);

  const handleTabChange = (_: React.SyntheticEvent, value: string) => {
    dispatch(setTemperatureFilter(value));
  };

  return (
    <Box sx={sx.historyCardWrapper}>
      <Box sx={sx.advertiseHeader}>
        <Typography sx={sx.adViewTitle} variant='body1'>
          Temperature
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            alignSelf: { xs: "flex-end", md: "center" },
          }}
        >
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
              value={new Date(selectedFilters.start_date)}
              maxDate={new Date(selectedFilters.end_date)}
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
              value={new Date(selectedFilters.end_date)}
              maxDate={new Date()}
              minDate={new Date(selectedFilters.start_date)}
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
        </Box>
      </Box>
      <Tabs
        sx={{
          ml: { md: 4, xs: 2 },
          width: "fit-content",
          border: "1px solid #DBDBDB",
          borderRadius: "12px",
          p: 0.5,
          "& .MuiTab-root": {
            margin: 0,
            px: "24px",
            fontSize: "16px",
            fontWeight: 500,
            color: "primary.900",
            py: 0,
            height: "42px",
            minHeight: "42px",
          },
          "& .Mui-selected": {
            color: "#FFF",
            backgroundColor: "primary.main",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 500,
          },
          "& .MuiTabs-indicator": { background: "none" },
        }}
        onChange={handleTabChange}
        value={temperatureFilter}
      >
        <Tab value='cable' label='Cable' />
        <Tab value='power' label='Power Modules' />
      </Tabs>
      <Box sx={sx.viewsAnalysisChartWrapper}>
        <Chart isLoading={isLoading} strokeWidth={3} series={series} labels={date} />
      </Box>
    </Box>
  );
};
