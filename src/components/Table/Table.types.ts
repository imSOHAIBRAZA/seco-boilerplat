import * as React from "react";

export interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  align?: "left" | "right" | "center";
  render?: (values: Record<string, any>, value: any) => React.ReactNode | string;
}

export type BodyCell = Record<string, string | number>;

export interface PropsT {
  headData: HeadCell[];
  data: any[];
  selected?: Record<string, any>[];
  setSelected?: React.Dispatch<any>;
  rowsPerPage: number;
  page: number;
  onRowsPerPageChange: (limit: number) => void;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  dataCount: number;
  isEmptyRows?: boolean;
  orderBy?: string;
  onSort?: (O: string) => void;
}

export type ComponentT = PropsT;
