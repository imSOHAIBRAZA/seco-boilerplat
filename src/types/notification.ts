export type Notification = {
  id: number;
  created_at: string;
  updated_at: string;
  device_id: string | null;
  serial_no: string;
  type: string;
  category: string | null;
  level: number | null;
  message: string;
  status: string;
  received_timestamp: string;
  is_read: boolean;
  serial_number: number | string;
};
