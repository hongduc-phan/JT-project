import React, {ReactNode, AllHTMLAttributes} from 'react';

import styles from './Table.module.css';

export interface ITableProps extends AllHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

const Table = ({children, ...others}: ITableProps) => {
  return (
    <table className={styles.table} {...others}>
      {children}
    </table>
  );
};

export default Table;
