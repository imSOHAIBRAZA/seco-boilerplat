import * as React from "react";
import { Box, ListItemText, MenuItem, TextField, TextFieldProps, Typography } from "@mui/material";
import { AdsMultiSelect, VendorTable } from "./DigitalSignage.components";
import { Chart, PieChart, Table } from "../../components";
import { initialUIConfig, useAppSelector } from "../../lib";
import * as sx from "./DigitalSignage.styles";
import * as mocks from "./DigitalSignage.mocks";
import * as rootStyles from "../../lib/rootStyles";
import moment from "moment";
import { useDigitalSignageAdvertise } from "./DigitalSignage.hooks";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";

const Advertise: React.FC = () => {
  const operators = useAppSelector((state) => state.dropdown.operators);

  const assets = useAppSelector((state) => state.digitalsignage.assets);
  const rowsPerPage = useAppSelector((state) => state.digitalsignage.rowsPerPage);
  const pageNo = useAppSelector((state) => state.digitalsignage.pageNo);
  const isLoading = useAppSelector((state) => state.digitalsignage.isLoading);
  const dataCount = useAppSelector((state) => state.digitalsignage.dataCount);
  const orderBy = useAppSelector((state) => state.digitalsignage.ordering);
  const advertisingList = useAppSelector((state) => state.digitalsignage.advertisingList);
  const selectedAds = useAppSelector((state) => state.digitalsignage.selectedAds);
  const adsStartDate = useAppSelector((state) => state.digitalsignage.adsStartDate);
  const adsEndDate = useAppSelector((state) => state.digitalsignage.adsEndDate);
  const adsGraphData = useAppSelector((state) => state.digitalsignage.adsGraphData);

  interface ISeries {
    [key: number]: { id: number; data: number[]; name: string; type: "bar" };
  }

  const {
    handlePageChange,
    handleRowsPerPageChange,
    handleSort,
    handleAdsSelection,
    handleStartDate,
    handleEndDate,
  } = useDigitalSignageAdvertise();

  const chartSeries = React.useMemo(() => {
    const series: ISeries = {};
    selectedAds.forEach((id) => {
      series[id] = { id, name: "", data: [], type: "bar" };
    });
    Object.values(adsGraphData).forEach((v) => {
      v.forEach((add) => {
        if (series[add.campaign_id]) {
          series[add.campaign_id].name = add.campaign__name;
          series[add.campaign_id].data.push(add.view_count);
        }
      });
    });
    return Object.values(series);
  }, [selectedAds, adsGraphData]);
  return (
    <Box sx={sx.advertiseContainer}>
      <Box sx={sx.cardWrapper}>
        <Box sx={sx.advertiseHeader}>
          <Typography sx={sx.adViewTitle} variant='body1'>
            Ads view Analysis
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ ...sx.fieldsWrapper, px: 0 }}>
              <DatePicker
                onChange={(date) => {
                  if (date) {
                    handleStartDate(format(new Date(date), "yyyy-MM-dd"));
                  }
                }}
                value={new Date(adsStartDate)}
                maxDate={new Date(adsEndDate)}
                label='Start Date'
                renderInput={(params: TextFieldProps) => (
                  <TextField {...params} InputLabelProps={{ shrink: true }} size='small' />
                )}
              />
              <DatePicker
                onChange={(date) => {
                  if (date) {
                    handleEndDate(format(new Date(date), "yyyy-MM-dd"));
                  }
                }}
                value={new Date(adsEndDate)}
                minDate={new Date(adsStartDate)}
                label='End Date'
                renderInput={(params: TextFieldProps) => (
                  <TextField {...params} InputLabelProps={{ shrink: true }} size='small' />
                )}
              />
            </Box>
            <AdsMultiSelect options={advertisingList} onSelect={handleAdsSelection} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, pl: 4 }}>
          {advertisingList
            .filter(({ id }) => selectedAds.includes(id))
            .map(({ name }, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    backgroundColor: initialUIConfig.chartColor[index],
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                  }}
                />
                <Typography variant='caption' color='#606C80' fontWeight={500}>
                  {name}
                </Typography>
              </Box>
            ))}
        </Box>

        <Box sx={sx.viewsAnalysisChartWrapper}>
          <Chart
            isLoading={isLoading}
            tooltipShared={false}
            strokeWidth={0}
            series={chartSeries}
            labels={Object.keys(adsGraphData)}
            barRadius={5}
            options={{
              xaxis: {
                labels: { formatter: (value) => moment(value).format("D") },
              },
            }}
          />
        </Box>
        <Box sx={rootStyles.tableBorderlessWrapper}>
          <Table
            headData={mocks.HeadRowData}
            data={advertisingList.map((add) => ({
              ...add,
              view_rate: Number(add.view_rate).toFixed(2),
            }))}
            isLoading={isLoading}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pageNo}
            onSort={handleSort}
            orderBy={orderBy}
            dataCount={dataCount}
            onPageChange={handlePageChange}
            isEmptyRows={false}
          />
        </Box>
      </Box>
      <Box sx={sx.cardWrapper}>
        <Box sx={sx.vendoreHeader}>
          <Typography sx={sx.adViewTitle} variant='body1'>
            Adv Analysis
          </Typography>
          <Box sx={sx.fieldsWrapper2}>
            <TextField size='small' label='Select Vendor' select sx={{ width: "104px" }}>
              {operators.map((operator, idx) => (
                <MenuItem key={idx} value={operator.value}>
                  <ListItemText primary={operator.label} />
                </MenuItem>
              ))}
            </TextField>
            <TextField size='small' label='Day' select sx={{ width: "104px" }}>
              <MenuItem value='day'>
                <ListItemText primary='Day' />
              </MenuItem>
            </TextField>
          </Box>
        </Box>
        <Box sx={sx.pieChartAndDataWrapper}>
          <PieChart
            labels={advertisingList.map((add) => add.name)}
            series={advertisingList.map((add) => add.total_view)}
          />
          <Box sx={sx.vendorTableContianer}>
            <VendorTable
              data={advertisingList.map((add) => ({
                label: add.name,
                value: add.total_view,
              }))}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={sx.cardWrapper}>
        <Typography sx={sx.assetTitle} variant='body1'>
          Asset Information
        </Typography>
        <Box sx={rootStyles.tableBorderlessWrapper}>
          <Table
            headData={mocks.AssetHeadRowData}
            data={assets}
            isLoading={isLoading}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pageNo}
            onSort={handleSort}
            orderBy={orderBy}
            dataCount={dataCount}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Advertise;
