import { SxProps, Theme, alpha } from "@mui/material";

export const containerRoot: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: { sm: "flex-start", xs: "center" },
  overflow: "hidden",
  minHeight: "100vh",
  backgroundSize: "cover",
  px: { sm: 10, xs: 2 },
};

export const navWrapper: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 3,
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
};
