import * as React from "react";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import * as sx from "./AppCardSkeleton.styles";

const AppCardSkeleton: React.FC = () => {
  return (
    <Box sx={sx.cardRoot}>
      <Box sx={sx.imgAndDetailWrapper}>
        <Skeleton sx={{ transform: "scale(1)" }}>
          <Box sx={sx.imgWrapper}>
            <Box component='img' sx={sx.cardImg} alt='app_img' />
          </Box>
        </Skeleton>
        <Stack
          sx={{ width: "-webkit-fill-available" }}
          gap={1}
          direction='column'
          justifyContent='space-between'
        >
          <Box sx={{ width: "-webkit-fill-available" }}>
            <Typography variant='body1' fontWeight={600}>
              <Skeleton />
            </Typography>
            <Typography width='65%' variant='body2'>
              <Skeleton />
            </Typography>
          </Box>
          <Box>
            <Skeleton sx={{ transform: "scale(1)", borderRadius: "99px" }}>
              <Button sx={sx.openButton} size='small' variant='outlined' color='warning'>
                Open
              </Button>
            </Skeleton>
          </Box>
        </Stack>
      </Box>
      <Box>
        <Typography variant='body2'>
          <Skeleton />
        </Typography>
        <Typography width='50%' variant='body2'>
          <Skeleton />
        </Typography>
      </Box>
    </Box>
  );
};

export default AppCardSkeleton;
