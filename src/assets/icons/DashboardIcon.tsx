import * as React from "react";

const DashboardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <path
      fill='#2199f3'
      d='M9.25 0h-7.5C.785 0 0 .785 0 1.75v4.5C0 7.215.785 8 1.75 8h7.5C10.215 8 11 7.215 11 6.25v-4.5C11 .785 10.215 0 9.25 0z'
      className='color2196f3 svgShape'
    />
    <path
      fill='#0071c5'
      d='M9.25 10h-7.5C.785 10 0 10.785 0 11.75v10.5C0 23.215.785 24 1.75 24h7.5c.965 0 1.75-.785 1.75-1.75v-10.5c0-.965-.785-1.75-1.75-1.75z'
      className='color1976d2 svgShape'
    />
    <path
      fill='#2199f3'
      d='M22.25 16h-7.5c-.965 0-1.75.785-1.75 1.75v4.5c0 .965.785 1.75 1.75 1.75h7.5c.965 0 1.75-.785 1.75-1.75v-4.5c0-.965-.785-1.75-1.75-1.75z'
      className='color2196f3 svgShape'
    />
    <path
      fill='#0071c5'
      d='M22.25 0h-7.5C13.785 0 13 .785 13 1.75v10.5c0 .965.785 1.75 1.75 1.75h7.5c.965 0 1.75-.785 1.75-1.75V1.75C24 .785 23.215 0 22.25 0z'
      className='color1976d2 svgShape'
    />
  </svg>
);

export default DashboardIcon;
