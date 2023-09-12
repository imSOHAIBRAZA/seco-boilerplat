import * as React from "react";
import ApexChart from "react-apexcharts";
import {
  Box,
  ListItemText,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import format from "date-fns/format";
import { Chart, Table } from "../../components";
import { initialUIConfig, useAppSelector } from "../../lib";
import { useDigitalSignageAudience } from "./DigitalSignage.hooks";
import * as rootStyles from "../../lib/rootStyles";
import * as sx from "./DigitalSignage.styles";
import * as mocks from "./DigitalSignage.mocks";
import moment from "moment";
import _map from "lodash/map";

const DigitalSignage: React.FC = () => {
  const {
    analyticsDate,
    analyticsChartSeries,
    onViewTypeChange,
    handleStartDate,
    handleEndDate,
    selectedTime,
    onViewTimeChange,
  } = useDigitalSignageAudience();

  const totalPrecence = useAppSelector((state) => state.digitalsignage.total_presence);
  const average = useAppSelector((state) => state.digitalsignage.average);
  const advertising = useAppSelector((state) => state.digitalsignage.advertising);
  const performance = useAppSelector((state) => state.digitalsignage.performance);
  const audienceViews = useAppSelector((state) => state.digitalsignage.audienceViews);
  const viewType = useAppSelector((state) => state.digitalsignage.viewType);
  const viewStartDate = useAppSelector((state) => state.digitalsignage.viewStartDate);
  const viewEndDate = useAppSelector((state) => state.digitalsignage.viewEndDate);
  const isLoading = useAppSelector((state) => state.digitalsignage.isLoading);

  return (
    <Box sx={sx.advertiseContainer}>
      <Box sx={sx.cardWrapper}>
        <Box sx={sx.advertiseHeader}>
          <Typography sx={sx.adViewTitle} variant='body1'>
            Audience Analytics
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              alignSelf: { xs: "flex-end", md: "center" },
            }}
          >
            {_map(analyticsChartSeries, ({ name }, index: number) => (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }} key={index}>
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

            <TextField size='small' label='Day' select sx={{ width: "104px" }}>
              <MenuItem value='day'>
                <ListItemText primary='Day' />
              </MenuItem>
            </TextField>
          </Box>
        </Box>
        <Box sx={sx.viewsAnalysisChartWrapper}>
          <Chart
            isLoading={isLoading}
            strokeWidth={[3, 0]}
            series={analyticsChartSeries}
            labels={analyticsDate}
            options={{
              xaxis: {
                labels: { formatter: (value) => moment(value).format("D") },
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={sx.cardWrapper}>
        <Box sx={rootStyles.tableBorderlessWrapper}>
          <Table
            headData={mocks.AudienceHeadRowData}
            data={[
              {
                total_precence: totalPrecence,
                average,
                advertising,
                performance,
              },
            ]}
            isLoading={false}
            rowsPerPage={10}
            onRowsPerPageChange={() => console.log("page changed")}
            page={1}
            dataCount={10}
            isEmptyRows={false}
          />
        </Box>
      </Box>
      <Box sx={sx.cardWrapper}>
        <Box sx={sx.anlayticsContainer}>
          <Box sx={sx.chartBlock}>
            <Box sx={sx.chartBlockHeader}>
              <Typography sx={sx.adViewTitle} variant='body1'>
                Data Views
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <Tabs sx={sx.dataViewTabs} value={viewType} onChange={onViewTypeChange}>
                <Tab value='age' label='age' />
                <Tab value='emotion' label='Emotions' />
              </Tabs>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "flex-end" }}
              >
                <Tabs sx={sx.dataViewTabs} value={selectedTime} onChange={onViewTimeChange}>
                  <Tab value='day' label='Day' />
                  <Tab value='week' label='Week' />
                  <Tab value='month' label='Month' />
                  <Tab value='year' label='Year' />
                </Tabs>
                <Box sx={{ ...sx.fieldsWrapper, px: 0 }}>
                  <DatePicker
                    onChange={(date) => {
                      if (date) {
                        handleStartDate(format(new Date(date), "yyyy-MM-dd"));
                      }
                    }}
                    value={new Date(viewStartDate)}
                    maxDate={new Date(viewStartDate)}
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
                    value={new Date(viewEndDate)}
                    minDate={new Date(viewStartDate)}
                    label='End Date'
                    renderInput={(params: TextFieldProps) => (
                      <TextField {...params} InputLabelProps={{ shrink: true }} size='small' />
                    )}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={sx.barChart}>
              <ApexChart
                height={"260px"}
                options={{
                  ...mocks.barOptions,
                  xaxis: {
                    categories: Object.keys(audienceViews),
                  },
                }}
                series={[
                  {
                    name: "Data Views",
                    data: Object.values(audienceViews),
                  },
                ]}
                type='bar'
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DigitalSignage;
