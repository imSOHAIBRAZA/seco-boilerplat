import * as React from "react";
import {
  fetchNextNotifications,
  fetchNotifications,
  patchNotification,
} from "../../features/notification/notification-thunk";
import useIntersectionObserver from "@react-hook/intersection-observer";
import { useAppDispatch, useAppSelector } from "../../lib";

export const useNotifications = () => {
  const iRef = React.useRef(null);
  const { isIntersecting } = useIntersectionObserver(iRef);
  const dispatch = useAppDispatch();

  const page = useAppSelector((state) => state.notification.page);

  React.useEffect(() => {
    dispatch(fetchNotifications());
  }, []);
  
  React.useEffect(() => {
    if (isIntersecting) {
      dispatch(fetchNextNotifications(page + 1));
    }
  }, [isIntersecting]);

  const readNotification = async (id: number) => {
    await dispatch(patchNotification(id));
  };

  return {
    readNotification,
    iRef
  };
};
