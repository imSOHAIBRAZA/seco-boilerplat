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

export const cardsWrapper: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: {
    xl: "repeat(4, 1fr)",
    lg: "repeat(3, 1fr)",
    md: "repeat(2, 1fr)",
    sm: "repeat(2, 1fr)",
    xs: "1fr",
  },
  gap: 4,
  pb: 4,
};
