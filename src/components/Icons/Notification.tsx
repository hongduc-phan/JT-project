import React, {SVGAttributes} from 'react';

const Notification = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
    <path
      d="M18 33c1.65 0 3-1.35 3-3h-6a3 3 0 0 0 3 3zm9-9v-7.5c0-4.605-2.46-8.46-6.75-9.48V6A2.247 2.247 0 0 0 18 3.75 2.247 2.247 0 0 0 15.75 6v1.02C11.445 8.04 9 11.88 9 16.5V24l-3 3v1.5h24V27l-3-3z"
      fill="currentColor"
      fillRule="nonzero"
    />
  </svg>
);

export default Notification;
