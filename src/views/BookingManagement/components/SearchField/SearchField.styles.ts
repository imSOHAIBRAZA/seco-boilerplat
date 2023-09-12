import { SxProps, Theme } from "@mui/material";

export const searchIcon: SxProps<Theme> = (theme) => ({
  height: theme.spacing(3),
  width: theme.spacing(3),
  minHeight: theme.spacing(3),
  minWidth: theme.spacing(3),
  marginLeft: "-2px",
  marginRight: theme.spacing(1),
  color: "primary.main",
  "& > svg": {
    width: "100%",
    height: "100%",
  },
});

export const filterIcon: SxProps<Theme> = (theme) => ({
  height: theme.spacing(3),
  width: theme.spacing(3),
  minHeight: theme.spacing(3),
  minWidth: theme.spacing(3),
  marginRight: "-2px",
  color: "#98A2B2",
  cursor: "pointer",
});

export const searchField: SxProps<Theme> = (theme) => ({
  width: "100%",
  maxWidth: { md: theme.spacing(30) },
  alignSelf: { md: "flex-start" },
  "& .MuiInput-input": {
    px: theme.spacing(1),
  },
});
