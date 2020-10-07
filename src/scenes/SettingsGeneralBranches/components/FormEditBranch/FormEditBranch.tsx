import React, {
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {FormValidateChildProps, HOCForm} from 'react-hoc-form-validatable';
import {useTranslation} from 'react-i18next';
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
import useRedirectRoute from '../../../../hooks/useRedirectRoute';

import styles from './FormEditBranch.module.css';
import {Branch} from '../../../../features/branches/models';
import Loading from '../../../../components/Loading';

export interface FormEditBranchProps {
  data: Branch | undefined;
  isFetching: boolean;
}

const FormEditBranch: FunctionComponent<
  FormValidateChildProps & FormEditBranchProps
> = ({
  onSubmit,
  submitted,
  data,
  isFetching,
}: FormValidateChildProps & FormEditBranchProps) => {
  const {t} = useTranslation();
  const [ShouldRedirect, , setRedirectHandler] = useRedirectRoute();
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
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

  function handlerCancel() {
    setIsOpenCancel(!isOpenCancel);
  }

  function handlerLocation() {
    setIsOpenLocation(!isOpenLocation);
  }

  function handlerSelectLocation(result: {lat: number; lng: number}) {
    setLocation(result);
    handlerLocation();
  }

  useEffect(() => {
    if (data) {
      setLocation({
        lat: data.branchLat,
        lng: data.branchLong,
      });
    }
  }, [data]);

  return (
    <div>
      {ShouldRedirect}
      <Typo variant={TypoVariants.h2} tag="div">
        {t(getLocaleKey('editBranch'))}
      </Typo>
      <Card className={styles.card}>
        {isFetching && <Loading />}
        {data && !isFetching && (
          <form noValidate={true} onSubmit={onSubmit}>
            <div className={styles.formRow}>
              <ValidateTextField
                defaultValue={data.branchName}
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
                defaultValue={data.address1}
                rule="notEmpty|maxLength,255"
                disabled={submitted}
                name="address1"
                label={t(getFormLocaleKey('addressLine1'))}
              />
            </div>
            <div className={styles.formRow}>
              <ValidateTextField
                defaultValue={data.address2}
                optional={true}
                rule="maxLength,255"
                disabled={submitted}
                name="address2"
                label={t(getFormLocaleKey('addressLine2'))}
              />
            </div>
            <div className={styles.formRow}>
              <ValidateTextField
                defaultValue={data.postalCode}
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
                defaultValue={
                  location ? `${location.lat}, ${location.lng}` : ''
                }
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
              <Button
                disabled={submitted}
                type="button"
                onClick={handlerCancel}
              >
                {t(getCommonLocaleKey('backToList'))}
              </Button>
              <Button
                onClick={handlerCancel}
                disabled={submitted}
                variant={ButtonVariants.Secondary}
                type="button"
              >
                {t(getCommonLocaleKey('cancel'))}
              </Button>
              <Button disabled={submitted} variant={ButtonVariants.Primary}>
                {t(getCommonLocaleKey('save'))}
              </Button>
            </div>
          </form>
        )}
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

      <Modal
        open={isOpenCancel}
        renderTitle={t(getLocaleKey('cancelNotice'))}
        renderActions={
          <Fragment>
            <Button
              variant={ButtonVariants.Secondary}
              onClick={setRedirectHandler(config.paths.settingsGeneralBranches)}
            >
              {t(getCommonLocaleKey('yes'))}
            </Button>
            <Button
              onClick={handlerCancel}
              variant={ButtonVariants.Primary}
              className={styles.modalButton}
            >
              {t(getCommonLocaleKey('no'))}
            </Button>
          </Fragment>
        }
      />
    </div>
  );
};

export default HOCForm<FormEditBranchProps>(FormEditBranch);
