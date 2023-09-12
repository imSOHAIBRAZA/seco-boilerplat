import React from "react";
import { Skeleton, Box, Typography } from "@mui/material";

const NotificationSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        borderBottom: "1px solid #CCC",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        height: "73px",
      }}
    >
      <Skeleton>
        <Box height='24px' width='24px' />
      </Skeleton>
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography variant='body1' lineHeight={1}>
          <Skeleton />
        </Typography>
        <Typography maxWidth='50%' display='block' lineHeight={1} height='15px' variant='caption'>
          <Skeleton />
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationSkeleton;
