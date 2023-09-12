import React from "react";
import { Button, Chip, Box } from "@mui/material";
import { HeadCell } from "../../components/Table/Table.types";
import { dispatch, useAppSelector, rootStyles } from "../../lib";
import {
  setSelectedBookings,
  setSelectedCancelBookings,
  setHistory,
} from "../../features/booking-management/booking-management-slice";
import { Booking } from "../../types/booking-management";
import moment from "moment";
import * as sx from "./BookingManagement.styles";

// const typesLabels: LabelsT = {
//   SA: "Super Admin",
//   CA: "Customer Admin",
//   EU: "End User",
//   SU: "Support User",
//   DE: "DevOps Admin",
//   FO: "Floor Operator",
//   OP: "Operator",
//   GA: "Group Admin",
//   EM: "Employee",
// };4

const occupancyStateData: any = {
  available: "Available",
  occupied: "Occupied",
  out_of_service: "Out Of Service",
  booked: "Booked",
  locked: "Locked",
};
const bookingStatusData: any = {
  booked: "Booked",
  route_set: "On the way",
  reach_to_ps: "Reached",
  charging_start: "Charging",
  charging_stop: "Completed",
  cancelled: "Cancelled",
};
export const HistoryHeadRowData: HeadCell[] = [
  {
    id: "model",
    label: "Model",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "plate",
    label: "Plate",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "entry",
    label: "Entry",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "exit",
    label: "Exit",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "date",
    label: "Date",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (_, value: string) => (
      <Chip color={value !== "Online" ? "error" : "success"} label={value || "Working"} />
    ),
  },
];

export const UsersHeadRowData: HeadCell[] = [
  {
    id: "id",
    label: "ID",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "first_name",
    label: "Name",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: ({ first_name: firstName, last_name: lastName }) => firstName + " " + lastName,
  },
  {
    id: "email",
    label: "Email",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "mobile_number",
    label: "Mobile Number",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (user) => (
      <Button
        onClick={() => dispatch(setHistory({ type: "user", data: user }))}
        variant='contained'
        size='small'
      >
        View user History
      </Button>
    ),
  },
];

export const EVHeadRowData: HeadCell[] = [
  {
    id: "id",
    label: "ID",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "serial_number",
    label: "Serial Number",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "vm_name",
    label: "Name",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "occupancy_state",
    label: "Status",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: ({ occupancy_state: occupancyState }) => (
      <Chip
        color={
          occupancyState === "available"
            ? "success"
            : occupancyState === "occupied" || occupancyState === "booked"
            ? "warning"
            : "error"
        }
        label={<>{occupancyStateData[occupancyState]}</>}
      />
    ),
  },
  {
    id: "status",
    label: "Network Status",
    numeric: true,
    disablePadding: false,
    align: "left",
    render: (_: unknown, connected: boolean) => (
      <Chip
        color={connected ? "success" : "error"}
        label={
          <>
            <Box sx={connected ? rootStyles.successIndicator : rootStyles.errorIndicator} />
            {connected ? "Connected" : "Not Connected"}
          </>
        }
      />
    ),
  },
  {
    id: "action",
    label: "Action",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (device) => (
      <Button
        onClick={() => dispatch(setHistory({ type: "device", data: device }))}
        variant='contained'
        size='small'
      >
        View Device History
      </Button>
    ),
  },
];
export const HistoryData = [
  {
    model: "Opel-e-corsa 940kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Online",
  },
  {
    model: "Tesla modelX 240kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Offline",
  },
  {
    model: "Opel-e-corsa 940kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Online",
  },
  {
    model: "Tesla modelX 240kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Offline",
  },
  {
    model: "Opel-e-corsa 940kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Online",
  },
  {
    model: "Tesla modelX 240kw",
    plate: "AAA 000",
    entry: "19:02",
    exit: "20:09",
    date: "18/08/2022",
    status: "Offline",
  },
];

export const VehicleRowData: HeadCell[] = [
  {
    id: "vehicle_number",
    label: "Number",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "vehicle_model",
    label: "Model",
    numeric: false,
    disablePadding: false,
    align: "left",
  },
  {
    id: "plate_Date",
    label: "Plate Date",
    numeric: true,
    disablePadding: false,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    numeric: false,
    disablePadding: false,
    align: "left",
    render: (booking) => (
      <Button
        onClick={() => dispatch(setSelectedBookings([booking as Booking]))}
        variant='contained'
        size='small'
      >
        View Details
      </Button>
    ),
  },
];

