import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EVCharger, User, Booking } from "../../types";
// import { Booking } from "../../types";
import { fetchBookings, fetchBookingsAll, fetchBookingUsers, searchBookingManagement } from "./booking-management-thunk";

interface BookingManagementState {
  bookings: Booking[];
  allBookings: Booking[];
  selectedBookings: Booking[];
  bookingUsers: User[];
  selectedCancelBooking: Booking[];
  selectedStation: EVCharger | null;
  pageNo: number;
  isLoading: boolean;
  ordering: string;
  rowsPerPage: number;
  dataCount: number;
  isMutating: boolean;
  isCancelModal: boolean;
  history: any;
  query: string;
}
const initialState: BookingManagementState = {
  bookings: [],
  allBookings: [],
  pageNo: 0,
  isLoading: false,
  ordering: "",
  rowsPerPage: 10,
  dataCount: 0,
  isMutating: false,
  selectedBookings: [],
  selectedCancelBooking: [],
  bookingUsers: [],
  history: null,
  selectedStation: null,
  isCancelModal: false,
  query: "",
};

const BookingManagementSlice = createSlice({
  name: "booking-management-slice",
  initialState,
  reducers: {
    setStationSelected(state, action: PayloadAction<EVCharger | null>) {
      state.selectedStation = action.payload;
    },
    deselectStation(state) {
      state.selectedStation = null;
    },
    setVehicleRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setBookingRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setVehiclePage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setBookingPage(state, action: PayloadAction<number>) {
      state.pageNo = action.payload;
    },
    setBookingQuery(state, action: PayloadAction<string>) {
     
      state.query = action.payload;
    },
    setBookingOrdering(state, action: PayloadAction<string>) {
      state.ordering = action.payload;
    },
    setSelectedBookings(state, action: PayloadAction<Booking[]>) {
      state.selectedBookings = action.payload;
    },
    setHistory(state, action: PayloadAction<any>) {
      state.history = action.payload;
    },
    setSelectedCancelBookings(state, action: PayloadAction<Booking[]>) {
      state.selectedCancelBooking = action.payload;
    },
    setCancelToggle(state, action: PayloadAction<boolean>) {
      state.isCancelModal = action.payload;
    },

    resetBookingManagementState(state) {
      state.bookings = [];
      state.pageNo = 0;
      state.isLoading = false;
      state.ordering = "";
      state.rowsPerPage = 10;
      state.dataCount = 0;
      state.isMutating = false;
      state.selectedBookings = [];
      state.selectedCancelBooking = [];
      state.bookingUsers = [];
      state.history = null;
      state.selectedStation = null;
      state.isCancelModal = false;

    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
        state.isMutating = false;
      })
      .addCase(fetchBookings.pending, (state) => {
        state.selectedBookings = [];
        state.isLoading = true;
        state.isMutating = true;
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.isLoading = false;
        state.isMutating = false;
      })
      .addCase(fetchBookingsAll.fulfilled, (state, action) => {
        state.allBookings = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
        state.isMutating = false;
      })
      .addCase(fetchBookingsAll.pending, (state) => {
        state.selectedBookings = [];
        state.isLoading = true;
        state.isMutating = true;
      })
      .addCase(fetchBookingsAll.rejected, (state) => {
        state.isLoading = false;
        state.isMutating = false;
      })
      .addCase(fetchBookingUsers.fulfilled, (state, action) => {
        state.bookingUsers = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
        state.isMutating = false;
      })
      .addCase(searchBookingManagement.fulfilled, (state, action) => {
        state.bookings = action.payload?.results;
        state.dataCount = action.payload?.count;
        state.isLoading = false;
      })
      .addCase(searchBookingManagement.pending, (state) => {
        state.selectedBookings = [];
        state.isLoading = true;
      })
      .addCase(searchBookingManagement.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchBookingUsers.pending, (state) => {
        // state.selectedBookings = [];
        state.isLoading = true;
        state.isMutating = true;
      })
      .addCase(fetchBookingUsers.rejected, (state) => {
        state.isLoading = false;
        state.isMutating = false;
      })
  },
});

export const { setStationSelected,
   setSelectedBookings, setVehiclePage,
    setVehicleRowsPerPage, setCancelToggle,
     setSelectedCancelBookings, setBookingRowsPerPage,
      setBookingOrdering, setBookingPage, setHistory, resetBookingManagementState, setBookingQuery } =
  BookingManagementSlice.actions;

export default BookingManagementSlice;
