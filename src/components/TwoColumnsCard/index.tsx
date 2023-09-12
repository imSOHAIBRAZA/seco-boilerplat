import * as React from "react";
import { Box, SxProps, Theme } from "@mui/material";

interface PropsT {
  leftSide: React.ReactElement;
  rightSide: React.ReactElement;
}

const TwoColumnsCard: React.FC<PropsT> = ({ leftSide, rightSide }) => {
  return (
    <Box sx={root}>
      {leftSide}
      {rightSide}
    </Box>
  );
};

export default TwoColumnsCard;

const root: SxProps<Theme> = (theme) => ({
  display: "flex",
  alignItems: "stretch",
  justifyContent: "center",
  width: "100%",
  marginX: "auto",
  position: "relative",
  flexDirection: { md: "row", xs: "column" },
  gap: { md: 8, xs: 4 },
  background: "#FFFFFF",
  border: `1px solid ${theme.palette.common.white}`,
  boxShadow: "0px 8px 12px rgba(67, 73, 79, 0.12)",
  borderRadius: theme.spacing(1.5),
  overflow: "hidden",
  p: { md: 4, xs: 2 },
  "& > div:first-of-type": {
    flex: { md: 1 },
    position: "relative",
    width: "100%",
    height: "auto",
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
  "& > div:last-child": { flex: { md: 1 } },
});
