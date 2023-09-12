import * as React from "react";
import { Table, IconButton } from "../../components";
import * as mocks from "./BookingManagement.mocks";
import { Box, Typography, Button } from "@mui/material";
import {
  setHistory,
  setBookingOrdering,
  setBookingPage,
  setBookingRowsPerPage,
  setBookingQuery,
} from "../../features/booking-management/booking-management-slice";
import { useAppDispatch, useAppSelector, rootStyles, getScreenDescription } from "../../lib";
import { SearchField } from "./components";
import {
  fetchBookings,
  fetchBookingsAll,
} from "../../features/booking-management/booking-management-thunk";
import { fetchEVChargers } from "../../features/ev-charger/ev-charger-thunk";
import { useBookingManagement } from "./BookingManagement.hooks";
import { useEVChargers } from "../EVCharger/EVCharger.hooks";
import { ExportIcon } from "../../assets/icons";
import { CSVLink } from "react-csv";

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
    searchQuery,
    handleSelectFilter,
    handleFetchBookings,
    // searchFilter,
    handleSearch,
  } = useBookingManagement();

  useEVChargers();
  const history = useAppSelector((state) => state.bookingManagementSlice.history);
  const allBookings = useAppSelector((state) => state.bookingManagementSlice.allBookings);
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
  const [filteredBookings, setFilteredBookings] = React.useState<any>([]);


  const handlePageChange = (page: number) => {
    dispatch(setBookingPage(page));
    setPage(page);
  };

  React.useEffect(() => {
    let searchQuery = "";
    if (history.type === "user") {
      searchQuery = `?user=${history?.data?.id}`;
    } else {
      searchQuery = `?device=${history?.data?.id}`;
    }

    dispatch(setBookingQuery(searchQuery));

    dispatch(fetchBookings({ query: searchQuery }));
    dispatch(fetchBookingsAll({ query: searchQuery }));
  }, [page]);
  React.useEffect(() => {
    handleFetchBookings();

    return () => {
      dispatch(setBookingQuery(""));
    };
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
      <Box>
        <Button
          variant='outlined'
          onClick={() => {
            dispatch(setHistory(null));
            dispatch(fetchEVChargers({ query: "" }));
          }}
        >
          GO BACK
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
        <SearchField value={searchQuery} onChange={handleSearch} onSelect={handleSelectFilter} />
        <CSVLink data={filteredBookings} filename={"filteredBookings.csv"} style={{ textDecoration: "none" }}>
          <IconButton icon={ExportIcon} sx={{ marginRight: "10px" }} variant='contained'>
            Export
          </IconButton>
        </CSVLink>
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
