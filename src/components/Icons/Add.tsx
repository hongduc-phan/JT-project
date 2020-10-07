import React, {SVGAttributes} from 'react';

const Notification = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
      />
      <path d="M0 0h24v24H0z" />
    </g>
  </svg>
);

export default Notification;
