import * as React from "react";
import {
  useAppDispatch,
  useAppSelector,
  useSnackbar, serverErrorHandlers
} from "../../lib";
import {
  fetchBookings,
  fetchBookingsAll,
  fetchBookingUsers,
  patchBooking,
  searchBookingManagement,
} from "../../features/booking-management/booking-management-thunk";
import {
  fetchEVChargers,
} from "../../features/ev-charger/ev-charger-thunk";

import { setSelectedBookings, setSelectedCancelBookings } from "../../features/booking-management/booking-management-slice";
import { SearchPromiseT, SearchTimeoutT } from "../../types";
import { Booking } from "../../types/booking-management";

let searchPromise: SearchPromiseT;
let searchTimeout: SearchTimeoutT;

export const useBookingManagement = () => {
  const { snackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const rowsPerPage = useAppSelector((state) => state.bookingManagementSlice.rowsPerPage);
  const query = useAppSelector((state) => state.bookingManagementSlice.query);
  const pageNo = useAppSelector((state) => state.bookingManagementSlice.pageNo);
  const orderBy = useAppSelector((state) => state.bookingManagementSlice.ordering);
  const vehicles = useAppSelector((state) => state.vehicles.vehicles);
  const selectedBookings = useAppSelector((state) => state.bookingManagementSlice.selectedBookings);

  const [deleteModal, setDeleteModal] = React.useState<boolean>(false);
  const [searchFilter, setSearchFilter] = React.useState<string[]>([
    "device__serial_number",
    "device__vm_name",
    "user__first_name",
    "booking_status",
  ]);

  const handleSelectFilter = (value: string[]) => setSearchFilter(value);
  const toggleDeleteModal = () => setDeleteModal((prevState) => !prevState);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (values?: any) => {
    onCancelBooking(values);
  };

  const onCancelBooking = React.useCallback(async (values: Booking[]) => {
    try {
    
      console.log({ cb: values[0] });
      if (values.length) {
        dispatch(patchBooking(values)).unwrap();
      }
      dispatch(setSelectedCancelBookings([]));
      snackbar({
        message: "Booking cancel Successfully",
        type: "success",
      });
    } catch (err: unknown) {
      serverErrorHandlers(err, snackbar);
    } finally {
      dispatch(fetchBookings({ query: "" }));
    }
  }, [
    dispatch,
    selectedBookings,
  ]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value: query },
  }) => {
    clearTimeout(searchTimeout);

    setSearchQuery(query);

    searchTimeout = window.setTimeout(() => {
      searchPromise?.abort?.();
      searchPromise = dispatch(searchBookingManagement({ query, filter: searchFilter }));
    }, 500);
  };

  
  const handleFetchBookings = () => {
    dispatch(fetchEVChargers({ query: "" }));
  };

  React.useEffect(() => {
    console.log("useffect called", {query});
    dispatch(fetchBookings({ query: searchQuery, filter: searchFilter }));
    dispatch(fetchBookingsAll({ query: searchQuery, filter: searchFilter }));
    dispatch(fetchBookingUsers({ query: searchQuery, filter: searchFilter }));
    dispatch(fetchEVChargers({ query: searchQuery, filter: searchFilter }));

    dispatch(setSelectedBookings([]));
    return () => {
      searchPromise = undefined;
      clearTimeout(searchTimeout);
      searchTimeout = undefined;
    };
  }, [dispatch, rowsPerPage, pageNo, orderBy]);

  return {
    handleSearch,
    searchQuery,
    handleSelectFilter,
    searchFilter,
    vehicles,
    toggleDeleteModal,
    deleteModal,
    handleFormSubmit,
    handleFetchBookings,
  };
};
