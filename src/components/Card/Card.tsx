import React, {ReactNode, AllHTMLAttributes} from 'react';

import styles from './Card.module.css';
import clsx from 'clsx';

export interface ICardProps extends AllHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card = ({children, className, ...others}: ICardProps) => (
  <div className={clsx(styles.card, className)} {...others}>
    {children}
  </div>
);

export default Card;
