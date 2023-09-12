import * as React from "react";

const MarkerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    version='1.0'
    xmlns='http://www.w3.org/2000/svg'
    width='32px'
    height='32px'
    viewBox='0 0 512.000000 512.000000'
    preserveAspectRatio='xMidYMid meet'
    {...props}
  >
    <g
      transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'
      fill='currentColor'
      stroke='none'
    >
      <path
        d='M2395 4870 c-624 -71 -1148 -473 -1371 -1052 -94 -242 -131 -555 -89
  -748 81 -380 353 -896 1085 -2065 141 -226 303 -488 359 -582 107 -180 135
  -213 181 -213 45 0 74 33 166 188 48 81 221 358 384 617 525 833 659 1059 837
  1419 152 310 234 543 251 716 10 102 -3 296 -27 413 -125 600 -587 1094 -1170
  1253 -189 52 -433 73 -606 54z m309 -1010 c110 -28 190 -74 271 -155 81 -81
  127 -161 155 -271 80 -313 -110 -634 -425 -714 -431 -110 -825 284 -715 715
  81 315 400 505 714 425z'
      />
    </g>
  </svg>
);

export default MarkerIcon;
