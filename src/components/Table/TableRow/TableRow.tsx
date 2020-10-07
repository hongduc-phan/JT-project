import React, {ReactNode, AllHTMLAttributes} from 'react';

export interface ITableRowProps extends AllHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

const TableRow = ({children, ...others}: ITableRowProps) => {
  return <tr {...others}>{children}</tr>;
};

export default TableRow;
