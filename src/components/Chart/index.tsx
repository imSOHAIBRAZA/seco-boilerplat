import * as React from "react";
import ApexChart from "react-apexcharts";
import { Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { initialUIConfig } from "../../lib";
import { PropsT, TooltipArgT } from "./Chart.types";
import "./Chart.styles.css";
import moment from "moment";
import _ from "lodash";


const Chart: React.FC<PropsT> = ({
  series,
  labels,
  options,
  barRadius = 10,
  barWidth = "50%",
  strokeWidth = 0,
  tooltipShared = true,
  customTooltip = false,
  isLoading,
}) => {
  const theme = useTheme();
  const screenDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const combinedOptions: ApexOptions = {
    fill: {
      opacity: 1,
    },
    grid: { padding: { left: 25, right: 25 } },
    chart: {
      stacked: false,
    },
    stroke: { curve: "smooth", width: strokeWidth },
    plotOptions: {
      bar: {
        columnWidth: barWidth,
        borderRadius: barRadius,
        dataLabels: {
          position: "top",
        },
      },
    },
    labels,
    markers: {
      size: 0,
    },
    xaxis: {
      labels: { formatter: (value) => moment(value).format("dddd") },
    },

    legend: { show: false },
    tooltip: {
      followCursor: true,
      enabled: true,
      shared: tooltipShared,
      intersect: false,
      custom: customTooltip ? CustomTooltip : undefined,
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 2,
            },
          },
        },
      },
    ],
    ...options,
  };
  return isLoading ? (
    <Skeleton sx={{ height: screenDownMd ? "275px" : "350px", transform: "scale(1)" }} />
  ) : (
    <ApexChart
      height={screenDownMd ? 275 : 350}
      options={combinedOptions}
      series={_.map(series, (value, index: number) => ({
        color: initialUIConfig.chartColor[index],
        ...value,
      }))}
    />
  );
};

const CustomTooltip = (val: TooltipArgT) => {
  return (
    val.series[val.seriesIndex][val.dataPointIndex] &&
    `<div class='custom_tooltip'>
              <div class='custom_tooltip_header' >${
                val.w.globals.categoryLabels[val.dataPointIndex]
              }</div>
              <div class='custom_tooltip_content_wrapper'> 
              <div class='custom_tooltip_indicator' style="background-color: ${
                initialUIConfig.chartColor[val.seriesIndex as number]
              }"></div>
              <div>${
                val.w.globals.seriesNames[val.seriesIndex]
              }:</div> <div class='custom_tooltip_selected_value'>${
      val.series[val.seriesIndex][val.dataPointIndex]
    }</div>
              </div>
          </div>
  `
  );
};

export default Chart;
