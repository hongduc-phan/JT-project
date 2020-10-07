import React, {AllHTMLAttributes, ReactNode} from 'react';
import clsx from 'clsx';

import Typo from '../Typo';
import styles from './Button.module.css';
import {ButtonVariants} from './types';

import {TypoVariants, TypoColors, TypoAlignment} from '../Typo';

export interface IButtonProps
  extends AllHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  children: ReactNode;
  /** Class name append to root button */
  className?: string;
  variant?: ButtonVariants;
  display?: 'big';
  href?: string;
}

const Button = ({
  children,
  className,
  variant,
  display,
  href,
  ...other
}: IButtonProps) => (
  <Typo<HTMLButtonElement | HTMLAnchorElement>
    {...other}
    tag={undefined === href ? 'button' : 'a'}
    color={TypoColors.inherit}
    variant={TypoVariants.button}
    align={TypoAlignment.middle}
    href={href}
    className={clsx(
      styles.wrap,
      className,
      variant === ButtonVariants.Icon && styles.icon,
      variant === ButtonVariants.Secondary && styles.secondary,
      variant === ButtonVariants.Primary && styles.primary,
      display === 'big' && styles.big,
    )}
  >
    {children}
  </Typo>
);

export default Button;
