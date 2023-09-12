import { Box, BoxProps } from "@mui/material";
import * as React from "react";

const CloseIcon: React.FC<BoxProps> = (props) => (
  <Box position='relative' height='24px' width='24px' {...props}>
    <svg
      style={{ position: "absolute", top: 0, left: 0 }}
      width='100%'
      height='100%'
      viewBox='0 0 24 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z'
        fill='currentColor'
      />
    </svg>
  </Box>
);

export default CloseIcon;
