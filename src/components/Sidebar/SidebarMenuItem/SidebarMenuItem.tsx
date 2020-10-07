import React, {AllHTMLAttributes, FunctionComponent, ReactNode} from 'react';
import clsx from 'clsx';
import Collapsible from 'react-collapsible';

import Typo, {TypoColors, TypoVariants} from '../../Typo';
import {ArrowDown, ArrowUp} from '../../Icons';

import styles from './SidebarMenuItem.module.css';
import {SidebarMenuContext} from '../SidebarMenu/SidebarMenu';
import {SidebarMenuVariant} from '../types';

export interface ISidebarMenuProps extends AllHTMLAttributes<HTMLLIElement> {
  active?: boolean;
  className?: string;
  sub?: ReactNode;
}

const SidebarMenuItem: FunctionComponent<ISidebarMenuProps> = ({
  children,
  active,
  className,
  sub,
  ...other
}) => {
  function renderMenuItemWithSub(isStyleSub: boolean, opened?: boolean) {
    return (
      <li
        {...other}
        className={clsx(
          !isStyleSub && styles.menu,
          isStyleSub && styles.subMenu,
          active && !isStyleSub && styles.menuActive,
          active && isStyleSub && styles.subMenuActive,
          className,
        )}
      >
        <Typo variant={TypoVariants.h5} color={TypoColors.inherit}>
          {children}
        </Typo>
        {typeof opened === 'boolean' && (
          <span className={styles.menuIcon}>
            {opened ? <ArrowUp /> : <ArrowDown />}
          </span>
        )}
      </li>
    );
  }

  if (sub) {
    return (
      <Collapsible
        open={active}
        easing="ease-in-out"
        trigger={renderMenuItemWithSub(false, false)}
        triggerWhenOpen={renderMenuItemWithSub(false, true)}
      >
        {sub}
      </Collapsible>
    );
  }

  return (
    <SidebarMenuContext.Consumer>
      {(v) => {
        return renderMenuItemWithSub(v.variant === SidebarMenuVariant.Sub);
      }}
    </SidebarMenuContext.Consumer>
  );
};

export default SidebarMenuItem;
