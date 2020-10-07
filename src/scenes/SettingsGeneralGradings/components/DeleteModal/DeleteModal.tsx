import React, {FunctionComponent, FormEvent} from 'react';
import {useTranslation} from 'react-i18next';

import {getLocaleKey} from '../../SettingsGeneralGradings.locale';
import {getCommonLocaleKey} from '../../../../locales/common.locale';

import {Grading} from '../../../../features/gradings/models';

import Modal from '../../../../components/Modal';
import Typo, {TypoVariants} from '../../../../components/Typo';
import Button, {ButtonVariants} from '../../../../components/Button';

import styles from '../../SettingsGeneralGradings.module.css';

export interface DeleteModalProps {
  data: Grading;
  open: boolean;
  onRequestClose: () => void;
  onSubmit: (id: number) => void;
}

const DeleteModal: FunctionComponent<DeleteModalProps> = ({
  data,
  open,
  onRequestClose,
  onSubmit,
}: DeleteModalProps) => {
  const {t} = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(data.gradingId);
  };

  return (
    <Modal open={open} onRequestClose={onRequestClose}>
      <form onSubmit={handleSubmit} className={styles.modal} noValidate={true}>
        <Typo
          tag="div"
          variant={TypoVariants.h3}
          className={styles.modalHeading}
        >
          {t(getLocaleKey('deleteGrading'))}
        </Typo>
        <Typo tag="p">
          <strong>{t(getLocaleKey('formGradingName'))}: </strong>
          {data.gradingName}
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
