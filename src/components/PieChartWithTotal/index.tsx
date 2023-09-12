import * as React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Skeleton, useTheme } from "@mui/material";
import _ from "lodash";

import * as types from "./PieChart.types";
import "./PieChart.styles.css";

const PieChart: React.FC<{ value: types.PieChartValue[]; isLoading?: boolean }> = ({
  value,
  isLoading,
}) => {
  const theme = useTheme();

  const [series, setSeries] = React.useState<number[]>([]);
  const [labels, setLabels] = React.useState<string[]>([]);
  const colorPalette = ["#11B0EF", "#FF9500", "#8A1700", "#C51BC9"];

  React.useEffect(() => {
    setSeries(_.map(value, ({ series }) => series));
    setLabels(_.map(value, ({ label }) => label));
  }, [value]);

  const donutOptions: ApexOptions = {
    plotOptions: {
      pie: {
        customScale: 1,
        startAngle: 0,
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 28,
              formatter: () => "Minutes this week",
            },
            value: {
              show: true,
              fontSize: "48px",
              fontWeight: 700,
              color: "#475366",
              offsetY: -15,
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: "12px",
              color: "#475366",
              fontFamily: "Inter",
              fontWeight: 400,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: colorPalette,
    series: [21, 23, 19, 14, 6],
    labels,
    legend: {
      fontSize: "14px",
      fontWeight: 600,
      position: "right",
      offsetY: -20,
      formatter: function (
        val: string,
        opts: { seriesIndex: number; w: { globals: { series: number[] } } },
      ): string {
        return `&nbsp;&nbsp;${val} <span class='chart_legend_sub_label'>${
          opts?.w?.globals?.series[opts?.seriesIndex]
        } min</span>`;
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  name: {
                    offsetY: 18,
                  },
                  value: { fontSize: "36px" },
                },
              },
            },
          },
          legend: {
            position: "bottom",
            horizontalAlign: "center",
            offsetY: 0,
          },
        },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: { fontSize: "28px" },
                },
              },
            },
          },
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  value: { fontSize: "24px" },
                },
              },
            },
          },
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  name: {
                    offsetY: 50,
                  },
                  value: { offsetY: -5 },
                },
              },
            },
          },
        },
      },
    ],
  };

  return isLoading ? (
    <Skeleton sx={{ height: "100%", transform: "scale(1)" }} />
  ) : (
    <div className='pie_chart_wrapper'>
      <Chart height='auto' options={donutOptions} series={series} type='donut' />
    </div>
  );
};

export default PieChart;
