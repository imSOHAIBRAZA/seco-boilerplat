import * as React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Skeleton } from "@mui/material";
import { initialUIConfig } from "../../lib";

import * as types from "./PieChart.types";
import "./PieChart.styles.css";

const PieChart: React.FC<types.PropsT> = ({ labels, series, isLoading }: types.PropsT) => {
  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    grid: {
      padding: {
        bottom: 30,
      },
    },
    legend: {
      position: "bottom",
      floating: true,
      horizontalAlign: "center",
      fontSize: "12px",
      fontWeight: 500,
    },
    dataLabels: { style: { fontSize: "10px" } },
    colors: initialUIConfig.chartColor,
    labels,
  };

  return isLoading ? (
    <Skeleton sx={{ height: "100%", transform: "scale(1)" }} />
  ) : (
    <div className='pie_chart_wrapper'>
      <Chart height='auto' options={options} series={series} type='donut' />
    </div>
  );
};

export default PieChart;
