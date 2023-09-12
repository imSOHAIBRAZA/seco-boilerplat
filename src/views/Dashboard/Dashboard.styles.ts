import { SxProps, Theme } from "@mui/material";

export const rootContentWrapper: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing(3.5),
});

export const cardBox: SxProps<Theme> = (theme) => ({
  borderRadius: theme.spacing(1),
  backgroundColor: "#0071C5",
  boxShadow: "1px 1px 1px #F2F2F2",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 3,
  width: "100%",
  color: theme.palette.primary.contrastText,
});

export const digitCardBox: SxProps<Theme> = (theme) => ({
  borderRadius: theme.spacing(1),
  backgroundColor: "#0071C5",
  boxShadow: "1px 1px 1px #F2F2F2",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: 3,
  width: "100%",
  color: theme.palette.primary.contrastText,
});

export const iconStyle: SxProps<Theme> = (theme) => ({
  mr: 1.5,
  color: "#FFF",
  height: theme.spacing(4),
  width: theme.spacing(4),
});

export const cardWrapper: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { lg: "repeat(3,1fr)", md: "repeat(2,1fr)", xs: "1fr" },
  rowGap: 1.5,
  columnGap: 2.25,
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

export const number: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontSize: { xs: 20, sm: 24 },
  fontWeight: 600,
  lineHeight: "26.4px",
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

export const ChartandMapBox: SxProps<Theme> = (theme) => ({
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.primary.contrastText,
  boxShadow: "2px 2px 2px #F4F4F4F4",
  padding: 3,
  height: "400px",
  width: "100%",
  color: theme.palette.common.black,
  mb: 3,
  mt: 3,
});

export const cardWrapper3: SxProps<Theme> = (theme) => ({
  display: "grid",
  gridTemplateColumns: { lg: "repeat(1,1fr)", md: "repeat(1,1fr)", xs: "1fr" },
  gap: 2,
  background: theme.palette.primary.contrastText,
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  "& > *": {
    p: theme.spacing(4),
  },
});

export const EnvandUserBox: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.primary.contrastText,
  boxShadow: "12% #43494F",
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.common.white}`,
  width: "100%",
  color: theme.palette.common.black,
  padding: { md: 4, xs: 2 },
  display: "flex",
  flexDirection: { md: "row", xs: "column" },
  gap: 4,
});

export const LeftCard: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { lg: "repeat(1,1fr)", md: "repeat(1,1fr)", xs: "1fr" },
  gap: 2,
  flex: 1,
};

export const RightCard: SxProps<Theme> = {
  display: "grid",
  gridTemplateRows: { lg: "1fr 2fr", md: "1fr 2fr", xs: "1fr" },
  flex: 1,
};

export const envTitle: SxProps<Theme> = (theme) => ( {
  color: theme.palette.primary[900],
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "19.43.4px",
  mb: 1,
});

export const envCardBox: SxProps<Theme> = (theme) => ({
  border: `1px solid ${theme.palette.common.white}`,
  borderRadius: theme.spacing(2),
  padding: 3,
  width: "100%",
});

export const envCount: SxProps<Theme> = {
  fontWeight: 700,
  color: "#005A9E",
  fontSize: "28px",
  lineHeight: "30.8px",
  mb: 1,
};

export const envHeading: SxProps<Theme> = {
  color: "#747474",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "19.43px",
  mb: 1,
};
export const envSubHeading: SxProps<Theme> = {
  color: "#606C80",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.12px",
};

export const UsersDataStyle: SxProps<Theme> = () => ({
  mb: 1,
});

export const UserDataCardStyle: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { lg: "repeat(3,1fr)", md: "repeat(2,1fr)", xs: "1fr" },
  gap: 4,
};

export const userCardBox: SxProps<Theme> = (theme) => ({
  border: `1px solid ${theme.palette.common.white}`,
  borderRadius: theme.spacing(2),
  padding: 3,
  width: "100%",
});
export const userCount: SxProps<Theme> = {
  fontWeight: 700,
  color: "#005A9E",
  fontSize: "28px",
  lineHeight: "30.8px",
  mb: 1,
};

export const userHeading: SxProps<Theme> = {
  color: "#747474",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "19.43px",
  mb: 1,
};
export const userSubHeading: SxProps<Theme> = {
  color: "#606C80",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "13.12px",
};

export const realTimeCardStyle: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: theme.spacing(1),
  boxShadow: "3px 3px 3px #F4F4F4F4",
  color: theme.palette.primary.contrastText,
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
});

export const realTitle: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "19.43px",
});

export const realTag: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 600,
  fontSize: { xs: 20, sm: 28 },
  lineHeight: "30.8px",
  display: "flex",
  justifyContent: "space-between",
  mb: 3,
});

export const timeTitle: SxProps<Theme> = {
  mt: 2,
  ml: 2,
  mb: 4,
};

export const realNumber: SxProps<Theme> = (theme) => ({
  borderRadius: "5px",
  color: theme.palette.primary.contrastText,
  fontWeight: 700,
  fontSize: "32px",
  lineHeight: "35.2px",
  backgroundColor: "rgba(255, 255, 255, 0.12)",
  padding: 2,
  ml: "auto",
  mt: "auto",
  mb: "auto",
  mr: 1,
});

export const realNumberC: SxProps<Theme> = (theme) => ({
  borderRadius: "5px",
  color: theme.palette.primary.contrastText,
  fontWeight: 700,
  fontSize: "32px",
  lineHeight: "35.2px",
  backgroundColor: "rgba(255, 255, 255, 0.12)",
  p: 0.5,
  mb: 3,
  textAlign: "center",
});

export const PredictiveCardStyle: SxProps<Theme> = (theme) => ({
  backgroundColor: "#DEF0FC",
  borderRadius: theme.spacing(2),
  padding: 2,
  color: theme.palette.primary.contrastText,
  position: "relative",
  top: "-16px",
  height: "calc(100% + 8px)",
});

export const predictiveTitle: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary[900],
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "19.43px",
  mb: 4,
});
export const predictivetHeading: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary[900],
  fontWeight: 600,
  fontSize: "24px",
  lineHeight: "26.4px",
  mb: 6,
});
export const predictiveDescrip: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary[900],
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "18.48px",
  mb: 4,
});
export const predictiveDescrip2: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary[900],
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "18.48px",
});

export const cardWrapper4: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { lg: "repeat(1,1fr)", md: "repeat(1,1fr)", xs: "1fr" },
  gap: 2,
};

export const dotBox: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  gap: 2,
  justifyContent: "space-between",
};
export const dotContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 2,
  justifyContent: "flex-end",
};
export const dotWrapper: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItem: "center",
};

export const blueDot: SxProps<Theme> = {
  height: "12px",
  width: "12px",
  backgroundColor: "#11B0EF",
  borderRadius: "50%",
  marginRight: "8px",
  marginTop: "4px",
};

export const orangeDot: SxProps<Theme> = (theme) => ( {
  height: "12px",
  width: "12px",
  backgroundColor: theme.palette.warning[500],
  borderRadius: "50%",
  marginRight: "8px",
  marginTop: "4px",
});
export const purpleDot: SxProps<Theme> = {
  height: "12px",
  width: "12px",
  backgroundColor: "#C51BC9",
  borderRadius: "50%",
  marginRight: "8px",
  marginTop: "4px",
};
export const brownDot: SxProps<Theme> = {
  height: "12px",
  width: "12px",
  backgroundColor: "#8A1700",
  borderRadius: "50%",
  marginRight: "8px",
  marginTop: "4px",
};
export const cardWrapper5: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.primary.contrastText,
  boxShadow: "12% #43494F",
  borderRadius: theme.spacing(1),
  overflow: "hidden",
  border: `1px solid ${theme.palette.common.white}`,
  width: "100%",
  color: theme.palette.common.black,
  mb: 0,
  display: "grid",
  gridTemplateColumns: { lg: "repeat(1,1fr)", md: "repeat(1,1fr)", xs: "1fr" },
  gap: 2,
});

export const DigitalandMostDataBox: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.primary.contrastText,
  boxShadow: "12% #43494F",
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.common.white}`,
  width: "100%",
  color: theme.palette.common.black,
  display: "flex",
  flexDirection: "column",
  gap: 4,
  p: { md: 4, xs: 2 },
});

