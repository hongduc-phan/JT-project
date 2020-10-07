import React, {AllHTMLAttributes, useRef, useState} from 'react';
import clsx from 'clsx';

import {
  Notification as IconNotification,
  Account as IconAccount,
} from '../../components/Icons';
import Notification from '../../components/Notification';

import styles from './UserNavigationContainer.module.css';
import Select from '../../components/Select';
import MenuItem from '../../components/MenuItem';
import {RootState} from '../../store';
import {usersActions} from '../../features/users';
import {connect} from 'react-redux';

export interface IUserNavigationContainerProps
  extends AllHTMLAttributes<HTMLDivElement> {
  className?: string;
  onLogout: () => void;
  isLogged: boolean;
}

const UserNavigationContainer = ({
  isLogged,
  className,
  onLogout,
  ...others
}: IUserNavigationContainerProps) => {
  const navigationEl = useRef(null);

  const [openSelectAccount, setOpenSelectAccount] = useState<boolean>(false);

  function handlerClickIconAccount() {
    setOpenSelectAccount(true);
  }

  function onRequestCloseSelectAccount() {
    setOpenSelectAccount(false);
  }

  return (
    <div className={clsx(styles.navigation, className)} {...others}>
      <span className={styles.navigationIcon}>
        <Notification count={2}>
          <IconNotification className={styles.icon} />
        </Notification>
      </span>
      {openSelectAccount && (
        <Select
          anchor={navigationEl.current}
          open={openSelectAccount}
          onRequestCloseSelect={onRequestCloseSelectAccount}
        >
          <MenuItem value="profile">Profile</MenuItem>
          <MenuItem value="approvals">My Approvals</MenuItem>
          <MenuItem onClick={onLogout} value="logout">
            Logout
          </MenuItem>
        </Select>
      )}
      <span
        onClick={handlerClickIconAccount}
        ref={navigationEl}
        className={styles.navigationIcon}
      >
        <IconAccount className={styles.icon} />
      </span>
    </div>
  );
};

const mapStateToProps = ({user}: RootState) => ({
  isLogged: user.isLogged,
});

const mapDispatchToPros = {
  onLogout: usersActions.logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToPros,
)(UserNavigationContainer);
