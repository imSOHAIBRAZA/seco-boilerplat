import React from "react";
import { Box, Button, Skeleton, Typography, useTheme } from "@mui/material";
import { HistoryTable, TemperatureGraph } from "./MaintenanceAndSupport.components";

import { ExclaimationIcon, ExportIcon } from "../../assets/icons";
import { getScreenDescription, rootStyles, useAppDispatch, useAppSelector } from "../../lib";
import { useEVChargers } from "../EVCharger/EVCharger.hooks";
import { Table, IconButton, InfoCard } from "../../components";
import {
  setEVChargerPage,
  setEVChargerRowsPerPage,
  setEVChargerOrdering,
} from "../../features/ev-charger/ev-charger-slice";
import { setStationSelected } from "../../features/maintenance-support/maintenance-support-slice";
import * as mocks from "./MaintenanceAndSupport.mocks";
import * as sx from "./MaintenanceAndSupport.styles";
import _ from "lodash";
import SearchField from "../../components/SearchField";
import { useMaintenanceAndSupport } from "./MaintenanceAndSupport.hooks";
import { CSVLink } from "react-csv";

export const filterOptions = [
  { value: "serial_number", label: "Serial Number" },
  { value: "vm_name", label: "Name" },
  { value: "company", label: "Operator" },
  { value: "device_type", label: "Device Type" },
  { value: "status", label: "Status" },
];

const Capsule: React.FC<{ value: number }> = ({ value = 0 }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: "1px solid #DBDBDB",
        borderRadius: "8px",
        width: "8px",
        height: "40px",
        display: "inline-flex",
        background: value === 1 ? theme.palette.primary.main : value === -1 ? "#FF0000" : "#FFFFFF",
      }}
    />
  );
};

