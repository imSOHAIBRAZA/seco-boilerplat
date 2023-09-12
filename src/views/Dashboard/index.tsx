import * as React from "react";
import { Box, Typography } from "@mui/material";
import {
  TableBox,
  EnvironmentandUserData,
  ChartAndMap,
  DigitalandMostData,
} from "./Dashboard.components";
import { useDashboard } from "./Dashboard.hooks";
import { InfoCard } from "../../components";
import { useAppSelector } from "../../lib";
import * as sx from "./Dashboard.styles";
import * as mocks from "./Dashboard.mocks";
import _ from "lodash";

const Dashboard: React.FC = () => {
  const { dashboardStatistics, pieData } = useDashboard();
  const isLoading = useAppSelector((state) => state.dashboard.isLoading);

  return (
    <Box sx={sx.rootContentWrapper}>
      <Box sx={sx.cardWrapper}>
        {_.map(dashboardStatistics, (value, index) => (
          <InfoCard isLoading={isLoading} key={index} {...value} />
        ))}
      </Box>
      <ChartAndMap pieData={pieData} />
      <Box sx={sx.cardWrapper3}>
        {_.map(mocks.DashboadMock3, (value, index) => (
          <EnvironmentandUserData isLoading={isLoading} key={index} {...value} />
        ))}
      </Box>
      <Box sx={sx.cardWrapper4}>
        <DigitalandMostData />
      </Box>
      <Box sx={sx.cardWrapper5}>
        <Typography
          variant='body1'
          fontWeight={600}
          color='primary.900'
          sx={{ px: { md: 4, xs: 2 }, pt: { md: 4, xs: 2 } }}
        >
          History
        </Typography>
        <TableBox />
      </Box>
    </Box>
  );
};

export default Dashboard;
