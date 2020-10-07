import React, {SVGAttributes} from 'react';

const ArrowDown = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M6.175 6.667L10 10.483l3.825-3.816L15 7.842l-5 5-5-5z"
      />
      <path d="M0 20h20V0H0z" />
    </g>
  </svg>
);

export default ArrowDown;
