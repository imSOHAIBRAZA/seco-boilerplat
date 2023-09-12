import { alpha, SxProps, Theme } from "@mui/material";

export const root = {
  backdropFilter: "blur(4px)",
  "& .MuiDialog-paper": {
    margin: "16px",
    width: { xs: "100%", sm: "432px" },
    borderRadius: "16px !important",
  },
  "& .css-mkuhab-MuiPaper-root-MuiDialog-paper": {
    backgroundColor: "transparent !important",
    borderRadius: "16px !important",
    overflowX: "hidden",
  },
};

export const modalWrapper = {
  backgroundColor: "#fff",
  borderRadius: "16px",
  p: 0,
  display: "flex",
  flexDirection: "column",
};

export const closeIcon: SxProps<Theme> = (theme) => ({
  cursor: "pointer",
  height: theme.spacing(2.5),
  width: theme.spacing(2.5),
  color: "grey.900",
  position: "absolute",
  top: "50%",
  right: theme.spacing(1.5),
  transform: "translateY(-50%)",
});

export const headerWrapper: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#E5E9EF",
  py: 1.5,
  px: 2.5,
};

export const contentWrapper: SxProps<Theme> = {
  px: 2.5,
  pt: "16px !important",
  pb: 3,
};

export const title: SxProps<Theme> = {
  fontWeight: 600,
  lineHeight: "18px",
  color: "primary.800",
};

export const formWrapper: SxProps<Theme> = (theme) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: theme.spacing(3),
  pt: theme.spacing(3),
});

export const dialogTitle: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "#E5E9EF",
  py: 1.5,
  px: 2.5,
  fontSize: "16px",
  fontWeight: 600,
  color: "primary.800",
  lineHeight: "18px",
  position: "relative",
};
export const dailogAction: SxProps<Theme> = {
  justifyContent: "center",
  pb: 4,
  "& button": { minWidth: "100px" },
};
export const contentText: SxProps = {
  fontSize: "14px",
  lineHeight: "17px",
  fontWeight: 500,
  color: "grey.900",
};

export const iconWrapper: SxProps<Theme> = (theme) => ({
  height: theme.spacing(6.75),
  width: theme.spacing(6.75),
  minHeight: theme.spacing(6.75),
  minWidth: theme.spacing(6.75),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  backgroundColor: alpha(theme.palette.error[500] as string, 0.16),
  marginBottom: theme.spacing(2),
  marginLeft: "auto",
  marginRight: "auto",
  "& *": {
    color: theme.palette.error[500],
    height: theme.spacing(3.5),
    width: theme.spacing(3.5),
  },
});
