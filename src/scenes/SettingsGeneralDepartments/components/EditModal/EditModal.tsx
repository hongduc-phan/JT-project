import React, {FunctionComponent, useState, Fragment, FormEvent} from 'react';
import {useTranslation} from 'react-i18next';
import {FormValidateChildProps, HOCForm} from 'react-hoc-form-validatable';

import {getLocaleKey} from '../../SettingsGeneralDepartments.locale';
import {getCommonLocaleKey} from '../../../../locales/common.locale';

import {Department} from '../../../../features/departments/models';

import Typo, {TypoVariants} from '../../../../components/Typo';
import Button, {ButtonVariants} from '../../../../components/Button';
import ValidateTextField from '../../../../components/ValidateTextField';
import Modal from '../../../../components/Modal';

import styles from '../../SettingsGeneralDepartments.module.css';

export interface EditModalProps {
  open: boolean;
  data: Department;
  onRequestClose: () => void;
}

export const EditModal: FunctionComponent<
  EditModalProps & FormValidateChildProps
> = ({
  submitted,
  onSubmit,
  open,
  onRequestClose,
  data,
}: EditModalProps & FormValidateChildProps) => {
  const {t} = useTranslation();
  const [department, setDepartment] = useState<string>('');
  const [
    isOpenConfirmCancellationModal,
    setIsOpenConfirmCancellationModal,
  ] = useState<boolean>(false);

  const onCancel = () => {
    const state = department.length ? true : false;
    setIsOpenConfirmCancellationModal(state);
    if (!state) {
      onRequestClose();
    }
  };

  const onDiscardChange = () => {
    setIsOpenConfirmCancellationModal(false);
  };

  const onAcceptChange = () => {
    setIsOpenConfirmCancellationModal(false);
    onRequestClose();
  };

  const onChangeDepartment = (e: FormEvent<HTMLInputElement>) =>
    setDepartment(e.currentTarget.value);

  return (
    <Fragment>
      <Modal open={open} onRequestClose={onCancel}>
        <form onSubmit={onSubmit} className={styles.modal} noValidate={true}>
          <Typo
            tag="div"
            variant={TypoVariants.h3}
            className={styles.modalHeading}
          >
            {t(getLocaleKey('editDepartment'))}
          </Typo>
          <ValidateTextField
            defaultValue={data.departmentName}
            name="name"
            rule="notEmpty|maxLength,255"
            label={t(getLocaleKey('title'))}
            required={true}
            onChange={onChangeDepartment}
            autoFocus={true}
          />
          <ValidateTextField
            defaultValue={data.departmentId.toString()}
            name="id"
            rule="notEmpty"
            hidden={true}
          />
          <div className={styles.modalActions}>
            <Button
              type="button"
              disabled={submitted}
              variant={ButtonVariants.Secondary}
              onClick={onCancel}
            >
              {t(getCommonLocaleKey('cancel'))}
            </Button>
            <Button
              type="submit"
              disabled={submitted}
              variant={ButtonVariants.Primary}
              className={styles.modalButton}
            >
              {t(getCommonLocaleKey('edit'))}
            </Button>
          </div>
        </form>
      </Modal>

      {isOpenConfirmCancellationModal && (
        <Modal
          open={isOpenConfirmCancellationModal}
          renderTitle={t(getLocaleKey('confirmCancellationTitle'))}
          renderActions={
            <Fragment>
              <Button
                variant={ButtonVariants.Secondary}
                onClick={onAcceptChange}
              >
                {t(getCommonLocaleKey('yes'))}
              </Button>
              <Button
                variant={ButtonVariants.Primary}
                className={styles.modalButton}
                onClick={onDiscardChange}
              >
                {t(getCommonLocaleKey('no'))}
              </Button>
            </Fragment>
          }
        />
      )}
    </Fragment>
  );
};

export default HOCForm<EditModalProps>(EditModal);
