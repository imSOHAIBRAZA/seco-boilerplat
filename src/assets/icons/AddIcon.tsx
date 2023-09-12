import * as React from "react";

const AddIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg height={24} width={24} viewBox='0 0 24 24' {...props}>
    <path fill='currentColor' d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'></path>
  </svg>
);

export default AddIcon;
