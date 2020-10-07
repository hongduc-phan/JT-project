import React, {SVGAttributes} from 'react';

const ArrowLeft = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M6.667 6.175L10.483 10l-3.816 3.825L7.842 15l5-5-5-5z"
      />
      <path d="M20 0v20H0V0z" />
    </g>
  </svg>
);

export default ArrowLeft;
