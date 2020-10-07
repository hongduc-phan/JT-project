import React, {Fragment, FunctionComponent, useRef, useState} from 'react';
import {FormValidateChildProps, HOCForm} from 'react-hoc-form-validatable';
import {useTranslation} from 'react-i18next';
import NavigationPrompt from 'react-router-navigation-prompt';
import {Link} from 'react-router-dom';

import Typo, {TypoVariants} from '../../../../components/Typo';
import {getLocaleKey} from '../../SettingsGeneralBranches.locale';
import Card from '../../../../components/Card';
import TextField, {TextFieldAlignment} from '../../../../components/TextField';
import ValidateTextField from '../../../../components/ValidateTextField';
import {Search} from '../../../../components/Icons';
import {getFormLocaleKey} from '../../../../locales/form.locale';
import Button, {ButtonVariants} from '../../../../components/Button';
import {getCommonLocaleKey} from '../../../../locales/common.locale';
import Modal from '../../../../components/Modal';
import MapSelectLocation from '../MapSelectLocation';
import config from '../../../../config';

import styles from './FormCreateBranch.module.css';

const FormCreateBranch: FunctionComponent<FormValidateChildProps> = ({
  onSubmit,
  submitted,
}: FormValidateChildProps) => {
  const {t} = useTranslation();
  const [isOpenLocation, setIsOpenLocation] = useState<boolean>(false);
  const [location, setLocation] = useState<{lat: number; lng: number}>();
  const inputImage = useRef<HTMLInputElement>(null);
  const [uploadName, setUploadName] = useState<string>('');

  function handlerChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setUploadName(e.target.files[0].name);
    }
  }

  function handlerChooseFile() {
    if (uploadName) {
      setUploadName('');
    }
    if (inputImage && inputImage.current) {
      inputImage.current.files = null;
      inputImage.current.click();
    }
  }

  function handlerLocation() {
    setIsOpenLocation(!isOpenLocation);
  }

  function handlerSelectLocation(result: {lat: number; lng: number}) {
    setLocation(result);
    handlerLocation();
  }

  return (
    <div>
      <Typo variant={TypoVariants.h2} tag="div">
        {t(getLocaleKey('createBranch'))}
      </Typo>
      <Card className={styles.card}>
        <form noValidate={true} onSubmit={onSubmit}>
          <div className={styles.formRow}>
            <ValidateTextField
              required={true}
              rule="notEmpty|maxLength,255"
              disabled={submitted}
              name="name"
              label={t(getLocaleKey('formBranchName'))}
            />
          </div>
          <div className={styles.formRow}>
            <ValidateTextField
              required={true}
              rule="notEmpty|maxLength,255"
              disabled={submitted}
              name="address1"
              label={t(getFormLocaleKey('addressLine1'))}
            />
          </div>
          <div className={styles.formRow}>
            <ValidateTextField
              optional={true}
              rule="maxLength,255"
              disabled={submitted}
              name="address2"
              label={t(getFormLocaleKey('addressLine2'))}
            />
          </div>
          <div className={styles.formRow}>
            <ValidateTextField
              required={true}
              rule="notEmpty|maxLength,255"
              disabled={submitted}
              name="postal"
              label={t(getFormLocaleKey('postal'))}
            />
          </div>
          <div className={styles.formRow}>
            <ValidateTextField
              required={true}
              defaultValue={location ? `${location.lat}, ${location.lng}` : ''}
              onClick={handlerLocation}
              alignIcon={TextFieldAlignment.left}
              rule="notEmpty"
              icon={<Search onClick={handlerLocation} />}
              readOnly={true}
              name="location"
              label={t(getFormLocaleKey('locationCor'))}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.upload}>
              <TextField
                className={styles.uploadField}
                value={uploadName}
                label={t(getFormLocaleKey('uploadImage'))}
                readOnly={true}
              />
              <Button
                disabled={submitted}
                type="button"
                variant={ButtonVariants.Secondary}
                onClick={handlerChooseFile}
              >
                {t(getFormLocaleKey('chooseFile'))}
              </Button>
            </div>
            <ValidateTextField
              name="image"
              onChange={handlerChangeImage}
              hidden={true}
              type="file"
              inputRef={inputImage}
            />
          </div>
          <div className={styles.actions}>
            <Link to={config.paths.settingsGeneralBranches}>
              <Button disabled={submitted} type="button">
                {t(getCommonLocaleKey('backToList'))}
              </Button>
            </Link>
            <Link to={config.paths.settingsGeneralBranches}>
              <Button
                disabled={submitted}
                variant={ButtonVariants.Secondary}
                type="button"
              >
                {t(getCommonLocaleKey('cancel'))}
              </Button>
            </Link>
            <Button disabled={submitted} variant={ButtonVariants.Primary}>
              {t(getCommonLocaleKey('save'))}
            </Button>
          </div>
        </form>
      </Card>

      <Modal
        open={isOpenLocation}
        renderTitle={t(getLocaleKey('searchBranchLocation'))}
      >
        <MapSelectLocation
          onAdd={handlerSelectLocation}
          onCancel={handlerLocation}
        />
      </Modal>

      <NavigationPrompt when={true}>
        {({onConfirm, onCancel}) => (
          <Modal
            open={true}
            renderTitle={t(getLocaleKey('cancelNotice'))}
            renderActions={
              <Fragment>
                <Button variant={ButtonVariants.Secondary} onClick={onConfirm}>
                  {t(getCommonLocaleKey('yes'))}
                </Button>
                <Button
                  onClick={onCancel}
                  variant={ButtonVariants.Primary}
                  className={styles.modalButton}
                >
                  {t(getCommonLocaleKey('no'))}
                </Button>
              </Fragment>
            }
          />
        )}
      </NavigationPrompt>
    </div>
  );
};

export default HOCForm(FormCreateBranch);
