import React, {FunctionComponent, FormEvent} from 'react';
import {useTranslation} from 'react-i18next';

import {getLocaleKey} from '../../SettingsGeneralDepartments.locale';
import {getCommonLocaleKey} from '../../../../locales/common.locale';

import {Department} from '../../../../features/departments/models';

import Modal from '../../../../components/Modal';
import Typo, {TypoVariants} from '../../../../components/Typo';
import Button, {ButtonVariants} from '../../../../components/Button';

import styles from '../../SettingsGeneralDepartments.module.css';

export interface DeleteModalProps {
  data: Department;
  open: boolean;
  onRequestClose: () => void;
  onSubmit: (id: number) => void;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  data,
  open,
  onRequestClose,
  onSubmit,
}) => {
  const {t} = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(data.departmentId);
  };

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <form onSubmit={handleSubmit} className={styles.modal} noValidate={true}>
        <Typo
          tag="div"
          variant={TypoVariants.h3}
          className={styles.modalHeading}
        >
          {t(getLocaleKey('deleteDepartment'))}
        </Typo>
        <Typo tag="p">
          <strong>{t(getLocaleKey('formDepartmentName'))}: </strong>
          {data.departmentName}
        </Typo>
        <div className={styles.modalActions}>
          <Button
            type="button"
            variant={ButtonVariants.Secondary}
            onClick={onRequestClose}
          >
            {t(getCommonLocaleKey('cancel'))}
          </Button>
          <Button
            type="submit"
            variant={ButtonVariants.Primary}
            className={styles.modalButton}
          >
            {t(getCommonLocaleKey('delete'))}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteModal;
