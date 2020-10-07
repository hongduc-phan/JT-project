import React, {FunctionComponent, ReactNode} from 'react';
import clsx from 'clsx';
import styles from './ModalAction.module.css';

export interface ModalActionProps {
  className?: string;
  children?: ReactNode;
}

const ModalAction: FunctionComponent<ModalActionProps> = ({
  children,
  className,
}: ModalActionProps) => {
  return <div className={clsx(styles.root, className)}>{children}</div>;
};

export default ModalAction;
