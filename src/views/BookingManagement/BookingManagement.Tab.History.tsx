import * as React from "react";
import * as rootStyles from "../../lib/rootStyles";
import * as sx from "./BookingManagement.styles";
import { Box, Typography } from "@mui/material";
import { Table } from "../../components";
import { useAppDispatch, useAppSelector } from "../../lib";
import * as mock from "./BookingManagement.mocks";
import { useUsers } from "../Users/Users.hooks";
import { useBookingManagement } from "./BookingManagement.hooks";
import BookingHistory from './BookingManagement.History';
import { useEVChargers } from "../EVCharger/EVCharger.hooks";

import {
  setEVChargerOrdering,
  setEVChargerPage,
  setEVChargerRowsPerPage,
} from "../../features/ev-charger/ev-charger-slice";
import { setBookingPage, setBookingOrdering, setBookingRowsPerPage } from "../../features/booking-management/booking-management-slice";


const HistoryTable: React.FC = () => {
  const dispatch = useAppDispatch();

  const bookingUsers = useAppSelector((state) => state.bookingManagementSlice.bookingUsers);
  const isLoading = useAppSelector((state) => state.bookingManagementSlice.isLoading);
  const rowsPerPage = useAppSelector((state) => state.bookingManagementSlice.rowsPerPage);
  const pageNo = useAppSelector((state) => state.bookingManagementSlice.pageNo);
  const dataCount = useAppSelector((state) => state.bookingManagementSlice.dataCount);
  const orderBy = useAppSelector((state) => state.bookingManagementSlice.ordering);
  const history = useAppSelector((state) => state.bookingManagementSlice.history);

  // ev charger
  const evchargers = useAppSelector((state) => state.evchargers.evchargers);
  const rowsPerPageEVcharger = useAppSelector((state) => state.evchargers.rowsPerPage);
  const pageNoEVcharger = useAppSelector((state) => state.evchargers.pageNo);
  const isLoadingEVcharger = useAppSelector((state) => state.evchargers.isLoading);
  const dataCountEVcharger = useAppSelector((state) => state.evchargers.dataCount);
  const orderByEVcharger = useAppSelector((state) => state.evchargers.ordering);
  useUsers();
  useEVChargers();
  useBookingManagement();


  const handlePageChange = (page: number) => {
    dispatch(setBookingPage(page));
  };

  const handleSort = (order: string) => {
    dispatch(setBookingOrdering(order));
  };

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setBookingRowsPerPage(limit));
  };

  const handleRowsPerPageChangeEvCharger = (limit: number) => {
    dispatch(setEVChargerRowsPerPage(limit));
  };

  const handlePageChangeEvCharger = (page: number) => {
    dispatch(setEVChargerPage(page));
  };

  const handleSortEvCharger = (order: string) => {
    dispatch(setEVChargerOrdering(order));
  };


  if(history){
    return <BookingHistory />;
  }
  return (
    <>
      <Box sx={sx.cardWrapper}>
        <Typography sx={sx.cardTitle} variant='body1'>
          Booking History by User
        </Typography>
        <Box sx={rootStyles.tableBorderlessWrapper}>
          <Table
            headData={mock.UsersHeadRowData}
            data={bookingUsers}
            isLoading={isLoading}
            rowsPerPage={rowsPerPage}
            orderBy={orderBy}
            onSort={handleSort}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pageNo}
            dataCount={dataCount}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
      <br />
      <Box sx={sx.cardWrapper}>
        <Typography sx={sx.cardTitle} variant='body1'>
          Booking History By EV Device
        </Typography>
        <Box sx={rootStyles.tableBorderlessWrapper}>
          <Table
            headData={mock.EVHeadRowData}
            data={evchargers}
            isLoading={isLoadingEVcharger}
            rowsPerPage={rowsPerPageEVcharger}
            orderBy={orderByEVcharger}
            onSort={handleSortEvCharger}
            onRowsPerPageChange={handleRowsPerPageChangeEvCharger}
            page={pageNoEVcharger}
            onPageChange={handlePageChangeEvCharger}
            dataCount={dataCountEVcharger}
          />
        </Box>
      </Box>
    </>
  );
};

export default HistoryTable;
