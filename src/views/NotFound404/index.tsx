import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ErrorCard } from "../../components";
import { routes } from "../../lib/routeConfig";

const NotFound404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorCard
      title='404'
      subTitle='Page Not Found!'
      description='Sorry, Requested page is not available'
      buttonText='Go to Home'
      onClick={() => navigate(routes.dashboard.index)}
    />
  );
};

export default NotFound404;
