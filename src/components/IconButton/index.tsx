import * as React from "react";
import { Box, Button } from "@mui/material";
import * as sx from "./IconButton.styles";
import * as types from "./IconButton.types";

const IconButton: React.FC<types.PropsT> = (props) => {
  return (
    <Button
      onClick={props.onClick}
      variant={props?.variant || "contained"}
      disabled={props?.disabled}
      color={props?.color}
      sx={props.sx}
    >
      <Box sx={sx.buttonIcon}>
        <props.icon />
      </Box>
      {props.children}
    </Button>
  );
};

export default IconButton;
