import { User } from "./user";
import { EVCharger } from "./ev-charger";

export type Vehicle = {
  id: number;
  vehicle_model: string;
  vehicle_number: string;
  plate_date: string;
}

export type Booking = {
  id: number;
  user: User;
  device: EVCharger;
  is_paid: boolean;
  booking_status: string;
  created_at: Date;
  updated_at: Date;
  schedule_at: Date;
  cancel_at: Date;
  vehicle: Vehicle;
};