import { SxProps, Theme } from "@mui/material";

export const cardBox: SxProps<Theme> = (theme) => ({
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  boxShadow: "1px 1px 1px #F2F2F2",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 3,
  width: "100%",
  color: theme.palette.primary.contrastText,
});

export const cardBoxInner: SxProps<Theme> = {
  width: "100%",
  alignItems: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

export const cardBoxInner2: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
};

export const valueWrapper: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontSize: { xs: 20, sm: 24 },
  fontWeight: 600,
  lineHeight: 1,
  display: "flex",
  alignItems: "flex-end",
  gap: "2px",
});

export const tag: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontSize: { xs: 12, sm: 14 },
  fontWeight: 600,
  lineHeight: "15.4px",
  display: "flex",
  justifyContent: "space-between",
});

export const iconWrapper: SxProps<Theme> = (theme) => ({
  mr: 1.5,
  alignSelf: "center",
  height: theme.spacing(4),
  width: theme.spacing(4),
  minHeight: theme.spacing(4),
  minWidth: theme.spacing(4),
  "& > *": {
    color: "#FFF",
    height: theme.spacing(4),
    width: theme.spacing(4),
    minHeight: theme.spacing(4),
    minWidth: theme.spacing(4),
  },
});

export const title: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontSize: { xs: 12, sm: 14 },
});
