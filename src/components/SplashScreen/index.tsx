import * as React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { initialUIConfig } from "../../lib";

const SplashScreen: React.FC = () => {
  return (
    <Box sx={container}>
      <Box
        sx={loadingImage}
        component='img'
        src={initialUIConfig.images.navLogo}
        alt='loading...'
      />
    </Box>
  );
};

export default SplashScreen;

const container: SxProps<Theme> = {
  height: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const loadingImage: SxProps<Theme> = {
  animation: "zoom-in-zoom-out 1s ease infinite",
  "@keyframes zoom-in-zoom-out": {
    "0%": {
      width: "200px",
    },
    "50%": {
      width: "215px",
    },
    "100%": {
      width: "200px",
    },
  },
};
