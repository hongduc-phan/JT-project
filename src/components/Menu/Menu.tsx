import React, {AllHTMLAttributes, FunctionComponent, ReactNode} from 'react';
import clsx from 'clsx';
import Typo, {TypoColors} from '../Typo';

import styles from './Menu.module.css';

export interface IMenuItemProps extends AllHTMLAttributes<HTMLUListElement> {
  color?: TypoColors;
  children: ReactNode;
}

const Menu: FunctionComponent<IMenuItemProps> = ({
  children,
  className,
  color,
  ...other
}: IMenuItemProps) => {
  return (
    <Typo<HTMLUListElement>
      tag="ul"
      className={clsx(styles.wrap, className)}
      color={color}
      {...other}
    >
      {children}
    </Typo>
  );
};

export default Menu;
