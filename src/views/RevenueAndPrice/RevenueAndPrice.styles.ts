import { SxProps, Theme } from "@mui/material";

export const campaignContainer: SxProps<Theme> = (theme) => ({
  background: "#FFFFFF",
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  border: `1px solid ${theme.palette.common.white}`,
  pt: { md: theme.spacing(4), xs: theme.spacing(3) },
  pb: { md: theme.spacing(4), xs: theme.spacing(3) },
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
  gridTemplateColumns: { md: "1fr repeat(2,.8fr) repeat(2, 1.2fr)", xs: "1fr" },
  gap: 3,
  width: "100%",
});
export const fieldsContainerPromo: SxProps<Theme> = () => ({
  display: "grid",
  gridTemplateColumns: { md: "1fr repeat(3,.8fr) repeat(2, 1.2fr)", xs: "1fr" },
  gap: 3,
  width: "100%",
});
export const fieldsContainer2: SxProps<Theme> = () => ({
  display: "grid",
  gridTemplateColumns: { md: "1fr 1fr 1.5fr", xs: "1fr" },
  gap: 3,
  width: "100%",
  pr: { md: 20.75 },
  "& > *:last-of-type": {
    width: { md: "66.66%" },
  },
});
export const fieldsContainer3: SxProps<Theme> = () => ({
  display: "grid",
  gridTemplateColumns: { md: "repeat(4, 1fr)", xs: "1fr" },
  gap: 3,
  width: "100%",
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
  overflow: "hidden",
});

export const cardWrapper4: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { lg: "repeat(3,1fr)", md: "repeat(2,1fr)", xs: "1fr" },
  rowGap: 1.5,
  columnGap: 2.25,
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

export const vendorTableContianer: SxProps<Theme> = (theme) => ({
  position: "relative",
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

export const saveRecordBtnWrapper: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: 3.5,
  px: { md: 3.5, xs: 2 },
  borderTop: `1px solid ${theme.palette.common.white}`,
  "& button": {
    minWidth: { md: "250px", xs: "100%" },
    textTransform: "none",
    "& svg": {
      mr: 1,
      color: "#FFF",
      height: theme.spacing(2.5),
      width: theme.spacing(2.5),
    },
  },
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

export const tag: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontSize: { xs: 12, sm: 14 },
  fontWeight: 600,
  lineHeight: "15.4px",
  display: "flex",
  justifyContent: "space-between",
});

export const cardWrapper2: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { md: "repeat(2,1fr)", xs: "1fr" },
  rowGap: 1.5,
  columnGap: 2.25,
};

export const historyCardWrapper: SxProps<Theme> = (theme) => ({
  background: "#FFFFFF",
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
});

export const cardTitle: SxProps<Theme> = () => ({
  fontWeight: 600,
  color: "primary.900",
  pt: { md: 3, xs: 2 },
  pl: { md: 4, xs: 2 },
  pb: 2.25,
});

export const warningCard: SxProps<Theme> = (theme) => ({
  borderWidth: "1px 3px 1px 1px",
  borderStyle: "solid",
  borderColor: "#CDDAE4",
  borderRadius: theme.spacing(1),
  px: { md: 2.5, xs: 2 },
  py: { md: 3, xs: 2 },
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
  alignItems: "flex-start",
  alignSelf: "center",
});

export const warningIconWrapper: SxProps<Theme> = (theme) => ({
  height: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  width: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  minHeight: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  minWidth: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  background: theme.palette.primary.main,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& > svg": {
    height: { md: theme.spacing(4), xs: theme.spacing(1.75) },
    width: { md: theme.spacing(4), xs: theme.spacing(1.75) },
    color: "white",
  },
});

export const warningCardHeader: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
};

export const iconStyle: SxProps<Theme> = (theme) => ({
  color: "#FFF",
  height: theme.spacing(4),
  width: theme.spacing(4),
});

export const labelText: SxProps = () => ({
  fontSize:  { md: "14px", xs: "12px" },
  fontWeight: 600
});

