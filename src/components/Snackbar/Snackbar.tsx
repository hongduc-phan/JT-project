import React, {
  AllHTMLAttributes,
  Fragment,
  FunctionComponent,
  ReactNode,
} from 'react';
import clsx from 'clsx';

import Typo, {TypoVariants, TypoColors} from '../Typo';

import styles from './Snackbar.module.css';

export enum SnackbarVariant {
  Error = 'error',
  Success = 'success',
}

export interface SnackbarProps extends AllHTMLAttributes<HTMLDivElement> {
  variant?: SnackbarVariant;
  children: ReactNode;
  color?: TypoColors;
  renderIcon?: ReactNode;
}

const Snackbar: FunctionComponent<SnackbarProps> = ({
  variant,
  children,
  className,
  color,
  renderIcon,
  ...rest
}: SnackbarProps) => {
  return (
    <Typo<HTMLDivElement>
      {...rest}
      tag="div"
      variant={TypoVariants.body2}
      className={clsx(
        styles.root,
        variant === SnackbarVariant.Error && styles.error,
        variant === SnackbarVariant.Success && styles.success,
        className,
      )}
      color={color}
    >
      {renderIcon && (
        <Fragment>
          <span className={styles.icon}>{renderIcon}</span>
          <span>{children}</span>
        </Fragment>
      )}
      {!renderIcon && children}
    </Typo>
  );
};

export default Snackbar;
