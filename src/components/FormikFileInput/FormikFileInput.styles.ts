import { alpha, SxProps, Theme } from "@mui/material";

export const root: SxProps<Theme> = {
  textTransform: "none",
  width: "100%",
  px: 1,
};

export const closeIcon: SxProps<Theme> = (theme) => ({
  height: theme.spacing(1.25),
  width: theme.spacing(1.25),
  minWeight: theme.spacing(1.25),
  minWidth: theme.spacing(1.25),
  cursor: "pointer",
  color: "#FFF",
});

export const iconWrapper: SxProps<Theme> = (theme) => ({
  height: theme.spacing(2),
  width: theme.spacing(2),
  minWeight: theme.spacing(2),
  minWidth: theme.spacing(2),
  background: "#606C80",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
});

export const fileNameWrapper: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  gap: 0.5,
  background: alpha("#606C80", 0.2),
  borderRadius: "16px",
  px: 1,
  py: 0.5,
  width: "fit-content",
};

export const selectedWrapper: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 1,
  mt: 0.5,
};
