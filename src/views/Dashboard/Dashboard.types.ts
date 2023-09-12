import * as React from "react";

export interface Card {
  title: string;
  message: string;
  icon: React.FC;
}
export interface CardPropsT {
  icon?: React.FC;
  label: string;
  tag: string;
  totalValue: number;
}

export interface UsersPropsT {
  count: number;
  heading: string;
  subHeading: string;
  isLoading?: boolean;
}

export interface RealTimePropsT {
  label: string;
  tag: string;
  totalValue: number;
  isLoading?: boolean;
}

export interface PredictivePropsT {
  title: string;
  heading: string;
  description: string;
  isLoading?: boolean;
}

export interface DigitalandMostPropsT {}

export interface MostViewCardPropsT {
  label: string;
  year: string;
  image: string;
  isLoading?: boolean;
}

export type CardComponentT = React.FC<CardPropsT>;
export type UsersDataComponent = React.FC<UsersPropsT>;
export type RealTimeDataComponent = React.FC<RealTimePropsT>;
export type PredictiveDataComponent = React.FC<PredictivePropsT>;
