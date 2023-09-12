import { SxProps, Theme } from "@mui/material";

export const authFormWrapper: SxProps<Theme> = (theme) => ({
  width: "100%",
  maxWidth: theme.spacing(47.5),
  boxShadow: " -60px 0px 100px -90px #000000, 60px 0px 100px -90px #000000",
  backgroundColor: "#FFF",
  borderRadius: theme.spacing(1),
});

export const formHeader: SxProps<Theme> = (theme) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: theme.spacing(17),
  },
});

export const appTitleWrapper: SxProps<Theme> = (theme) => ({
  height: theme.spacing(5.5),
  backgroundColor: "primary.main",
  color: "#FFF",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const formWrapper: SxProps<Theme> = (theme) => ({
  px: theme.spacing(5),
  py: theme.spacing(2),
  gap: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  "& button[type=submit]": {
    marginTop: theme.spacing(2),
  },
});
