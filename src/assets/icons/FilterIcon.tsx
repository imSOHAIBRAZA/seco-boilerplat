import * as React from "react";
import { Box, SxProps, Theme } from "@mui/material";

interface PropsT {
  sx: SxProps<Theme>;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const FilterIcon: React.FC<PropsT> = (props) => (
  <Box sx={props.sx} onClick={props.onClick}>
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <mask
        id='mask0_517_1023'
        style={{ maskType: "alpha" }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='24'
        height='24'
      >
        <rect width='24' height='24' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_517_1023)'>
        <path d='M10 18V16H14V18H10ZM6 13V11H18V13H6ZM3 8V6H21V8H3Z' fill='currentColor' />
      </g>
    </svg>
  </Box>
);

export default FilterIcon;
