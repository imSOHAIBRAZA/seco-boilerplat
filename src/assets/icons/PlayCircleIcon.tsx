import * as React from "react";

const PlayCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg height={24} width={24} viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      d='M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z'
    ></path>
  </svg>
);

export default PlayCircleIcon;
