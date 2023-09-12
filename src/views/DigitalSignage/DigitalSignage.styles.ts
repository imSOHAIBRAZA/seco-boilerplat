import { SxProps, Theme } from "@mui/material";

export const campaignContainer: SxProps<Theme> = (theme) => ({
  background: "#FFFFFF",
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  border: `1px solid ${theme.palette.common.white}`,
  py: { md: theme.spacing(4), xs: theme.spacing(3) },
  overflow: "hidden",
});

export const selectedStationTitle: SxProps<Theme> = () => ({
  color: "primary.900",
});

export const campaignTitle: SxProps<Theme> = () => ({
  fontWeight: 600,
  color: "primary.900",
  pl: { md: 4, xs: 3 },
});
export const adViewTitle: SxProps<Theme> = () => ({
  fontWeight: 600,
  color: "primary.900",
  height: "49px",
  pt: 1,
});

export const assetTitle: SxProps<Theme> = () => ({
  fontWeight: 600,
  color: "primary.900",
  pt: { md: 3, xs: 2 },
  pl: { md: 4, xs: 2 },
  pb: 2.25,
});

export const accordionContent: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: { md: 3, xs: 1 },
  width: "100%",
};

export const uploadBtn: SxProps<Theme> = (theme) => ({
  height: theme.spacing(4),
  textTransform: "capitalize",
  left: theme.spacing(0.5),
});

export const iconWrapper = (theme: Theme) => ({
  width: { md: theme.spacing(4.75), xs: theme.spacing(3.5) },
  height: { md: theme.spacing(4.75), xs: theme.spacing(3.5) },
  minWidth: { md: theme.spacing(4.75), xs: theme.spacing(3.5) },
  minHeight: { md: theme.spacing(4.75), xs: theme.spacing(3.5) },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.spacing(0.5),
  "& > *": {
    height: { md: theme.spacing(3), xs: theme.spacing(1.5) },
    width: { md: theme.spacing(3), xs: theme.spacing(1.5) },
    minHeight: { md: theme.spacing(3), xs: theme.spacing(1.5) },
    minWidth: { md: theme.spacing(3), xs: theme.spacing(1.5) },
  },
});

export const addIcon = (theme: Theme) => ({
  backgroundColor: theme.palette.primary[100],
  "& > *": {
    color: theme.palette.primary.main,
  },
});

export const closeIcon = (theme: Theme) => ({
  backgroundColor: theme.palette.error[100],
  "& > *": {
    color: theme.palette.error[500],
  },
});

export const buttonContainer: SxProps<Theme> = {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: { md: 2.5, xs: 1 },
};
export const expandedDetailWrapper: SxProps<Theme> = {
  display: "flex",
  flexDirection: { md: "row", xs: "column" },
  gap: 3,
};
export const line: SxProps<Theme> = (theme) => ({
  height: "auto",
  width: theme.spacing(8),
  minWidth: theme.spacing(8),
  position: "relative",
  "&::before": {
    content: "''",
    display: { md: "block", xs: "none" },
    height: "1px",
    background: "#CBCBCB",
    width: theme.spacing(6),
    position: "absolute",
    top: "50%",
    right: "-16px",
  },
  "&::after": {
    content: "''",
    display: "block",
    width: "1px",
    background: "#CBCBCB",
    height: { md: theme.spacing(6), xs: theme.spacing(4) },
    position: "absolute",
    bottom: { md: "calc(50% - 1px)", xs: "-10px" },
    right: "50%",
  },
});
export const avatar: SxProps<Theme> = (theme) => ({
  height: theme.spacing(8),
  width: theme.spacing(8),
  minHeight: theme.spacing(8),
  minWidth: theme.spacing(8),
});

export const fieldsContainer: SxProps<Theme> = () => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1.5fr",
  gap: 3,
  width: "100%",
});
export const fieldsContainer2: SxProps<Theme> = () => ({
  display: "grid",
  gridTemplateColumns: { md: "1fr 1fr 1.5fr", xs: "1fr" },
  gap: 3,
  width: "100%",
  pr: { md: 13.25 },
  "& > *:last-of-type": {
    width: { md: "66.66%" },
  },
});

export const advertiseContainer: SxProps<Theme> = () => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 3.5,
});

export const cardWrapper: SxProps<Theme> = (theme) => ({
  background: "#FFFFFF",
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  mt: 2,
  overflow: "hidden",
});

