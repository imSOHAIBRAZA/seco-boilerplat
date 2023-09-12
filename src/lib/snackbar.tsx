import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { useContext, useState } from "react";

type ComponentT = {
  children: React.ReactNode;
};

type ContextT = {
  isActive: boolean;
  value: string;
  handleClose: () => void;
  snackbar: (Arg1: { message: string; type?: AlertColor }) => void;
};
const defaultValues = {
  isActive: false,
  value: "",
  handleClose: () => {},
  snackbar: () => {},
};

const SnackbarContext = React.createContext<ContextT>(defaultValues);

export const SnackbarProvider = ({ children }: ComponentT) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [value, setMessage] = React.useState<string>("");
  const [type, setType] = React.useState<AlertColor>("success");

  const handleClose = () => setIsActive(false);

  React.useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  }, [isActive]);

  const snackbar = ({
    message = "Something went wrong...",
    type = "success",
  }: {
    message: string;
    type?: AlertColor;
  }) => {
    setMessage(message);
    setIsActive(true);
    setType(type);
  };

  return (
    <SnackbarContext.Provider
      value={{
        isActive,
        value,
        snackbar,
        handleClose,
      }}
    >
      {children}
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={isActive}>
        <Alert onClose={handleClose} severity={type || "success"} sx={{ width: "100%" }}>
          {value}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("Must use Snackbar context on parent container ");
  }

  return context;
};
