import React, {SVGAttributes} from 'react';

const ArrowLeft = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M13.333 13.825L9.517 10l3.816-3.825L12.158 5l-5 5 5 5z"
      />
      <path d="M0 20V0h20v20z" />
    </g>
  </svg>
);

export default ArrowLeft;
