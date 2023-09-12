import { SxProps, Theme } from "@mui/material";

export const rootContentWrapper: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(3.5),
});

export const tableWrapper: SxProps<Theme> = (theme) => ({
  background: "#FFFFFF",
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
});

export const cardWrapper: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { lg: "repeat(3,1fr)", md: "repeat(2,1fr)", xs: "1fr" },
  rowGap: 1.5,
  columnGap: 2.25,
};

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

export const title: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontSize: { xs: 12, sm: 14 },
});

export const tag: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontSize: { xs: 12, sm: 14 },
  fontWeight: 600,
  lineHeight: "15.4px",
  display: "flex",
  justifyContent: "space-between",
});

export const valueWrapper: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontSize: { xs: 20, sm: 24 },
  fontWeight: 600,
  lineHeight: 1,
  display: "flex",
  alignItems: "flex-end",
  gap: "2px",
});

export const temperatureCard: SxProps<Theme> = (theme) => ({
  background: " #FFFFFF",
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  p: { md: 4, xs: 2 },
  width: "100%",
  display: "flex",
  alignItems: "stretch",
  flexDirection: { md: "row", xs: "column" },
  gap: { md: 8, xs: 4 },
  flex: 1,
});

export const moduleTemperature: SxProps<Theme> = (theme) => ({
  p: 2,
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  flex: 1,
  gap: 2,
  flexWrap: "wrap",
});
export const inputTemperature: SxProps<Theme> = (theme) => ({
  p: 2,
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  flex: 1,
  gap: 2,
  flexWrap: "wrap",
  minWidth: "280px",
});

export const noWarningCard: SxProps<Theme> = (theme) => ({
  borderRadius: theme.spacing(1),
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  alignItems: "flex-start",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  minWidth: "320px",
  flex: 1,
});

export const warningCard: SxProps<Theme> = (theme) => ({
  borderWidth: "1px 3px 1px 1px",
  borderStyle: "solid",
  borderColor: theme.palette.warning[500],
  borderRadius: theme.spacing(1),
  px: { md: 2.5, xs: 2 },
  py: { md: 3, xs: 2 },
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
  alignItems: "flex-start",
  background: "#FCF9F5",
  minWidth: "320px",
  flex: 1,
});

export const warningIconWrapper: SxProps<Theme> = (theme) => ({
  height: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  width: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  minHeight: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  minWidth: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  background: theme.palette.warning[500],
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& > svg": {
    height: { md: theme.spacing(3), xs: theme.spacing(1.75) },
    width: { md: theme.spacing(3), xs: theme.spacing(1.75) },
    color: "white",
  },
});

export const warningCardHeader: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
};

export const emptyBoxesWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: 2.5,
  mt: 1.5,
  width: "100%",
  "& > div": {
    backgroundColor: "#EDF1F7",
    borderRadius: "12px",
    width: "100%",
    height: "127px",
  },
};

export const cardTitle: SxProps<Theme> = () => ({
  fontWeight: 600,
  color: "primary.900",
  pt: { md: 3, xs: 2 },
  pl: { md: 4, xs: 2 },
  pb: 2.25,
});

export const historyCardWrapper: SxProps<Theme> = (theme) => ({
  background: "#FFFFFF",
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
});

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
export const adViewTitle: SxProps<Theme> = () => ({
  fontWeight: 600,
  color: "primary.900",
  height: "49px",
  pt: 1,
});

export const viewsAnalysisChartWrapper: SxProps<Theme> = {
  width: "100%",
  px: { md: 4, xs: 2 },
  py: { md: 3, xs: 2 },
};
