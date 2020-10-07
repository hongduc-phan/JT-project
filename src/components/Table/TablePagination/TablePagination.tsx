import React, {useState} from 'react';

import MenuItem from '../../MenuItem';
import Typo, {TypoVariants, TypoColors} from '../../Typo';
import TextField from '../../TextField';

import Button, {ButtonVariants} from '../../Button';
import {ArrowLeft, ArrowRight} from '../../Icons';

import styles from './TablePagination.module.css';

export interface ITablePaginationProps {
  labelRowsPerPage?: string;
  page: number;
  count: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (value: number) => void;
}

const labelDisplayedRows = (from: number, to: number, count: number) => {
  return `${from}-${to} of ${count}`;
};

const TablePagination = ({
  labelRowsPerPage,
  page,
  count,
  rowsPerPage,
  rowsPerPageOptions = [10, 25, 50, 100],
  onChangePage,
  onChangeRowsPerPage,
}: ITablePaginationProps) => {
  const [maxPage, setMaxPage] = useState(Math.ceil(count / rowsPerPage));

  const handleOnClickPreviousButton = () => {
    if (onChangePage) {
      let newPage = page - 1;
      newPage = newPage < 1 ? 1 : newPage;
      onChangePage(newPage);
    }
  };

  const handleOnClickNextButton = () => {
    if (onChangePage) {
      let newPage = page + 1;
      newPage = newPage > maxPage ? maxPage : newPage;
      onChangePage(newPage);
    }
  };

  const handleOnChangeRowsPerPage = (value: number) => {
    if (onChangeRowsPerPage) {
      setMaxPage(Math.ceil(count / value));
      onChangeRowsPerPage(value);
    }
  };

  return (
    <div className={styles.wrapper}>
      {rowsPerPageOptions.length > 1 && (
        <Typo variant={TypoVariants.subTitle} color={TypoColors.greyMedium}>
          {labelRowsPerPage}
        </Typo>
      )}
      {rowsPerPageOptions.length > 1 && (
        <TextField
          select={true}
          value={rowsPerPage}
          className={styles.textFieldRoot}
          classes={{
            textField: styles.textField,
            textFieldFocus: styles.textFieldFocus,
            inputSelect: styles.inputSelect,
            arrow: styles.textFieldArrow,
          }}
          onChangeSelectValue={handleOnChangeRowsPerPage}
        >
          {rowsPerPageOptions.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      )}
      <Typo
        variant={TypoVariants.subTitle}
        color={TypoColors.greyMedium}
        className={styles.labelDisplayedRows}
      >
        {labelDisplayedRows(
          count === 0 ? 0 : (page - 1) * rowsPerPage + 1,
          Math.min(count, page * rowsPerPage),
          count,
        )}
      </Typo>
      <Button
        variant={ButtonVariants.Icon}
        disabled={1 === page}
        onClick={handleOnClickPreviousButton}
      >
        <ArrowLeft />
      </Button>
      <Button
        variant={ButtonVariants.Icon}
        disabled={page === maxPage}
        onClick={handleOnClickNextButton}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default TablePagination;
