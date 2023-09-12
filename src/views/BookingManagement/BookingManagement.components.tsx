import * as React from "react";
import * as rootStyles from "../../lib/rootStyles";
import * as sx from "./BookingManagement.styles";
import * as mocks from "./BookingManagement.mocks";
import { Box, Typography } from "@mui/material";
import { Table } from "../../components";

export const HistoryTable: React.FC = () => {
  return (
    <Box sx={sx.cardWrapper}>
      <Typography sx={sx.cardTitle} variant='body1'>
        History
      </Typography>
      <Box sx={rootStyles.tableBorderlessWrapper}>
        <Table
          headData={mocks.HistoryHeadRowData}
          data={mocks.HistoryData}
          isLoading={false}
          rowsPerPage={8}
          onRowsPerPageChange={() => console.log("page changed")}
          page={1}
          dataCount={1}
          onPageChange={() => console.log("change")}
          isEmptyRows={false}
        />
      </Box>
    </Box>
  );
};
