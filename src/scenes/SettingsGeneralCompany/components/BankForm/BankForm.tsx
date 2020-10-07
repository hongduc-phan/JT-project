import React, {Fragment, FunctionComponent, useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';

import Typo, {TypoColors, TypoVariants} from '../../../../components/Typo';
import Button, {ButtonVariants} from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import {Add, Delete, Edit} from '../../../../components/Icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '../../../../components/Table';
import {getLocaleKey} from '../../SettingGeneralCompany.locale';
import {SettingFormDispatch} from '../SettingForm/SettingForm';
import {BankAccount} from '../../../../features/companies/models';
import {SettingFormContext} from '../../contexts/SettingFormContext';
import {getCommonLocaleKey} from '../../../../locales/common.locale';
import {AppContext} from '../../../../contexts/AppContext';
import {SnackbarVariant} from '../../../../components/Snackbar';

import styles from './BankForm.module.css';

export interface BankFormProps {
  banks: BankAccount[];
}

const BankForm: FunctionComponent<BankFormProps> = ({banks}: BankFormProps) => {
  const {t} = useTranslation();

  const appContext = useContext(AppContext);

  const [confirmDelete, setConfirmDelete] = useState({
    isOpenDeleteConfirm: false,
    isDeleting: false,
  });
  const [selectBank, setSelectBank] = useState<number | null>(null);

  const dispatch = useContext(SettingFormDispatch);

  const formContext = useContext(SettingFormContext);

  function toggleOpenAdd() {
    if (dispatch) {
      dispatch({type: 'toggleAddBank'});
    }
  }

  function handlerDelete(id: number) {
    return () => {
      setConfirmDelete({...confirmDelete, isOpenDeleteConfirm: true});
      setSelectBank(id);
    };
  }

  function handlerCancelDelete() {
    setConfirmDelete({
      ...confirmDelete,
      isOpenDeleteConfirm: false,
      isDeleting: false,
    });
    setSelectBank(null);
  }

  function handlerConfirmDelete() {
    if (formContext && appContext && selectBank) {
      formContext.deleteBankAccount(selectBank, (success) => {
        if (success) {
          appContext.snackAdd(
            t(getLocaleKey('deleteBankSuccess')),
            SnackbarVariant.Success,
          );
          handlerCancelDelete();
        } else {
          appContext.snackAdd(
            t(getLocaleKey('deleteBankSuccess')),
            SnackbarVariant.Error,
          );
          setConfirmDelete({...confirmDelete, isDeleting: false});
        }
      });
    }
  }

  const selectedBank = selectBank
    ? banks.find((b) => b.bankAccountId === selectBank)
    : null;

  return (
    <div>
      <Typo
        tag="div"
        className={styles.title}
        variant={TypoVariants.h4}
        color={TypoColors.greyDark}
      >
        {t(getLocaleKey('bankDetails'))}
      </Typo>
      {banks.length > 0 && (
        <Table className={styles.tableBank}>
          <TableHead>
            <TableRow>
              <TableCell>{t(getLocaleKey('bank'))}</TableCell>
              <TableCell>{t(getLocaleKey('bankAccount'))}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {/*@todo add bank name when api set bank info*/}
            {banks.map((bank) => (
              <TableRow key={bank.bankAccountId}>
                <TableCell>{bank.branchCode}</TableCell>
                <TableCell>{bank.accountName}</TableCell>
                <TableCell>
                  <div className={styles.tableAction}>
                    <Button variant={ButtonVariants.Icon} type="button">
                      <Edit />
                    </Button>
                    <Button
                      variant={ButtonVariants.Icon}
                      type="button"
                      onClick={handlerDelete(bank.bankAccountId)}
                    >
                      <Delete />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Button type="button" onClick={toggleOpenAdd}>
        <Add /> {t(getLocaleKey('addBankAcc'))}
      </Button>
      {confirmDelete.isOpenDeleteConfirm && selectedBank && (
        <Modal
          open={confirmDelete.isOpenDeleteConfirm}
          renderTitle={t(getLocaleKey('confirmDeleteBank'))}
          renderActions={
            <Fragment>
              <Button
                disabled={confirmDelete.isDeleting}
                variant={ButtonVariants.Secondary}
                onClick={handlerConfirmDelete}
              >
                {t(getCommonLocaleKey('yes'))}
              </Button>
              <Button
                disabled={confirmDelete.isDeleting}
                onClick={handlerCancelDelete}
                variant={ButtonVariants.Primary}
                className={styles.modalButton}
              >
                {t(getCommonLocaleKey('no'))}
              </Button>
            </Fragment>
          }
        >
          <div className={styles.bankConfirm}>
            <Typo tag="p">
              <b>{t(getLocaleKey('bank'))}: </b> {selectedBank.accountNumber}
            </Typo>
            <Typo tag="p">
              <b>{t(getLocaleKey('bankAccount'))}: </b>
              {selectedBank.accountName}
            </Typo>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BankForm;
