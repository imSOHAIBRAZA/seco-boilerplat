import { SxProps, Theme, alpha } from "@mui/material";

export const buttonsWrapper: SxProps<Theme> = {
  display: "flex",
  alignSelf: "flex-start",
  alignItems: "center",
  flexWrap: "wrap",
  flexDirection: "row",
  gap: 1,
};

export const rootContentWrapper: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(3.5),
});

export const rootTableWrapper: SxProps<Theme> = (theme) => ({
  background: "#FFFFFF",
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
});

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
export const tableBorderlessWrapper: SxProps = {
  overflow: "auto",
  "& > .MuiBox-root > .MuiPaper-root  ": {
    marginBottom: 0,
    borderRadius: 0,
    border: "0px !important",
  },
};

export const errorIndicator = {
  height: "6px",
  width: "6px",
  minHeight: "6px",
  minWidth: "6px",
  borderRadius: "50%",
  backgroundColor: "error.main",
  display: "inline-block",
};

export const successIndicator = {
  height: "6px",
  width: "6px",
  minHeight: "6px",
  minWidth: "6px",
  borderRadius: "50%",
  backgroundColor: "success.main",
  display: "inline-block",
};

export const warningIndicator = {
  height: "6px",
  width: "6px",
  minHeight: "6px",
  minWidth: "6px",
  borderRadius: "50%",
  backgroundColor: "warning.main",
  display: "inline-block",
};

export const footerRoot: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  minHeight: theme.spacing(6),
  px: theme.spacing(4),
  py: theme.spacing(1.5),
  background: alpha("#FFF", 0.75),
});

export const footerText: SxProps<Theme> = {
  color: "primary.main",
  fontWeight: 500,
  textAlign: "center",
};
