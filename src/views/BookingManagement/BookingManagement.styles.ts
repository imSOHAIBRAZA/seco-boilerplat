import { SxProps, Theme } from "@mui/material";

export const card: SxProps<Theme> = (theme) => ({
  background: "#FFFFFF",
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  p: { md: 4, xs: 2 },
  width: "100%",
  display: "flex",
  alignItems: "stretch",
  flexDirection: { md: "row", xs: "column" },
  gap: { md: 8, xs: 4 },
  "& > div": {
    flex: 1,
    position: "relative",
  },
  "& > div:first-of-type": {
    overflow: "hidden",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",

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
  },
});

export const warningCard: SxProps<Theme> = (theme) => ({
  borderWidth: "1px 3px 1px 1px",
  borderStyle: "solid",
  borderColor: theme.palette.error[600],
  borderRadius: theme.spacing(1),
  px: { md: 2.5, xs: 2 },
  py: { md: 3, xs: 2 },
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
  alignItems: "flex-start",
});

export const warningIconWrapper: SxProps<Theme> = (theme) => ({
  height: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  width: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  minHeight: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  minWidth: { md: theme.spacing(6.5), xs: theme.spacing(4) },
  background: theme.palette.error[600],
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

export const occupancyCard: SxProps<Theme> = (theme) => ({
  background: "#FFFFFF",
  border: `1px solid ${theme.palette.common.white}`,
  borderRadius: theme.spacing(0.5),
  px: 1.5,
  py: 0.75,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const sendBtn: SxProps<Theme> = (theme) => ({
  px: 3,
  height: theme.spacing(4.5),
  textTransform: "none",
  fontSize: theme.spacing(1.75),
});

export const warningCardHeader: SxProps<Theme> = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 1,
};

export const carDetailCard: SxProps<Theme> = (theme) => ({
  border: `1px solid ${theme.palette.common.white}`,
  borderRadius: theme.spacing(0.5),
  p: 2.5,
  flexDirection: "row",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  position: "relative",
  mt: 2.5,
});

export const carDetailStatus: SxProps<Theme> = (theme) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "6px",
  position: "absolute",
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  "& > div": {
    height: "8px",
    width: "8px",
    borderRadius: "50%",
    background: theme.palette.error[600],
  },
});

export const carImgWrapper: SxProps<Theme> = {
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  width: "100%",
  mt: 2,
  height: { md: "calc(100% - 64px)" },
  paddingTop: { md: 0, xs: "85%" },
  "& > img": {
    width: "100%",
    height: "100%",
    position: "absolute",
    objectFit: "cover",
    top: 0,
    left: 0,
  },
};

export const cardWrapper: SxProps<Theme> = (theme) => ({
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

export const deleteButton: SxProps<Theme> = (theme) => ({
  background: "#FFFFFF",
  border: `1px solid ${theme.palette.common.white}`,
});

export const cancelButton: SxProps<Theme> = () => ({
  margin: "4px",
});


export const root: SxProps<Theme> = { display: "flex", flexDirection: "column", gap: 3.5 };
