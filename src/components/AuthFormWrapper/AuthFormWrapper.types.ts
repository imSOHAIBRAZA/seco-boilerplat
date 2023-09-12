import * as React from "react";

// types
export type ComponentT = {
  children: React.ReactNode;
  onSubmit: () => void;
  buttonLabel?: string;
  disabled?: boolean;
};
