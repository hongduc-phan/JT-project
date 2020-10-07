import React, {ReactNode, AllHTMLAttributes} from 'react';
import clsx from 'clsx';

import styles from './Topbar.module.css';

export interface ITopbarProps extends AllHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Topbar = ({children, className, ...others}: ITopbarProps) => {
  return (
    <div className={clsx(styles.topbar, className)} {...others}>
      {children}
    </div>
  );
};

export default Topbar;
