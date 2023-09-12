import { ButtonProps, SxProps, Theme } from "@mui/material";

export interface PropsT {
  children: string;
  icon: React.FC;
  onClick?: () => void;
  variant?: ButtonProps["variant"];
  disabled?: boolean;
  color?: ButtonProps["color"];
  sx?: SxProps<Theme>;
}
