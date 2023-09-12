import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import {
  WarningIcon,
  MarkerIcon,
} from "../../assets/icons";
import * as sx from "./BookingManagement.styles";
import GoogleMapReact, { Position } from "google-map-react";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { Booking } from "../../types/booking-management";
import { Modal } from "../../components";

import {
  setStationSelected,
  setSelectedBookings,
  setSelectedCancelBookings,
} from "../../features/booking-management/booking-management-slice";

import {
  API_KEYS,
  useAppDispatch,
  useAppSelector,
} from "../../lib";
import { useBookingManagement } from "./BookingManagement.hooks";
import BookingManagementEvchargers from "./BookingManagement.Evcharger";

const BookingManagement: React.FC = () => {
  const dispatch = useAppDispatch();

  const selectedBookings = useAppSelector((state) => state.bookingManagementSlice.selectedBookings);
  const selectedCancelBooking = useAppSelector(
    (state) => state.bookingManagementSlice.selectedCancelBooking,
  );
  const isMutating = useAppSelector((state) => state.bookingManagementSlice.isMutating);
  const user = useAppSelector((state) => state?.auth?.user);

  const selectedBooking = selectedBookings[0];
  const {
    handleFormSubmit,
  } = useBookingManagement();

  console.log({ selectedBookings, selectedBooking });
  if (!selectedBooking) {
    return <BookingManagementEvchargers />;
  }

  const defaultProps = {
    center: {
      lat: selectedBooking?.device?.address?.latitude,
      lng: selectedBooking?.device?.address?.longitude,
    },
    zoom: 11,
  };

  const Marker: React.FC<Position> = () => {
    return (
      <Box sx={{ color: "error.main", "& > svg": { color: "inherit" } }}>
        <MarkerIcon />
      </Box>
    );
  };

  return (
    <Box sx={sx.root}>
      <Box>
        <Button
          disabled={isMutating}
          variant='outlined'
          onClick={() => {
            if (selectedBookings.length > 0) {
              dispatch(setSelectedBookings([]));
            } else {
              dispatch(setStationSelected(null));
            }
          }}
        >
          GO BACK
        </Button>
      </Box>
      <Box sx={sx.card}>
        <Box>
          <Typography variant='body1' color='primay.900' fontWeight={600}>
            EV Booking Date/Time
          </Typography>
          <Typography variant='body2' color='primay.900' mt={0.5}>
            {moment(selectedBooking?.schedule_at).format("MM-DD-YYYY hh:mm:ss A")}
          </Typography>
          <Box sx={sx.carImgWrapper}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: API_KEYS.GOOGLE_MAP as string }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
            </GoogleMapReact>
          </Box>
        </Box>
        <Box>
          <Box>
            <Box sx={sx.warningCard}>
              <Box sx={sx.warningCardHeader}>
                <Box>
                  <Typography variant='h6' color='primary.900' fontWeight={600} lineHeight='24px'>
                    EV Booking details
                  </Typography>
                </Box>
              </Box>
              <Typography variant='body2' color='primay.900'>
                EV charger parking is occupied by a car with plate: {selectedBooking?.vehicle?.vehicle_number ?? "---"}
                <br />
                <br />
                if you want to send a message to the removal personnel click here and the following
                text will be sent.
                <br />
                <br />
                &quot;A car is occupying the parking lot illegally in via xxxx and needs to be
                removed&ldquo;
                <br />
              </Typography>
              <Box sx={sx.occupancyCard}>
                <Typography variant='body2' color='primary.900'>
                  Cancel Policy:{" "}
                  <Typography component='span' color='primary' fontWeight={600}>
                    xyz info
                  </Typography>
                </Typography>
                <Button
                  onClick={() => dispatch(setSelectedCancelBookings([selectedBooking as Booking]))}
                  color='error'
                  size='small'
                  variant='outlined'
                  startIcon={<DeleteIcon />}
                  disabled={!(selectedBooking?.booking_status === "booked") || user?.type === "VU"}
                >
                  Cancel Booking
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
                    {selectedBooking?.vehicle?.vehicle_model ?? "---"}
                  </Typography>
                </Typography>
              </Box>
              <Typography variant='body1' color='primary.900' pr={{ lg: 14.5 }}>
                Plate:{" "}
                <Typography component='span' color='primary' fontWeight={600} mt={0.5}>
                  {selectedBooking?.vehicle?.vehicle_number ?? "---"}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
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
  );
};

export default BookingManagement;