export const anlayticsContainer: SxProps<Theme> = () => ({
  display: "flex",
  padding: 4,
  flexWrap: "wrap",
  gap: { md: 8, xs: 4 },
});

export const chartBlock: SxProps<Theme> = () => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  flex: "1",
});
export const barChart: SxProps<Theme> = () => ({
  position: "relative",
  pt: 3,
});
export const chartBlockHeader: SxProps<Theme> = {
  display: "flex",
  gap: 2,
  alignItems: { md: "center", xs: "stretch" },
  justifyContent: "space-between",
};

export const viewsAnalysisChartWrapper: SxProps<Theme> = {
  width: "100%",
  px: { md: 4, xs: 2 },
  py: { md: 3, xs: 2 },
};

export const advertiseHeader: SxProps<Theme> = {
  display: "flex",
  flexDirection: { md: "row", xs: "column" },
  alignItems: { md: "center", xs: "flex-start" },
  justifyContent: "space-between",
  pl: { md: 4, xs: 2 },
  pr: { md: 3.5, xs: 2 },
  pt: { md: 3, xs: 2 },
  mb: 1.5,
};

export const vendoreHeader: SxProps<Theme> = {
  display: "flex",
  flexDirection: { md: "row", xs: "column" },
  gap: 2,
  alignItems: { md: "center", xs: "stretch" },
  justifyContent: "space-between",
  pl: { md: 4, xs: 2 },
  pr: { md: 3.5, xs: 2 },
  pt: { md: 3, xs: 2 },
  mb: 1.5,
};

export const fieldsWrapper: SxProps = {
  px: { md: 4, xs: 2 },
  display: "flex",
  alignItems: "center",
  gap: 2.5,
  flexDirection: { sm: "row", xs: "column" },
  "& > *": { width: { sm: "233px", xs: "100%" } },
};

export const fieldsWrapper2: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: 2.5,
  flexDirection: { sm: "row", xs: "column" },
  "& > *": { width: { sm: "233px", xs: "100%" } },
};

export const pieChartAndDataWrapper: SxProps<Theme> = () => ({
  display: "flex",
  alignItems: "stretch",
  justifyContent: "center",
  width: { xl: "75%", lg: "80%", xs: "100%" },
  marginX: "auto",
  position: "relative",
  flexDirection: { md: "row", xs: "column" },
  p: { md: 4, xs: 2 },
  gap: { md: 8, xs: 4 },
  flexWrap: "wrap",
  "& > div:first-child": { flex: 1, minWidth: "220px", width: "100%" },
  "& > div:last-child": { flex: 1, minWidth: "220px", width: "100%" },
});
export const vendorTableContianer: SxProps<Theme> = (theme) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  "&::before": {
    content: "''",
    background: "#F0F0F0",
    width: { xs: "0", md: "2px" },
    height: { md: "100%", xs: "0" },
    top: { md: "50%", xs: theme.spacing(-2) },
    left: { md: theme.spacing(-6), xs: "50%" },
    transform: { md: "translateY(-50%)", xs: "translateX(-50%)" },
    position: "absolute",
  },
});

export const buttonsContainer: SxProps<Theme> = {
  display: "flex",
  gap: 2,
  px: { md: 4, xs: 2 },
  mt: 2,
};

export const signaturePieChartWrapper: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: { md: "row", xs: "column" },
  position: "relative",
  "&::before": {
    content: "''",
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    display: "block",
    width: { xs: "100%", md: "1px" },
    height: { xs: "1px", md: "100%" },
    left: { md: "calc(100% + 32px)", xs: "50%" },
    top: { md: "50%", xs: "calc(100% + 16px)" },
    transform: { md: "translateY(-50%)", xs: "translateX(-50%)" },
  },
});

export const dataViewTabs: SxProps<Theme> = (theme) => ({
  width: "fit-content",
  border:  `1px solid ${theme.palette.common.white}`,
  borderRadius: "12px",
  p: 0.5,
  "& .MuiTab-root": {
    margin: 0,
    px: "24px",
    fontSize: "16px",
    fontWeight: 500,
    color: "primary.900",
    py: 0,
    height: "42px",
    minHeight: "42px",
  },
  "& .Mui-selected": {
    color: "#FFF",
    backgroundColor: "primary.main",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 500,
  },
  "& .MuiTabs-indicator": { background: "none" },
});
