import React, {SVGAttributes} from 'react';

const Delete = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h24v24H0z" />
      <path
        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default Delete;
