import React from 'react';
import clsx from 'clsx';

import styles from './SidebarLogo.module.css';

export interface ISidebarLogoProps {
  src: string;
  alt: string;
  className?: string;
}

const SidebarLogo = ({src, alt, className}: ISidebarLogoProps) => {
  return <img className={clsx(styles.logo, className)} src={src} alt={alt} />;
};

export default SidebarLogo;
