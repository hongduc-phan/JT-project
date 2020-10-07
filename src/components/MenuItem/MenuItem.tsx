import React, {AllHTMLAttributes, FunctionComponent, ReactNode} from 'react';
import clsx from 'clsx';
import Typo, {TypoColors} from '../Typo';

import styles from './MenuItem.module.css';

export interface IMenuItemProps extends AllHTMLAttributes<HTMLLIElement> {
  value: any;
  color?: TypoColors;
  children: ReactNode;
  selected?: boolean;
}

const MenuItem: FunctionComponent<IMenuItemProps> = ({
  value,
  children,
  className,
  color,
  selected,
  ...other
}: IMenuItemProps) => {
  return (
    <Typo<HTMLLIElement>
      tag="li"
      className={clsx(styles.wrap, className, selected && styles.selected)}
      color={color}
      {...other}
    >
      {children}
    </Typo>
  );
};

export default MenuItem;
