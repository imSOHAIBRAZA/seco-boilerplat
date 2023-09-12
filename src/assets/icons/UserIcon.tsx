import * as React from "react";

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <circle
      r='4.22857'
      transform='matrix(-1 0 0 1 11.9999 6.72857)'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='1.5'
    />
    <path
      d='M4.59961 17.2309C4.59961 16.3214 5.17137 15.5101 6.02791 15.2042C9.88959 13.825 14.1096 13.825 17.9713 15.2042C18.8278 15.5101 19.3996 16.3214 19.3996 17.2309V18.694C19.3996 19.9111 18.3216 20.846 17.1168 20.6739L15.818 20.4883C13.2853 20.1265 10.714 20.1265 8.18123 20.4883L6.88245 20.6739C5.67759 20.846 4.59961 19.9111 4.59961 18.694V17.2309Z'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='1.5'
    />
  </svg>
);

export default UserIcon;
