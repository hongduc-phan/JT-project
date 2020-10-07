import React, {FunctionComponent, useState, Fragment, FormEvent} from 'react';
import {useTranslation} from 'react-i18next';
import {FormValidateChildProps, HOCForm} from 'react-hoc-form-validatable';

import {getLocaleKey} from '../../SettingsGeneralGradings.locale';
import {getCommonLocaleKey} from '../../../../locales/common.locale';

import Typo, {TypoVariants} from '../../../../components/Typo';
import Button, {ButtonVariants} from '../../../../components/Button';
import ValidateTextField from '../../../../components/ValidateTextField';
import Modal from '../../../../components/Modal';

import styles from '../../SettingsGeneralGradings.module.css';

export interface CreateModalProps {
  open: boolean;
  onRequestClose: () => void;
}

export const CreateModal: FunctionComponent<
  CreateModalProps & FormValidateChildProps
> = ({
  submitted,
  onSubmit,
  open,
  onRequestClose,
}: CreateModalProps & FormValidateChildProps) => {
  const {t} = useTranslation();
  const [grading, setgrading] = useState<string>('');
  const [
    isOpenConfirmCancellationModal,
    setIsOpenConfirmCancellationModal,
  ] = useState<boolean>(false);

  const onCancel = () => {
    const state = grading.length ? true : false;
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

  const onChangeGrading = (e: FormEvent<HTMLInputElement>) =>
    setgrading(e.currentTarget.value);

  return (
    <Fragment>
      <Modal open={open} onRequestClose={onCancel}>
        <form onSubmit={onSubmit} className={styles.modal} noValidate={true}>
          <Typo
            tag="div"
            variant={TypoVariants.h3}
            className={styles.modalHeading}
          >
            {t(getLocaleKey('addGrading'))}
          </Typo>
          <ValidateTextField
            defaultValue={grading}
            name="gradingName"
            rule="notEmpty|maxLength,255"
            label={t(getLocaleKey('title'))}
            required={true}
            onChange={onChangeGrading}
            autoFocus={true}
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
              {t(getCommonLocaleKey('add'))}
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

export default HOCForm<CreateModalProps>(CreateModal);
