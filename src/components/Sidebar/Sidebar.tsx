import React, {FunctionComponent, ReactNode} from 'react';
import clsx from 'clsx';

import styles from './Sidebar.module.css';

export interface ISidebarProps {
  classNames?: {
    wrap?: string;
    content?: string;
    expand?: string;
    expandActive?: string;
  };
  children: ReactNode;
  renderExpand?: ReactNode;
  isExpanded?: boolean;
}

const Sidebar: FunctionComponent<ISidebarProps> = ({
  children,
  renderExpand,
  isExpanded,
  classNames = {},
}) => {
  const {content, expand, wrap, expandActive} = classNames;
  return (
    <div className={clsx(styles.wrap, wrap)}>
      <div className={clsx(styles.content, content)}>{children}</div>
      <div
        className={clsx(
          styles.expand,
          expand,
          isExpanded && styles.expandActive,
          isExpanded && expandActive,
        )}
      >
        {renderExpand}
      </div>
    </div>
  );
};

export default Sidebar;
