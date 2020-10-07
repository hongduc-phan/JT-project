import React, {SVGAttributes} from 'react';

const ArrowLeft = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M6.175 13.333L10 9.517l3.825 3.816L15 12.158l-5-5-5 5z"
      />
      <path d="M0 0h20v20H0z" />
    </g>
  </svg>
);

export default ArrowLeft;
