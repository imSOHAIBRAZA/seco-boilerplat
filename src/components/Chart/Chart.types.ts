import { ApexOptions } from "apexcharts";

export interface PropsT {
  // eslint-disable-next-line
  series: ApexAxisChartSeries;
  labels: string[];
  options?: ApexOptions;
  barRadius?: number;
  barWidth?: string;
  strokeWidth?: number | number[];
  tooltipShared?: boolean;
  customTooltip?: boolean;
  isLoading?: boolean;
}

export interface TooltipArgT {
  series: { [x: string]: { [x: string]: Array<string>[] } };
  seriesIndex: string | number;
  dataPointIndex: string | number;
  w: {
    globals: {
      categoryLabels: { [x: string]: Array<string>[] };
      seriesNames: { [x: string]: Array<string>[] };
    };
  };
}
