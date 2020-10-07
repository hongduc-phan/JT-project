import React, {SVGAttributes} from 'react';

export interface ISettingProps extends SVGAttributes<HTMLOrSVGElement> {
  active?: boolean;
  activeColor?: string;
}

const EPayRoll = ({
  active,
  activeColor = '#5AC46A',
  ...other
}: ISettingProps) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" {...other}>
    <g fill="none" fillRule="evenodd">
      {active && <path fill={activeColor} d="M0 3h24v13H0z" />}
      <path
        d="M0 3v13.714h24V3H0zm8.598 12H4.291a2.574 2.574 0 0 0-2.577-2.577v-4.28a3.432 3.432 0 0 0 3.429-3.429h3.455c-1.066 1.26-1.74 3.097-1.74 5.143 0 2.047.674 3.884 1.74 5.143zm13.688-2.577A2.59 2.59 0 0 0 19.714 15h-4.312c1.066-1.259 1.74-3.096 1.74-5.143 0-2.046-.674-3.884-1.74-5.143h3.455a3.432 3.432 0 0 0 3.429 3.429v4.28zM0 18.43h24v2H0v-2z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

export default EPayRoll;
