import * as React from "react";
import { CSVLink } from "react-csv";
import { Table, Modal, IconButton } from "../../components";
import { SearchField } from "./components";
import * as mocks from "./BookingManagement.mocks";
import { Box, Typography } from "@mui/material";
import {
  setSelectedCancelBookings,
  setBookingPage,
  setBookingOrdering,
  setBookingRowsPerPage,
} from "../../features/booking-management/booking-management-slice";
import { WarningIcon, ExportIcon } from "../../assets/icons";
import { useAppDispatch, useAppSelector, rootStyles, getScreenDescription } from "../../lib";
// import { useEVChargers } from "../EVCharger/EVCharger.hooks";
import { useBookingManagement } from "./BookingManagement.hooks";

export const filterOptions = [
  { value: "device__serial_number", label: "Serial Number" },
  { value: "device__vm_name", label: "Name" },
  { value: "user__first_name", label: "User" },
  // { value: "location", label: "Location" },
  { value: "booking_status", label: "Booking Status" },
];
const BookingManagementEvchargers: React.FC = () => {
  const dispatch = useAppDispatch();

  const { handleFormSubmit, searchQuery, handleSelectFilter, handleFetchBookings, handleSearch } =
    useBookingManagement();
  const bookings = useAppSelector((state) => state.bookingManagementSlice.bookings);
  const allBookings = useAppSelector((state) => state.bookingManagementSlice.allBookings);
  const rowsPerPage = useAppSelector((state) => state.bookingManagementSlice.rowsPerPage);
  const selectedCancelBooking = useAppSelector(
    (state) => state.bookingManagementSlice.selectedCancelBooking,
  );
  const pageNo = useAppSelector((state) => state.bookingManagementSlice.pageNo);
  const isLoading = useAppSelector((state) => state.bookingManagementSlice.isLoading);
  const dataCount = useAppSelector((state) => state.bookingManagementSlice.dataCount);
  const isMutating = useAppSelector((state) => state.bookingManagementSlice.isMutating);
  const orderBy = useAppSelector((state) => state.bookingManagementSlice.ordering);

  const selectedStation = useAppSelector((state) => state.bookingManagementSlice.selectedStation);
  const [filteredBookings, setFilteredBookings] = React.useState<any>([]);
  const handleRowsPerPageChange = (limit: number) => {
    dispatch(setBookingRowsPerPage(limit));
  };
  console.log({ bookings });
  const handlePageChange = (page: number) => {
    dispatch(setBookingPage(page));
  };
  const handleSort = (order: string) => {
    dispatch(setBookingOrdering(order));
  };

  React.useEffect(() => {
    handleFetchBookings();
  }, []);

  if (selectedStation) {
    return null;
  }

  React.useEffect(() => {
    setFilteredBookings(
      allBookings.map((book) => {
        const temp: any = {
          ...book,
          name: book.device.vm_name,
          user: book.user.first_name + " " + book.user.last_name,
        };
        delete temp?.vehicle;
        delete temp?.device;
        return temp;
      }),
    );
  }, [allBookings]);
  console.log({ allBookings, filteredBookings });

  return (
    <Box sx={rootStyles.rootContentWrapper}>
      <Typography variant='body2'>{getScreenDescription(location.pathname)}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <SearchField value={searchQuery} onChange={handleSearch} onSelect={handleSelectFilter} />
        <Box sx={{ marginRight: "10px" }}>
          <CSVLink
            data={filteredBookings}
            filename={"allBookings.csv"}
            style={{ textDecoration: "none" }}
          >
            <IconButton icon={ExportIcon} variant='contained'>
              Export
            </IconButton>
          </CSVLink>
        </Box>
      </Box>
      <Box sx={rootStyles.rootTableWrapper}>
        <Box sx={rootStyles.tableBorderlessWrapper}>
          <Table
            headData={mocks.BookingHeadRowData}
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
        <Modal
          title='Cancel Booking'
          description='Are you sure you want to cancel the booking?'
          onClose={() => {
            dispatch(setSelectedCancelBookings([]));
          }}
          open={Boolean(selectedCancelBooking.length)}
          onSubmit={() => handleFormSubmit(selectedCancelBooking)}
          submitButtonText='Yes, Proceed'
          disabled={isMutating}
          icon={WarningIcon}
          align='center'
        />
      </Box>
    </Box>
  );
};

export default BookingManagementEvchargers;