export const digitalBox: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { lg: "repeat(3,1fr)", md: "repeat(2,1fr)", xs: "1fr" },
  gap: 2,
};

export const mostViewBox: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { lg: "repeat(4,1fr)", md: "repeat(3,1fr)", sm: "repeat(2,1fr)", xs: "1fr" },
  gap: 2,
};

export const digitalTitle: SxProps<Theme> = {
  color: "primary.900",
  fontWeight: 600,
  mb: 1,
};

export const mostViewTitle: SxProps<Theme> = {
  color: "primary.900",
  fontWeight: 600,
  mb: 1,
};

export const mostViewCard: SxProps<Theme> = (theme) => ({
  borderRadius: theme.spacing(1),
  backgroundColor: "#FFFFF",
  boxShadow: "1px 1px 1px #F2F2F2",
  border: `1px solid ${theme.palette.common.white}`,
  width: "100%",
  overflow: "hidden",
});

export const mostViewDataStyle: SxProps<Theme> = () => ({
  width: "100%",
  p: 2.5,
});

export const mostViewCardText: SxProps<Theme> = (theme) => ( {
  color: theme.palette.primary[900],
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "17.6px",
  mb: 1,
});
export const mostViewCardText1: SxProps<Theme> = () => ({
  borderRadius: "3px",
  color: "#005A9E",
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: "13.2px",
  backgroundColor: "#E5E9EF",
  padding: "4px",
  width: "min-content",
  whiteSpace: "nowrap",
});

export const mapContainer = {
  display: "flex",
  flexDirection: "column",
  gap: 3.5,
};

export const mapWrapper: SxProps<Theme> = (theme) => ({
  minHeight: theme.spacing(35),
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
  width: "100%",
  height: { md: "-webkit-fill-available", xs: theme.spacing(35) },
});

export const piechartHeading: SxProps<Theme> = (theme) => ({
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "19.43px",
  color: theme.palette.primary[900],
  mb: 4,
});
export const mapHeading: SxProps<Theme> = (theme) => ({
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "19.43px",
  color: theme.palette.primary[900],
});
