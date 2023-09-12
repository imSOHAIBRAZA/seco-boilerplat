import * as React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { PasswordBtnT } from "./Signup.types";

export const PasswordButton = ({ onClick, isPassword }: PasswordBtnT): React.ReactElement => (
  <IconButton sx={{ height: "24px", width: "24px" }} onClick={onClick}>
    {isPassword ? <VisibilityOff /> : <Visibility />}
  </IconButton>
);
