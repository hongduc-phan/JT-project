import React, {ReactNode, AllHTMLAttributes} from 'react';
import clsx from 'clsx';

import TableContext from '../TableContext';

import styles from './TableHead.module.css';

export interface ITableHeadProps
  extends AllHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
  className?: string;
}

const contextValue = {variant: 'head'};

const TableHead = ({children, className, ...others}: ITableHeadProps) => {
  return (
    <TableContext.Provider value={contextValue}>
      <thead className={clsx(styles.tableHead, className)} {...others}>
        {children}
      </thead>
    </TableContext.Provider>
  );
};

export default TableHead;
