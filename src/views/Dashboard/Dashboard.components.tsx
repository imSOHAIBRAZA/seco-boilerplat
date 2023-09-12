import * as React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import GoogleMapReact, { Position } from "google-map-react";
import { API_KEYS, useAppDispatch, useAppSelector } from "../../lib";
import { setHistoryPage, setHistoryRowsPerPage,setDashoardHistoryOrdering } from "../../features/dashboard/dashboard-slice";
import { Table, PieChartWithTotal, TwoColumnsCard, InfoCard } from "../../components";
import { RevenueIcon, ElectricityCostIcon, MarkerIcon } from "../../assets/icons";
import { FrequentAdT } from "../../types/dashboard";
import { PieChartValue } from "../../components/PieChartWithTotal/PieChart.types";
import * as mocks from "./Dashboard.mocks";
import * as types from "./Dashboard.types";
import * as sx from "./Dashboard.styles";
import * as rootStyles from "../../lib/rootStyles";
import _ from "lodash";

export const TableBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const history = useAppSelector((state) => state.dashboard.history);
  const rowsPerPage = useAppSelector((state) => state.dashboard.rowsPerPage);
  const pageNo = useAppSelector((state) => state.dashboard.pageNo);
  const isLoading = useAppSelector((state) => state.dashboard.isLoadingHistory);
  const dataCount = useAppSelector((state) => state.dashboard.dataCount);
  const orderBy = useAppSelector((state) => state.dashboard.ordering);

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setHistoryRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setHistoryPage(page));
  };
  const handleSort = (order: string) => {
    dispatch(setDashoardHistoryOrdering(order));
  };
  return (
    <Box sx={rootStyles.tableBorderlessWrapper}>
      <Table
        headData={mocks.HeadRowData}
        data={history}
        isLoading={isLoading}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={pageNo}
        orderBy={orderBy}
        onSort={handleSort}
        dataCount={dataCount}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export const EnvironmentandUserData: React.FC<{ isLoading?: boolean }> = ({ isLoading }) => {
  return (
    <Box sx={sx.EnvandUserBox}>
      <Box sx={sx.LeftCard}>
        <Box sx={sx.UsersDataStyle}>
          <Typography variant='inherit' sx={sx.envTitle}>
            Users
          </Typography>
          <Box sx={sx.UserDataCardStyle}>
            {_.map(mocks.DashboadMockEnvData, (value, index) => (
              <UserCard isLoading={isLoading} key={index} {...value} />
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={sx.RightCard}>
        <Box>
          {_.map(mocks.DashboadMockRealTimeData, (value, index) => (
            <RealTimeData isLoading={isLoading} key={index} {...value} />
          ))}
        </Box>
        <Box>
          {_.map(mocks.DashboadMockPredictiveData, (value, index) => (
            <PredictiveData isLoading={isLoading} key={index} {...value} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const UserCard: types.UsersDataComponent = (props: types.UsersPropsT) => {
  if (props.isLoading)
    return (
      <Box sx={sx.userCardBox}>
        <Skeleton>
          <Typography variant='inherit' sx={sx.userHeading}>
            props.heading
          </Typography>
        </Skeleton>
        <Skeleton>
          <Typography variant='inherit' sx={sx.userCount}>
            count
          </Typography>
        </Skeleton>
        <Skeleton>
          <Typography variant='inherit' sx={sx.userSubHeading}>
            props.subHeading
          </Typography>
        </Skeleton>
      </Box>
    );
  return (
    <Box sx={sx.userCardBox}>
      <Typography variant='inherit' sx={sx.userHeading}>
        {props.heading}
      </Typography>
      <Typography variant='inherit' sx={sx.userCount}>
        {props.count}
      </Typography>
      <Typography variant='inherit' sx={sx.userSubHeading}>
        {props.subHeading}
      </Typography>
    </Box>
  );
};

export const RealTimeData: types.RealTimeDataComponent = (props: types.RealTimePropsT) => {
  const matches = useMediaQuery("(min-width:500px)");

  if (props.isLoading)
    return (
      <Box sx={sx.realTimeCardStyle} style={{ flexDirection: matches ? "row" : "column" }}>
        <Box sx={sx.timeTitle}>
          <Skeleton>
            <Typography variant='inherit' sx={sx.realTitle}>
              props.label
            </Typography>
          </Skeleton>
          <Skeleton>
            <Typography style={{ alignItems: "center" }} variant='inherit' sx={sx.realTag}>
              props.tag
            </Typography>
          </Skeleton>
        </Box>
        <Skeleton>
          <Typography component='span' sx={matches ? sx.realNumber : sx.realNumberC}>
            33 <sup style={{ fontSize: "12px" }}>℃</sup>
          </Typography>
        </Skeleton>
      </Box>
    );

  return (
    <Box sx={sx.realTimeCardStyle} style={{ flexDirection: matches ? "row" : "column" }}>
      <Box sx={sx.timeTitle}>
        <Typography variant='inherit' sx={sx.realTitle}>
          {props.label}
        </Typography>
        <Typography style={{ alignItems: "center" }} variant='inherit' sx={sx.realTag}>
          {props.tag}
        </Typography>
      </Box>
      <Typography component='span' sx={matches ? sx.realNumber : sx.realNumberC}>
        {props.totalValue} <sup style={{ fontSize: "12px" }}>℃</sup>
      </Typography>
    </Box>
  );
};

export const PredictiveData: types.PredictiveDataComponent = (props: types.PredictivePropsT) => {
  if (props.isLoading)
    return (
      <Box sx={sx.PredictiveCardStyle}>
        <Skeleton>
          <Typography variant='inherit' sx={sx.predictiveTitle}>
            {props.title}
          </Typography>
        </Skeleton>
        <Skeleton>
          <Typography variant='inherit' sx={sx.predictivetHeading}>
            {props.heading}
          </Typography>
        </Skeleton>
        <Box>
          <Typography variant='inherit' sx={sx.predictiveDescrip2} width='100%'>
            <Skeleton />
          </Typography>
          <Typography variant='inherit' sx={sx.predictiveDescrip2} width='100%'>
            <Skeleton />
          </Typography>
          <Typography variant='inherit' sx={sx.predictiveDescrip2} width='80%'>
            <Skeleton />
          </Typography>
        </Box>
      </Box>
    );
  return (
    <Box sx={sx.PredictiveCardStyle}>
      <Typography variant='inherit' sx={sx.predictiveTitle}>
        {props.title}
      </Typography>
      <Typography variant='inherit' sx={sx.predictivetHeading}>
        {props.heading}
      </Typography>
      <Typography variant='inherit' sx={sx.predictiveDescrip}>
        {props.description}
      </Typography>
    </Box>
  );
};

export const DigitalandMostData: React.FC = () => {
  const dashboardDigitalSignage = useAppSelector((state) => state.dashboard.digitalSignage);
  const isLoading = useAppSelector((state) => state.dashboard.isLoading);

  return (
    <Box sx={sx.DigitalandMostDataBox}>
      <Box>
        <Typography variant='body1' sx={sx.digitalTitle}>
          Digital Signage
        </Typography>
        <Box sx={sx.digitalBox}>
          <InfoCard
            isLoading={isLoading}
            label='This week'
            tag='Total Advertisments'
            totalValue={dashboardDigitalSignage?.active_promotions}
            icon={RevenueIcon}
          />
          <InfoCard
            isLoading={isLoading}
            label='This week'
            tag='Total Interactions'
            totalValue={dashboardDigitalSignage?.total_interactions}
            icon={ElectricityCostIcon}
          />
          <InfoCard
            isLoading={isLoading}
            label='This week'
            tag='Active Promo'
            totalValue={dashboardDigitalSignage?.active_promotions}
            icon={RevenueIcon}
          />
        </Box>
      </Box>
      <Box>
        <Typography variant='body1' sx={sx.mostViewTitle}>
          Frequently Viewed
        </Typography>
        <Box sx={sx.mostViewBox}>
          {_.map(dashboardDigitalSignage.frequent_ads, (value: FrequentAdT, index: number) => (
            <MostViewCard isLoading={isLoading} key={index} {...value} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export const MostViewCard: React.FC<FrequentAdT & { isLoading?: boolean }> = (props) => {
  if (props.isLoading)
    return (
      <Box sx={sx.mostViewCard}>
        <Skeleton sx={{ transform: "scale(1)" }}>
          <Box>
            <img src={props.image} style={{ width: "100%", height: "50%" }} />
          </Box>
        </Skeleton>
        <Box sx={sx.mostViewDataStyle}>
          <Skeleton>
            <Typography variant='inherit' sx={sx.mostViewCardText}>
              props.label
            </Typography>
          </Skeleton>
          <Skeleton>
            <Typography variant='inherit' sx={sx.mostViewCardText1}>
              props.year
            </Typography>
          </Skeleton>
        </Box>
      </Box>
    );
  return (
    <Box sx={sx.mostViewCard}>
      <Box>
        <img src={props.image} style={{ width: "100%", height: "50%" }} />
      </Box>
      <Box sx={sx.mostViewDataStyle}>
        <Typography variant='inherit' sx={sx.mostViewCardText}>
          {props.name}
        </Typography>
        <Typography variant='inherit' sx={sx.mostViewCardText1}>
          {props.age_range}
        </Typography>
      </Box>
    </Box>
  );
};

const Marker: React.FC<Position> = () => {
  return (
    <Box sx={{ color: "error.main", "& > svg": { color: "inherit" } }}>
      <MarkerIcon />
    </Box>
  );
};

export const ChartAndMap: React.FC<{ pieData: PieChartValue[] }> = ({ pieData }) => {
  const isLoading = useAppSelector((state) => state.dashboard.isLoading);
  const defaultProps = {
    center: {
      lat: 34.04033846128647,
      lng: -118.26946047952252,
    },
    zoom: 11,
  };

  return (
    <TwoColumnsCard
      leftSide={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant='inherit' sx={sx.piechartHeading}>
            EV charger working minutes
          </Typography>
          <Box sx={{ width: "100%", minHeight: { md: "calc(100% - 56px)" } }}>
            <PieChartWithTotal isLoading={isLoading} value={pieData} />
          </Box>
          <Box />
        </Box>
      }
      rightSide={
        <Box sx={sx.mapContainer}>
          <Box sx={sx.dotBox}>
            <Typography variant='inherit' sx={sx.mapHeading}>
              Maps
            </Typography>
            <Box sx={sx.dotContainer}>
              <Box sx={sx.dotWrapper}>
                <Box sx={sx.blueDot}></Box>
                <Typography variant='body2' fontWeight={600}>
                  Available
                </Typography>
              </Box>
              <Box sx={sx.dotWrapper}>
                <Box sx={sx.orangeDot}></Box>
                <Typography variant='body2' fontWeight={600}>
                  Occupied
                </Typography>
              </Box>
              <Box sx={sx.dotWrapper}>
                <Box sx={sx.purpleDot}></Box>
                <Typography variant='body2' fontWeight={600}>
                  Booked
                </Typography>
              </Box>
              <Box sx={sx.dotWrapper}>
                <Box sx={sx.brownDot}></Box>
                <Typography variant='body2' fontWeight={600}>
                  Locked
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={sx.mapWrapper}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: API_KEYS.GOOGLE_MAP as string }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
            </GoogleMapReact>
          </Box>
        </Box>
      }
    />
  );
};
