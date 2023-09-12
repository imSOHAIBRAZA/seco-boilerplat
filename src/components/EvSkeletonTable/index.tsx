import * as React from "react";
import { Box, Skeleton } from "@mui/material";
import {
  sxCellContainer,
  sxSkeletonCheckbox,
  sxSkeletonRowContainer,
  sxSkeltonCell,
} from "./EvSkeletonTable.style";

interface TableSkeletonProps {
  headCount: number;
  hasSelect: boolean;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ headCount, hasSelect = false }) => {
  const nArray = (n: number) => Array(n).fill(1);
  const SkeletonRow = () => (
    <Box sx={sxSkeletonRowContainer}>
      {hasSelect && <Skeleton sx={sxSkeletonCheckbox} />}
      <Box sx={sxCellContainer}>
        {nArray(headCount).map((_, i) => (
          <Skeleton key={i} sx={sxSkeltonCell} />
        ))}
      </Box>
    </Box>
  );
  return (
    <Box sx={{ m: -2 }}>
      {nArray(8).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </Box>
  );
};
export default TableSkeleton;
