import React, {FunctionComponent, createContext} from 'react';
import clsx from 'clsx';
import styles from './SidebarMenu.module.css';
import {SidebarMenuVariant} from '../types';

export interface ISidebarMenuProps {
  className?: string;
  variant?: SidebarMenuVariant;
}

export const SidebarMenuContext = createContext({
  variant: SidebarMenuVariant.Default,
});

const SidebarMenu: FunctionComponent<ISidebarMenuProps> = ({
  children,
  className,
  variant = SidebarMenuVariant.Default,
}) => {
  return (
    <SidebarMenuContext.Provider
      value={{
        variant,
      }}
    >
      <ul className={clsx(styles.menus, className)}>{children}</ul>
    </SidebarMenuContext.Provider>
  );
};

export default SidebarMenu;
