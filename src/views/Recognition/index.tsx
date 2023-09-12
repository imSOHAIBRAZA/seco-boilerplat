import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { WarningIcon } from "../../assets/icons";
import { HistoryTable } from "./Recognition.components";
import Table from "../../components/Table";
import * as mocks from "./Recognition.mocks";
import * as sx from "./Recognition.styles";

import CarImg from "../../assets/car_img.jpeg";

import {
  setVehiclePage,
  setVehicleRowsPerPage,
  setVehicleOrdering,
  setStationSelected,
  setSelectedVehicles,
} from "../../features/recognition/recognition-slice";

import { useAppDispatch, useAppSelector, rootStyles, getScreenDescription } from "../../lib";
import { useRecognition } from "./Recognition.hooks";
import RecognitionEvchargers from "./Recognition.Evcharger";

const Recognition: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vehicles } = useRecognition();

  const rowsPerPage = useAppSelector((state) => state.vehicles.rowsPerPage);
  const pageNo = useAppSelector((state) => state.vehicles.pageNo);
  const isLoading = useAppSelector((state) => state.vehicles.isLoading);
  const dataCount = useAppSelector((state) => state.vehicles.dataCount);
  const orderBy = useAppSelector((state) => state.vehicles.ordering);

  const selectedVehicles = useAppSelector((state) => state.recognitionSlice.selectedVehicles);
  const selectedStation = useAppSelector((state) => state.recognitionSlice.selectedStation);
  const isMutating = useAppSelector((state) => state.recognitionSlice.isMutating);

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setVehicleRowsPerPage(limit));
  };

  const handlePageChange = (page: number) => {
    dispatch(setVehiclePage(page));
  };
  const handleSort = (order: string) => {
    dispatch(setVehicleOrdering(order));
  };
  if (!selectedStation) {
    return <RecognitionEvchargers />;
  }

  return (
    <Box sx={sx.root}>
      <Box>
        <Button
          disabled={isMutating}
          variant='outlined'
          onClick={() => {
            if (selectedVehicles.length > 0) {
              dispatch(setSelectedVehicles([]));
            } else {
              dispatch(setStationSelected(null));
            }
          }}
        >
          GO BACK
        </Button>
      </Box>
      {selectedVehicles.length === 0 ? (
        <Box sx={rootStyles.rootContentWrapper}>
          <Typography variant='body2'>{getScreenDescription(location.pathname)}</Typography>
          <Box sx={rootStyles.rootTableWrapper}>
            <Box sx={rootStyles.tableBorderlessWrapper}>
              <Table
                headData={mocks.VehicleRowData}
                data={vehicles}
                isLoading={isLoading}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleRowsPerPageChange}
                page={pageNo}
                orderBy={orderBy}
                onSort={handleSort}
                onPageChange={handlePageChange}
                dataCount={dataCount}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={sx.card}>
          <Box>
            <Typography variant='body1' color='primay.900' fontWeight={600}>
              Streaming
            </Typography>
            <Typography variant='body2' color='primay.900' mt={0.5}>
              Mall parking area a - 09:41:19, 15th Sep 2022
            </Typography>
            <Box sx={sx.carImgWrapper}>
              <img src={CarImg} alt='car_img' />
            </Box>
          </Box>
          <Box>
            <Box>
              <Box sx={sx.warningCard}>
                <Box sx={sx.warningCardHeader}>
                  <Box sx={sx.warningIconWrapper}>
                    <WarningIcon />
                  </Box>
                  <Box>
                    <Typography color='error.600' variant='body2'>
                      Warning
                    </Typography>
                    <Typography variant='h6' color='primary.900' fontWeight={600} lineHeight='24px'>
                      Car & Plate recognition
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='body2' color='primay.900'>
                  EV charger parking is occupied by a car with plate: CCC 444
                  <br />
                  <br />
                  if you want to send a message to the removal personnel click here and the
                  following text will be sent.
                  <br />
                  <br />
                  &quot;A car is occupying the parking lot illegally in via xxxx and needs to be
                  removed&ldquo;
                  <br />
                </Typography>
                <Box sx={sx.occupancyCard}>
                  <Typography variant='body2' color='primary.900'>
                    Occupancy:{" "}
                    <Typography component='span' color='primary' fontWeight={600}>
                      15 Mins
                    </Typography>
                  </Typography>
                  <Button variant='contained' sx={sx.sendBtn}>
                    Send
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box>
              <Box sx={sx.carDetailCard}>
                <Box sx={sx.carDetailStatus}>
                  <Box />
                  <Typography variant='body2' fontWeight={500} color='error.600' lineHeight='18px'>
                    Occupied Spot
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' fontWeight={600} color='primary.900'>
                    Car Details
                  </Typography>
                  <Typography variant='body1' color='primary.900'>
                    Car Model:{" "}
                    <Typography component='span' color='primary' fontWeight={600} mt={0.5}>
                      Model 2
                    </Typography>
                  </Typography>
                </Box>
                <Typography variant='body1' color='primary.900' pr={{ lg: 14.5 }}>
                  Plate:{" "}
                  <Typography component='span' color='primary' fontWeight={600} mt={0.5}>
                    CCC444
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      <HistoryTable />
    </Box>
  );
};

export default Recognition;