export const BookingHeadRowData: HeadCell[] = [
  {
    id: "serial_number",
    label: "Serial Number",
    numeric: true,
    disablePadding: false,
    align: "center",
    render: ({ device }) => device?.serial_number,
  },
  {
    id: "vm_name",
    label: "Name",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ device }) => device?.vm_name,
  },
  {
    id: "users",
    label: "User",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ user }) => user?.first_name + " " + user?.last_name,
  },
  {
    id: "location",
    label: "Location",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ device }) => device?.address?.address,
  },
  {
    id: "booking_status",
    label: "Status",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ booking_status: bookingStatus }) => (
      <Chip
        color={
          bookingStatus === "booked" ||
          bookingStatus === "charging_start" ||
          bookingStatus === "charging_stop"
            ? "success"
            : bookingStatus === "cancelled"
            ? "error"
            : bookingStatus === "route_set" || bookingStatus === "reach_to_ps"
            ? "warning"
            : "warning"
        }
        label={<>{bookingStatusData[bookingStatus]}</>}
      />
    ),
  },

  {
    id: "booking_date",
    label: "Booking Date/Time",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ created_at: createdAt }) => moment(createdAt).format("MM-DD-YYYY hh:mm:ss A"),
  },
  {
    id: "due_booking_date",
    label: "Due Booking Date/Time",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ schedule_at: scheduleAt }) => moment(scheduleAt).format("MM-DD-YYYY hh:mm:ss A"),
  },
  {
    id: "booking_cancelation",
    label: "Booking Cancelation Date/Time",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ cancel_at: cancelAt }) =>
      moment(cancelAt).format("MM-DD-YYYY hh:mm:ss A") === "Invalid date"
        ? "---"
        : moment(cancelAt).format("MM-DD-YYYY hh:mm:ss A"),
  },
  {
    id: "action",
    label: "Action",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: (booking) => {
      const user = useAppSelector((state) => state?.auth?.user);
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => dispatch(setSelectedBookings([booking as Booking]))}
            variant='contained'
            size='small'
          >
            View Details
          </Button>{" "}
          <Button
            onClick={() => dispatch(setSelectedCancelBookings([booking as Booking]))}
            color='error'
            size='small'
            sx={sx.cancelButton}
            variant='outlined'
            disabled={!(booking?.booking_status === "booked") || user?.type === "VU"}
          >
            Cancel Booking
          </Button>
        </div>
      );
    },
  },
];

export const BookingHistoryHeadRowData: HeadCell[] = [
  {
    id: "serial_number",
    label: "Serial Number",
    numeric: true,
    disablePadding: false,
    align: "center",
    render: ({ device }) => device?.serial_number,
  },
  {
    id: "vm_name",
    label: "Name",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ device }) => device?.vm_name,
  },
  {
    id: "users",
    label: "User",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ user }) => user?.first_name + " " + user?.last_name,
  },
  {
    id: "location",
    label: "Location",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ device }) => device?.address?.address,
  },
  {
    id: "booking_status",
    label: "Status",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ booking_status: bookingStatus }) => (
      // <Chip
      //   color={bookingStatus === "booked" ? "success" : "error"}
      //   label={
      //     <>
      //       <Box
      //         sx={
      //           bookingStatus === "booked" ? rootStyles.successIndicator : rootStyles.errorIndicator
      //         }
      //       />

      //       {bookingStatus}
      //     </>
      //   }
      // />
      <Chip
        color={
          bookingStatus === "booked" ||
          bookingStatus === "charging_start" ||
          bookingStatus === "charging_stop"
            ? "success"
            : bookingStatus === "cancelled"
            ? "error"
            : bookingStatus === "route_set" || bookingStatus === "reach_to_ps"
            ? "warning"
            : "warning"
        }
        label={<>{bookingStatusData[bookingStatus]}</>}
      />
    ),
  },
  {
    id: "booking_date",
    label: "Booking Date/Time",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ created_at: createdAt }) => moment(createdAt).format("MM-DD-YYYY hh:mm:ss A"),
  },
  {
    id: "due_booking_date",
    label: "Due Booking Date/Time",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ schedule_at: scheduleAt }) => moment(scheduleAt).format("MM-DD-YYYY hh:mm:ss A"),
  },
  {
    id: "booking_cancelation",
    label: "Booking Cancelation Date/Time",
    numeric: false,
    disablePadding: false,
    align: "center",
    render: ({ cancel_at: cancelAt }) =>
      moment(cancelAt).format("MM-DD-YYYY hh:mm:ss A") === "Invalid date"
        ? "---"
        : moment(cancelAt).format("MM-DD-YYYY hh:mm:ss A"),
  },
];
