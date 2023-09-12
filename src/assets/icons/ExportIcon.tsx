import * as React from "react";

const ExportIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <mask
      id='mask0_517_1013'
      style={{ maskType: "alpha" }}
      maskUnits='userSpaceOnUse'
      x='0'
      y='0'
      width='20'
      height='20'
    >
      <rect width='20' height='20' fill='#D9D9D9' />
    </mask>
    <g mask='url(#mask0_517_1013)'>
      <path
        d='M4.99998 19.1668C4.54165 19.1668 4.14942 19.0038 3.82331 18.6777C3.49665 18.351 3.33331 17.9585 3.33331 17.5002V8.3335C3.33331 7.87516 3.49665 7.48266 3.82331 7.156C4.14942 6.82989 4.54165 6.66683 4.99998 6.66683H7.49998V8.3335H4.99998V17.5002H15V8.3335H12.5V6.66683H15C15.4583 6.66683 15.8508 6.82989 16.1775 7.156C16.5036 7.48266 16.6666 7.87516 16.6666 8.3335V17.5002C16.6666 17.9585 16.5036 18.351 16.1775 18.6777C15.8508 19.0038 15.4583 19.1668 15 19.1668H4.99998ZM9.16665 13.3335V4.021L7.83331 5.35433L6.66665 4.16683L9.99998 0.833496L13.3333 4.16683L12.1666 5.35433L10.8333 4.021V13.3335H9.16665Z'
        fill='currentColor'
      />
    </g>
  </svg>
);

export default ExportIcon;
