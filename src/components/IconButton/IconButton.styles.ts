import { Theme, SxProps } from "@mui/material";

export const buttonIcon: SxProps<Theme> = (theme) => ({
  width: theme.spacing(2.5),
  height: theme.spacing(2.5),
  mr: theme.spacing(0.5),
  "& > svg": {
    height: "100%",
    width: "100%",
  },
});
