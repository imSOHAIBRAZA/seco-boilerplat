import { SxProps, Theme } from "@mui/material";

export const containerRoot: SxProps<Theme> = {
  width: "100%",
  hieght: "100vh",
  backgroundColor: "#F7F8FA",
  display: "flex",
  flexDirection: "row",
};

export const leftSidebar: SxProps<Theme> = (theme) => ({
  width: { md: theme.spacing(26.5), xs: theme.spacing(10) },
  pt: theme.spacing(4.5),
  pb: theme.spacing(7),
  borderRight: `1px solid ${theme.palette.common.white}`,
  boxShadow: "2px 4px 12px rgba(96, 108, 128, 0.12)",
  backgroundColor: "#FFF",
  height: "100vh",
  overflow: "auto",
});

export const contentWrapper: SxProps<Theme> = (theme) => ({
  height: "100vh",
  overflowX: "hidden",
  overflowY: "auto",
  width: {
    md: `calc(100% - ${theme.spacing(26.5)})`,
    xs: `calc(100% - ${theme.spacing(10)})`,
  },
  px: { md: theme.spacing(5), sm: theme.spacing(3), xs: theme.spacing(1) },
  pt: theme.spacing(2),
  pb: theme.spacing(9),
});

export const tabContainer: SxProps<Theme> = () => ({
  flex: 1,
});

export const contentHeaderWrapper: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  marginBottom: 3.5,
  borderBottom: `2px solid ${theme.palette.common.white}`,
});

export const contentHeaderIconWrapper: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  color: "#98A2B2",
});

export const contentHeaderIcon = (theme: Theme) => ({
  height: theme.spacing(3),
  width: theme.spacing(3),
  cursor: "pointer",
});

export const sideBarLogo: SxProps<Theme> = (theme) => ({
  width: { md: theme.spacing(13.375), xs: theme.spacing(7.5) },
  marginBottom: theme.spacing(3.5),
  marginX: { md: theme.spacing(5), xs: "auto" },
  display: "block",
});

export const sideBavNavWrapper: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.25),
});

export const sideBarNavItem: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: { md: 2, xs: 0.5 },
  px: { md: 3, xs: 1 },
  flexDirection: { md: "row", xs: "column" },
  cursor: "pointer",
  minHeight: "30px",
  filter: `brightness(0)`,
};

export const navIcon: SxProps<Theme> = (theme) => ({
  height: { md: theme.spacing(3), xs: theme.spacing(2.5) },
  width: { md: theme.spacing(3), xs: theme.spacing(2.5) },
  minHeight: { md: theme.spacing(3), xs: theme.spacing(2.5) },
  minWidth: { md: theme.spacing(3), xs: theme.spacing(2.5) },
  "& > svg": {
    height: "100%",
    width: "100%",
  },
});

export const navLabel: SxProps<Theme> = {
  lineHeight: "15px",
  fontSize: { md: "12px", xs: "10px" },
  textAlign: { md: "left", xs: "center" },
};

export const headerTitle: SxProps<Theme> = (theme) => ({
  fontWeight: 600,
  color: "primary.800",
  lineHeight: theme.spacing(2.75),
  position: "relative",
  "&::after": {
    content: "''",
    display: "block",
    width: "100%",
    height: "2px",
    backgroundColor: "primary.800",
    position: "absolute",
    bottom: `calc(${theme.spacing(-2)} - 2px)`,
    left: 0,
    borderRadius: "10px",
  },
});

export const childWrapper: SxProps<Theme> = (theme) => ({
  border: { md: `1px solid ${theme.palette.common.white}`, xs: "none" },
  backgroundColor: { sm: "#FFFFFF", xs: "transparent" },
  borderRadius: theme.spacing(1.5),
  boxShadow: { sm: "0px 8px 12px rgba(67, 73, 79, 0.12)", xs: "none" },
  p: { sm: theme.spacing(3), xs: 0 },
  minHeight: `calc(100vh - ${theme.spacing(21.25)})`,
});
