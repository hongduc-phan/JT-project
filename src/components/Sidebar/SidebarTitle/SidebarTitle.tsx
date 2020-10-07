import React, {FunctionComponent} from 'react';
import clsx from 'clsx';
import styles from './SidebarTitle.module.css';
import Typo, {TypoVariants} from '../../Typo';

interface ISidebarTitleProps {
  active?: boolean;
  className?: string;
}

const SidebarTitle: FunctionComponent<ISidebarTitleProps> = ({
  children,
  active,
  className,
}) => {
  return (
    <Typo
      tag="div"
      variant={TypoVariants.subTitle}
      className={clsx(styles.title, className)}
    >
      {children}
    </Typo>
  );
};

export default SidebarTitle;
