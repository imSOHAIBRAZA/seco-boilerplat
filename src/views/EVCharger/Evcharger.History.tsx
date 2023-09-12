import * as React from "react";
import Table from "../../components/Table";
import * as mocks from "../BookingManagement/BookingManagement.mocks";
import { Box, Typography, Button } from "@mui/material";
import { setBookingOrdering, setBookingPage, setBookingRowsPerPage, setBookingQuery } from "../../features/booking-management/booking-management-slice";
import { useAppDispatch, useAppSelector, rootStyles, getScreenDescription } from "../../lib";
import { SearchField } from "../BookingManagement/components";
import { fetchBookings } from "../../features/booking-management/booking-management-thunk";
import {
  fetchEVChargers,
} from "../../features/ev-charger/ev-charger-thunk";
import { useBookingManagement } from "../BookingManagement/BookingManagement.hooks";
import { useEVChargers } from "../EVCharger/EVCharger.hooks";
import { setHistoryEvcharger } from "../../features/ev-charger/ev-charger-slice"
export const filterOptions = [
  { value: "serial_number", label: "Serial Number" },
  { value: "vm_name", label: "Name" },
  { value: "company", label: "Operator" },
  { value: "device_type", label: "Device Type" },
  { value: "status", label: "Status" },
];

const BookingManagementHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const {
    searchQuery, handleSelectFilter, handleFetchBookings,
    // searchFilter,
    handleSearch,
  } = useBookingManagement();

  useEVChargers();
  const historyData = useAppSelector((state) => state.evchargers.history);

  const bookings = useAppSelector((state) => state.bookingManagementSlice.bookings);
  const rowsPerPage = useAppSelector((state) => state.bookingManagementSlice.rowsPerPage);
  const pageNo = useAppSelector((state) => state.bookingManagementSlice.pageNo);
  const isLoading = useAppSelector((state) => state.bookingManagementSlice.isLoading);
  const dataCount = useAppSelector((state) => state.bookingManagementSlice.dataCount);
  const orderBy = useAppSelector((state) => state.bookingManagementSlice.ordering);

  const selectedStation = useAppSelector((state) => state.bookingManagementSlice.selectedStation);

  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setBookingRowsPerPage(limit));
  };

  const handleSort = (order: string) => {
    dispatch(setBookingOrdering(order));
  };

  const handlePageChange = (page: number) => {
    dispatch(setBookingPage(page));
    setPage(page);
  };

  React.useEffect(() => {
    const searchQuery = `?device=${historyData?.id}`;

    console.log({ historyData })
    dispatch(setBookingQuery(searchQuery))

    dispatch(fetchBookings({ query: searchQuery }));

  }, [page]);
  React.useEffect(() => {
    handleFetchBookings();

    return () => {
      dispatch(setBookingQuery(""))
    }
  }, []);
  if (selectedStation) {
    return null;
  }
  return (
    <Box sx={rootStyles.rootContentWrapper}>
      <Typography variant='body2'>{getScreenDescription(location.pathname)}</Typography>
      <Box>
        <Button
          variant='outlined'
          onClick={() => {
            dispatch(setHistoryEvcharger(null));
            dispatch(fetchEVChargers({ query: "" }));
          }}
        >
          GO BACK
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <SearchField
          value={searchQuery}
          onChange={handleSearch}
          onSelect={handleSelectFilter}
        />
      </Box>
      <Box sx={rootStyles.rootTableWrapper}>
        <Box sx={rootStyles.tableBorderlessWrapper}>
          <Table
            headData={mocks.BookingHistoryHeadRowData}
            data={bookings}
            isLoading={isLoading}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={pageNo}
            onPageChange={handlePageChange}
            dataCount={dataCount}
            orderBy={orderBy}
            onSort={handleSort}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BookingManagementHistory;
