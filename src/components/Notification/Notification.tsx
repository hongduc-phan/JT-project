import React, {ReactNode} from 'react';

import styles from './Notification.module.css';

export interface INotificationProps {
  children: ReactNode;
  count?: number;
}

const Notification = ({children, count = 0}: INotificationProps) => {
  return (
    <span className={styles.notification}>
      {0 < count && <span className={styles.badge}>{count}</span>}
      {children}
    </span>
  );
};

export default Notification;
