import * as React from "react";
import { UserType } from "./user";

export type Tab = {
  route: string;
  label: string;
  element: React.FC;
  description?: string;
}

export type NavItem = {
  key: string;
  label: string;
  route: string;
  icon: React.FC;
  sidebar_icon?: string;
  static: boolean;
  hasAccess: UserType[];
  tabs: Tab[]
};

