import * as React from "react";
import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { PieChartWithTotal, TwoColumnsCard, Chart, InfoCard } from "../../components";
import { HistoryTable } from "./RevenueAndPrice.components";
import { useRevenueOverview } from "./RevenueAndPrice.hooks";
import {
  BulbIcon,
  AverageDuractionIcon,
  EnergySupplyIcon,
  ProfitIcon,
  RevenueIcon,
  BulbElectricityIcon,
  ConversationIcon,
} from "../../assets/icons";
import { formatNumber, initialUIConfig, useAppSelector } from "../../lib";
import * as sx from "./RevenueAndPrice.styles";
import _ from "lodash";

const DigitalSignage: React.FC = () => {
  const stats = useAppSelector((state) => state.revenueAndPrice.stats);
  const isLoading = useAppSelector((state) => state.revenueAndPrice.isLoading);
  const selectedFilters = useAppSelector((state) => state.revenueAndPrice.filters);

  const { revenuesDate, revenuesChartSeries, handleFilters } = useRevenueOverview();

  return (
    <Box sx={sx.advertiseContainer}>
      <Box sx={sx.cardWrapper4}>
        <InfoCard
          isLoading={isLoading}
          icon={RevenueIcon}
          label='Revenue this week'
          totalValue={`$${stats?.week_revenue || 0}`}
          tag='Total revenue'
        />
        <InfoCard
          isLoading={isLoading}
          icon={ProfitIcon}
          label='Profit this week'
          totalValue={`$${stats?.week_profit || 0}`}
          tag='Total Profit'
        />
        <InfoCard
          isLoading={isLoading}
          icon={EnergySupplyIcon}
          label='Cost electricity'
          totalValue={`$${stats?.week_electricity_cost || 0}`}
          tag='Total electricity cost'
        />
        <InfoCard
          isLoading={isLoading}
          icon={BulbElectricityIcon}
          label='This week'
          totalValue={stats?.week_enery_supply || 0}
          tag='Energy Supply'
          valueUnit='kWh'
        />
        <InfoCard
          isLoading={isLoading}
          icon={AverageDuractionIcon}
          label='Average duration'
          totalValue={stats?.average_duration || 0}
          valueUnit='min'
          tag='Device Status'
        />
        <InfoCard
          isLoading={isLoading}
          icon={ConversationIcon}
          label='Working'
          totalValue={stats?.total_sessions || 0}
          tag='EV charger total session'
        />
      </Box>
      <TwoColumnsCard
        leftSide={
          <Box>
            <Typography mb={4} color='primary.900' fontWeight={600} variant='body1'>
              EV charger usage time
            </Typography>
            <Box
              sx={{
                width: "100%",
                minHeight: { md: "calc(100% - 56px)" },
                display: "flex",
                "& > *": { flex: 1, height: "auto !important" },
              }}
            >
              <PieChartWithTotal
                isLoading={isLoading}
                value={[
                  { label: "Recharge", series: stats?.usage_time?.recharge || 0 },
                  { label: "Occupency", series: stats?.usage_time?.occupancy || 0 },
                ]}
              />
            </Box>
          </Box>
        }
        rightSide={
          <Box sx={sx.warningCard}>
            <Box sx={sx.warningCardHeader}>
              <Box sx={sx.warningIconWrapper}>
                <BulbIcon />
              </Box>
              <Box>
                <Typography color='primary' variant='body2'>
                  Smart suggestion
                </Typography>
                <Typography variant='h6' color='primary.900' fontWeight={600} lineHeight='24px'>
                  Create a promo
                </Typography>
              </Box>
            </Box>
            <Typography variant='body2' color='primay.900'>
              Your EV charger could distribute more electricity. Create{" "}
              <Box component='span' fontWeight={600} sx={{ textDecoration: "underline" }}>
                evening promo
              </Box>{" "}
              to entice people to charge even after dinner.{" "}
            </Typography>
            <InfoCard
              label='This week'
              tag='Active Promotion'
              totalValue={stats?.week_active_promotion}
              isLoading={isLoading}
            />
          </Box>
        }
      />

      <Box sx={sx.cardWrapper}>
        <Box sx={sx.advertiseHeader}>
          <Typography sx={sx.adViewTitle} variant='body1'>
            Revenue management graph
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
        <Box sx={sx.viewsAnalysisChartWrapper}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {_.map(revenuesChartSeries, (value: { name: string }, index: number) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Box
                  sx={{
                    backgroundColor: initialUIConfig.chartColor[index],
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  sx={{ textTransform: "capitalize", fontWeight: 500, color: "#606C80" }}
                  variant='caption'
                >
                  {value.name.replaceAll("_", " ")}
                </Typography>
              </Box>
            ))}
          </Box>
          <Chart
            isLoading={isLoading}
            strokeWidth={3}
            barRadius={0}
            barWidth='5px'
            customTooltip={true}
            options={{
              yaxis: {
                labels: { formatter: (value: number) => `${formatNumber(value)}` },
              },
              dataLabels: {
                enabled: false,
                formatter: function (
                  val: string | number | number[],
                  opts: { seriesIndex: number },
                ) {
                  return val && opts.seriesIndex === 2 ? "Today" : "";
                },
                offsetY: -15,
                style: {
                  fontSize: "12px",
                  colors: ["#606C80BF"],
                },
                background: { enabled: false, dropShadow: { enabled: true } },
              },
            }}
            series={revenuesChartSeries}
            labels={revenuesDate}
          />
        </Box>
      </Box>

      <HistoryTable />
    </Box>
  );
};

export default DigitalSignage;
