import React from "react";

export interface CardPropsT {
  label: string;
  tag?: string;
  totalValue?: number | string;
  valueSuffix?: string;
  valuePrefix?: string;
  valueUnit?: string;
  id?: string | number;
  icon?: React.FC;
  isLoading?: boolean;
}