const MaintenanceAndSupport: React.FC = () => {
  const { temperatureDate, temperaturChartSeries, handleFilters } = useMaintenanceAndSupport();
  const { searchQuery, handleSearch, handleSelectFilter, handleFetchEVChargers, searchFilter } =
    useEVChargers();
  const dispatch = useAppDispatch();

  const evchargers = useAppSelector((state) => state.evchargers.evchargers);
  const allEvchargers = useAppSelector((state) => state.evchargers.allEvchargers);
  const rowsPerPage = useAppSelector((state) => state.evchargers.rowsPerPage);
  const pageNo = useAppSelector((state) => state.evchargers.pageNo);
  const isLoading = useAppSelector((state) => state.evchargers.isLoading);
  const dataCount = useAppSelector((state) => state.evchargers.dataCount);
  const stats = useAppSelector((state) => state.maintenanceSupport.stats);
  const currentTemperature = useAppSelector((state) => state.maintenanceSupport.currentTemperature);
  const orderBy = useAppSelector((state) => state.evchargers.ordering);

  const selectedStation = useAppSelector((state) => state.maintenanceSupport.selectedStation);
  const isMutating = useAppSelector((state) => state.maintenanceSupport.isMutating);
  const maintenanceLoading = useAppSelector((state) => state.maintenanceSupport.isLoading);
  const [filteredMaintenance, setFilteredMaintenance] = React.useState<any>([]);

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setEVChargerRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setEVChargerPage(page));
  };

  React.useEffect(() => {
    handleFetchEVChargers();
  }, []);

  const handleSort = (order: string) => {
    dispatch(setEVChargerOrdering(order));
  };

  const MaintenanceList = [
    {
      label: "Energy this week",
      totalValue: stats?.energy_weekly,
      valueUnit: "kWh",
      tag: "Energy supply",
    },
    {
      label: "Recharge time",
      totalValue: stats?.electricity_cost,
      valueUnit: "min",
      tag: "Electricity cost",
    },
    {
      label: "Working",
      totalValue: stats?.energy_supply,
      tag: "Energy supply",
    },
    {
      label: "Ecology",
      valueUnit: "kg",
      totalValue: stats?.co2,
      tag: "CO2",
    },
    {
      label: "Status Efficiency",
      totalValue: stats?.status_efficiency,
      valueUnit: "%",
      tag: "Efficiency",
    },
    {
      label: "Real time",
      totalValue: stats?.real_time_energy,
      valueUnit: "/100 kWh",
      tag: "Energy supply",
    },
  ];

  React.useEffect(() => {
    setFilteredMaintenance(
      allEvchargers.map((evcharger) => {
        const temp: any = {
          ...evcharger,
          company: evcharger?.company?.business_name,
          address: evcharger?.address?.address,
        };
        return temp;
      }),
    );
  }, [allEvchargers]);
  if (!selectedStation) {
    return (
      <Box sx={sx.rootContentWrapper}>
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
            <CSVLink
              data={filteredMaintenance}
              filename={"allEvchargers.csv"}
              style={{ textDecoration: "none" }}
            >
              <IconButton icon={ExportIcon} variant='contained' >
                Export
              </IconButton>
            </CSVLink>
          </Box>
        </Box>
        <Box sx={sx.tableWrapper}>
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
      </Box >
    );
  }
  return (
    <Box sx={sx.rootContentWrapper}>
      <Box>
        <Button
          disabled={isMutating}
          variant='outlined'
          onClick={() => dispatch(setStationSelected(null))}
        >
          GO BACK
        </Button>
      </Box>
      <Box sx={sx.cardWrapper}>
        {_.map(MaintenanceList, (value, index) => (
          <InfoCard key={index} isLoading={maintenanceLoading} {...value} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Box sx={sx.temperatureCard}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Typography variant='body2' fontWeight={600} color='#0071C5'>
              Temperature Management
            </Typography>
            <Box sx={sx.moduleTemperature}>
              <Typography variant='body2' fontWeight={600} mb={2}>
                Module temperature
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "2px",
                  }}
                >
                  {mocks.tempModules.map((i, idx) => (
                    <Capsule key={idx} value={i} />
                  ))}
                </Box>
                <Typography variant='h4' fontWeight={600} color='primary.600'>
                  {maintenanceLoading ? (
                    <Skeleton width={60} height='42px' />
                  ) : (
                    currentTemperature?.module_temperature + " °C"
                  )}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box sx={sx.inputTemperature}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant='body2' fontWeight={600}>
                    Cable temperature
                  </Typography>
                  <Typography variant='caption' fontWeight={600}>
                    °C
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    py: 2,
                  }}
                >
                  <Typography variant='h4' fontWeight={600} width={120}>
                    {maintenanceLoading ? (
                      <Skeleton width={60} height='42px' />
                    ) : (
                      currentTemperature?.cable_temperature + " °C"
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {maintenanceLoading ? (
          <Box sx={sx.noWarningCard}>
            <Typography width='40%' variant='h6' fontWeight={600}>
              <Skeleton />
            </Typography>
            <Typography width='70%' variant='h2' fontWeight={600} mt={2} mb={2}>
              <Skeleton />
            </Typography>
            <Box width='100%'>
              <Typography variant='body2'>
                <Skeleton width='100%' />
              </Typography>
              <Typography variant='body2'>
                <Skeleton width='100%' />
              </Typography>
              <Typography variant='body2'>
                <Skeleton width='60%' />
              </Typography>
            </Box>
          </Box>
        ) : currentTemperature?.warning_status ? (
          <Box sx={sx.warningCard}>
            <Box sx={sx.warningCardHeader}>
              <Box sx={sx.warningIconWrapper}>
                <ExclaimationIcon />
              </Box>
              <Box>
                <Typography color='#FF9500' variant='body2'>
                  Warning
                </Typography>
                <Typography variant='h6' color='primary.900' fontWeight={600} lineHeight='24px'>
                  Predictive Maintenance
                </Typography>
              </Box>
            </Box>
            <Typography variant='body2' color='primay.900'>
              {currentTemperature?.warning_message}
            </Typography>
          </Box>
        ) : (
          <Box sx={sx.noWarningCard}>
            <Typography variant='h6' fontWeight={600}>
              Predictive Maintenance
            </Typography>
            <Typography variant='h2' fontWeight={600} mt={2} mb={2}>
              No Warning
            </Typography>

            <Typography variant='body2'>
              It is a long established fact that a reader will be distracted by the readable content
              of a page when looking at its layout. The point of using Lorem Ipsum
            </Typography>
          </Box>
        )}
      </Box>
      <TemperatureGraph
        date={temperatureDate}
        series={temperaturChartSeries}
        handleFilters={handleFilters}
        isLoading={isLoading}
      />
      <HistoryTable />
    </Box>
  );
};

export default MaintenanceAndSupport;
