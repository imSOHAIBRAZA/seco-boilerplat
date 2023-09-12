import React from "react";

export interface PropsT {
  value: string;
  filterValue?: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect?: (value: string[]) => void;
  options?: { value: string; label: string }[];
}

export type ComponentT = PropsT;

export type MouseEventT = React.MouseEvent<HTMLElement>;

export type AnchorEleT = null | HTMLElement;
