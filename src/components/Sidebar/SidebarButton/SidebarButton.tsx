import React, {FunctionComponent, AllHTMLAttributes} from 'react';
import clsx from 'clsx';

import styles from './SidebarButton.module.css';

interface ISidebarButtonProps extends AllHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  className?: string;
}

const SidebarButton: FunctionComponent<ISidebarButtonProps> = ({
  children,
  active,
  className,
  ...others
}) => {
  return (
    <button
      {...others}
      className={clsx(className, styles.icon, active && styles.iconActive)}
    >
      {children}
    </button>
  );
};

export default SidebarButton;
