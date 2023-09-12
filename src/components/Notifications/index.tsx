import * as React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { useAppSelector } from "../../lib";
import formatDistance from "date-fns/formatDistance";
import { NotificationSkeleton } from "../../components";
import CloseIcon from "../../assets/icons/CloseIcon";
import { INotificationsProps } from "./notifications.types";
import { useNotifications } from "./notifications.hooks";
import _ from "lodash";

const Notifications: React.FC<INotificationsProps> = ({ onClose }) => {
  const notifications = useAppSelector((state) => state.notification.notifications);
  const isLoading = useAppSelector((state) => state.notification.isLoading);
  const hasNextPage = useAppSelector((state) => state.notification.hasNextPage);
  const { iRef, readNotification } = useNotifications();

  return (
    <Box sx={{ width: "320px", display: "flex", flexDirection: "column", maxHeight: 600 }}>
      <Box
        sx={{
          borderBottom: "1px solid #CCC",
          px: 2,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography>Notifications</Typography>
        <CloseIcon
          sx={{ cursor: "pointer" }}
          onClick={() => {
            onClose();
          }}
        />
      </Box>
      <Box sx={{ width: "100%", maxHeight: 400, overflow: "auto" }}>
        <Stack>
          {notifications?.length > 0 &&
            notifications.map((notify, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  gap: 2,
                  p: 2,
                  borderBottom: "1px solid #CCC",
                  backgroundColor: notify.is_read ? "#FFFFFF" : "#fdeded",
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "#FFFFFF",
                  },
                }}
                onClick={() => {
                  readNotification(notify.id);
                }}
              >
                <ReportProblemIcon sx={{ color: grey[600] }} />
                <Box>
                  <Typography variant='body1' fontWeight={500} lineHeight={1}>
                    {notify.message}
                  </Typography>
                  <Typography variant='caption' fontWeight={400} color={grey[600]}>
                    {formatDistance(new Date(notify.updated_at), new Date(), { addSuffix: true })}
                  </Typography>
                </Box>
              </Box>
            ))}
          {notifications.length <= 0 && !isLoading && (
            <Box
              sx={{
                p: 2,
                borderBottom: "1px solid #CCC",
                backgroundColor: "#FFFFFF",
              }}
            >
              <Typography variant='body1' fontWeight={500} lineHeight={1}>
                No Notifications Yet
              </Typography>
              <Typography variant='caption' fontWeight={400} color={grey[600]}>
                We&apos;ll notify you when something arrives.
              </Typography>
            </Box>
          )}
          
          {isLoading && _.map(new Array(5).fill(0), (_, index) => <NotificationSkeleton key={index} />)}

          {hasNextPage && (
            <Box ref={iRef} sx={{ width: "100%", height: "4px" }}>
              {" "}
            </Box>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Notifications;
