import React, {useState} from 'react';
import {Route} from 'react-router';
import {useTranslation} from 'react-i18next';

import {getLocaleKey} from './SettingGeneralCompany.locale';

import imgSuccessfulLogin from '../../assets/img/successful-login.svg';

import Typo, {
  TypoVariants,
  TypoColors,
  TypoAlignment,
} from '../../components/Typo';
import ReviewFormContainer from './containers/ReviewFormContainer';
import Button, {ButtonVariants} from '../../components/Button';
import Modal from '../../components/Modal';
import SettingFormContainer from './containers/SettingFormContainer';
import config from '../../config';
import styles from './SettingsGeneralCompany.module.css';

export interface ISettingsGeneralCompanyProps {
  isCreating?: boolean;
}

const SettingsGeneralCompany = ({
  isCreating = true,
}: ISettingsGeneralCompanyProps) => {
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [, setIsEditing] = useState<boolean>(!isCreating);

  const closeModal = () => {
    setIsOpen(false);
  };

  function handlerRender(paths: string) {
    switch (paths) {
      case config.paths.settingsGeneralCompany: {
        return function handlerRenderSettingCompany() {
          return <ReviewFormContainer />;
        };
      }
      case config.paths.settingsGeneralCompanyEdit: {
        return function handlerRenderSettingCompanyEdit() {
          return <SettingFormContainer />;
        };
      }
    }
  }

  return (
    <div className={styles.wrapper}>
      <Route
        exact={true}
        path={config.paths.settingsGeneralCompany}
        render={handlerRender(config.paths.settingsGeneralCompany)}
      />
      <Route
        exact={true}
        path={config.paths.settingsGeneralCompanyEdit}
        render={handlerRender(config.paths.settingsGeneralCompanyEdit)}
      />
      {/*<Card>*/}
      {/*{isEditing ? (*/}
      {/*<SettingForm rules={defaultRules}>*/}
      {/*<div className={styles.footer}>*/}
      {/*<Button*/}
      {/*type="button"*/}
      {/*className={styles.button}*/}
      {/*variant={ButtonVariants.Secondary}*/}
      {/*>*/}
      {/*{t(getCommonLocaleKey('cancel'))}*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*className={styles.button}*/}
      {/*variant={ButtonVariants.Primary}*/}
      {/*>*/}
      {/*{t(getCommonLocaleKey('save'))}*/}
      {/*</Button>*/}
      {/*</div>*/}
      {/*</SettingForm>*/}
      {/*) : (*/}
      {/**/}
      {/*)}*/}
      {/*</Card>*/}
      {isOpen && (
        <Modal open={isOpen} onRequestClose={closeModal}>
          <div className={styles.modal}>
            <Typo
              tag="div"
              variant={TypoVariants.h2}
              align={TypoAlignment.middle}
            >
              {t(getLocaleKey('modalSuccessfulLoginHeading'))}
            </Typo>
            <Typo
              tag="div"
              color={TypoColors.greyDark}
              variant={TypoVariants.body2}
              align={TypoAlignment.middle}
              className={styles.subHeading}
            >
              {t(getLocaleKey('modalSuccessfulLoginSubHeading'))}
            </Typo>
            <img
              className={styles.modalIllus}
              src={imgSuccessfulLogin}
              alt={t(getLocaleKey('modalSuccessfulLoginHeading'))}
            />
            <Button
              variant={ButtonVariants.Primary}
              onClick={closeModal}
              className={styles.modalButton}
            >
              {t(getLocaleKey('modalSuccessfulLoginButton'))}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SettingsGeneralCompany;
