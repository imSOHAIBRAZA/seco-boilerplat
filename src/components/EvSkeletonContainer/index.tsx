import * as React from "react";
import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import {
  sxSkeletonSearch,
  sxSkeletonContainer,
  sxSkeletonTable,
  sxSkeltonFilter,
  sxSkeletonText,
} from "./EvSkeletonContainer.style";

const EvSkeletonContainer = () => {
  return (
    <Box>
      <Skeleton variant='text' sx={sxSkeletonText} />
      <Box>
        <Box sx={sxSkeletonContainer}>
          <Skeleton sx={sxSkeltonFilter} />
          <Skeleton sx={sxSkeltonFilter} />
          <Skeleton sx={sxSkeltonFilter} />
          <Skeleton sx={sxSkeletonSearch} />
        </Box>
        <Skeleton sx={sxSkeletonTable} />
      </Box>
    </Box>
  );
};
export default EvSkeletonContainer;
