import * as React from "react";

const SwitchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M16.3 5H7.7C4 5 1 8 1 11.7C1 15.4 4 18.4 7.7 18.4H16.3C20 18.4 23 15.4 23 11.7C23 8 20 5 16.3 5Z'
      fill='currentColor'
    />
    <path
      d='M16.3 14.7C17.9569 14.7 19.3 13.3569 19.3 11.7C19.3 10.0432 17.9569 8.70001 16.3 8.70001C14.6432 8.70001 13.3 10.0432 13.3 11.7C13.3 13.3569 14.6432 14.7 16.3 14.7Z'
      fill='white'
    />
  </svg>
);

export default SwitchIcon;
