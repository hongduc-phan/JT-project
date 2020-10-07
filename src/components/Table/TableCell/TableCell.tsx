import React, {ReactNode, AllHTMLAttributes} from 'react';
import clsx from 'clsx';

import TableContext from '../TableContext';
import Typo, {TypoVariants, TypoColors} from '../../Typo';

import styles from './TableCell.module.css';

export interface ITableCellProps
  extends AllHTMLAttributes<
    HTMLTableHeaderCellElement | HTMLTableDataCellElement
  > {
  children?: ReactNode;
  className?: string;
}

export interface ITableHeadCellProps
  extends AllHTMLAttributes<HTMLTableHeaderCellElement> {
  children: ReactNode;
  className?: string;
}

export interface ITableBodyCellProps
  extends AllHTMLAttributes<HTMLTableDataCellElement> {
  children: ReactNode;
  className?: string;
}

const TableHeadCell = ({
  children,
  className,
  ...others
}: ITableHeadCellProps) => {
  return (
    <th className={clsx(styles.column, className)} {...others}>
      <Typo variant={TypoVariants.body2} color={TypoColors.greyDark}>
        {children}
      </Typo>
    </th>
  );
};

const TableBodyCell = ({
  children,
  className,
  ...others
}: ITableHeadCellProps) => {
  return (
    <td className={clsx(styles.cell, className)} {...others}>
      {children}
    </td>
  );
};

const TableCell = ({children, className, ...others}: ITableCellProps) => {
  return (
    <TableContext.Consumer>
      {(contextValue) => {
        if ('head' === contextValue.variant) {
          return (
            <TableHeadCell className={className} {...others}>
              {children}
            </TableHeadCell>
          );
        }

        return (
          <TableBodyCell className={className} {...others}>
            {children}
          </TableBodyCell>
        );
      }}
    </TableContext.Consumer>
  );
};

export default TableCell;
