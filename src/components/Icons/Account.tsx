import React, {SVGAttributes} from 'react';

const Notification = (props: SVGAttributes<HTMLOrSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 36 36" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        d="M18 3C9.72 3 3 9.72 3 18c0 8.28 6.72 15 15 15 8.28 0 15-6.72 15-15 0-8.28-6.72-15-15-15zm0 4.5c2.49 0 4.5 2.01 4.5 4.5s-2.01 4.5-4.5 4.5-4.5-2.01-4.5-4.5 2.01-4.5 4.5-4.5zm0 21.3a10.8 10.8 0 0 1-9-4.83c.045-2.985 6-4.62 9-4.62 2.985 0 8.955 1.635 9 4.62a10.8 10.8 0 0 1-9 4.83z"
        fill="currentColor"
        fillRule="nonzero"
      />
      <path d="M0 0h36v36H0z" />
    </g>
  </svg>
);

export default Notification;
