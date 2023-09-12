import * as React from "react";

const ExclaimationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M15.9993 6.66602C16.7357 6.66602 17.3327 7.26295 17.3327 7.99935V19.9993C17.3327 20.7357 16.7357 21.3327 15.9993 21.3327C15.2629 21.3327 14.666 20.7357 14.666 19.9993V7.99935C14.666 7.26295 15.2629 6.66602 15.9993 6.66602ZM15.9993 25.3327C16.7357 25.3327 17.3327 24.7357 17.3327 23.9993C17.3327 23.2629 16.7357 22.666 15.9993 22.666C15.2629 22.666 14.666 23.2629 14.666 23.9993C14.666 24.7357 15.2629 25.3327 15.9993 25.3327Z'
      fill='currentColor'
    />
  </svg>
);

export default ExclaimationIcon;
