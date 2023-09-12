import { SxProps, Theme } from "@mui/material";

export const buttonsWrapper: SxProps<Theme> = {
  display: "flex",
  alignSelf: "flex-start",
  alignItems: "center",
  flexWrap: "wrap",
  flexDirection: "row",
  gap: 1,
};

export const headerWrapper: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: { lg: "row", xs: "column" },
  gap: 1.5,
};

export const appDescription: SxProps<Theme> = {
  mb: 4,
};

export const tableWrapper: SxProps<Theme> = {
  width: "100%",
  pt: 4,
};
