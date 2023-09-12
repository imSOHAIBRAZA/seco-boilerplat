import { SxProps, Theme } from "@mui/material";

export const cardRoot: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: theme.spacing(55),
  borderRadius: theme.spacing(2),
  cursor: "pointer",
  gap: { md: 3, xs: 2 },
  p: { md: 3, xs: 1.5 },
});

export const cardRootActive: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: theme.spacing(55),
  borderRadius: theme.spacing(2),
  cursor: "pointer",
  gap: { md: 3, xs: 2 },
  p: { md: 3, xs: 1.5 },
  backgroundColor: "#F7F7F7",
  boxShadow: 1,
});

export const imgAndDetailWrapper: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: { md: 3, xs: 2 },
};

export const openButton: SxProps<Theme> = (theme) => ({
  borderRadius: theme.spacing(3),
  p: 0,
  borderWidth: 2
});

export const uninstallButton: SxProps<Theme> = (theme) => ({
  borderRadius: theme.spacing(3),
  borderWidth: 2,
  color:"#ff0000",
  border:"1px solid #ff0000"
});
export const installButton: SxProps<Theme> = (theme) => ({
  borderRadius: theme.spacing(3),
  borderWidth: 2,
});
export const imgWrapper: SxProps<Theme> = (theme) => ({
  height: { md: theme.spacing(12.5), xs: theme.spacing(8) },
  width: { md: theme.spacing(12.5), xs: theme.spacing(8) },
  position: "relative",
  overflow: "hidden",
});

export const cardImg: SxProps<Theme> = {
  position: "absolute",
  height: "100%",
  width: "100%",
  top: "50%",
  left: "50%",
  objectFit: "contain",
  objectPosition: "center",
  transform: "translate(-50%,-50%)",
  cursor: "pointer",
};
