import * as React from "react";
import { Box, Typography } from "@mui/material";
import * as sx from "./AuthContainer.styles";
import { rootStyles, useAppSelector } from "../../lib";
import { Outlet } from "react-router-dom";

const AuthContainer: React.FC = () => {
  const coverImage = useAppSelector((state) => state.config.ui.images.backgroundImage);

  const appCopyright = useAppSelector((state) => state.config.ui.meta.name);
  
  return (
    <Box
      sx={{
        ...sx.containerRoot,
        background: `url(${coverImage}) no-repeat right`,
      }}
    >
      <React.Suspense fallback={null}>
        <Outlet />
      </React.Suspense>
      <Box sx={rootStyles.footerRoot}>
        <Typography variant='body2' sx={rootStyles.footerText}>
          {appCopyright}
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthContainer;
