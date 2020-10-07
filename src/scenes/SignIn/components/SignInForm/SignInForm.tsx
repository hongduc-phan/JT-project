import React, {FunctionComponent} from 'react';
import {HOCForm, FormValidateChildProps} from 'react-hoc-form-validatable';

import Typo, {TypoVariants, TypoAlignment} from '../../../../components/Typo';
import Button, {ButtonVariants} from '../../../../components/Button';
import ValidateTextField from '../../../../components/ValidateTextField';

import styles from './SignInForm.module.css';
import {useTranslation} from 'react-i18next';
import {getLocaleKey} from '../../SignIn.locale';

const SignInForm: FunctionComponent<FormValidateChildProps> = ({
  submitted,
  onSubmit,
}: FormValidateChildProps) => {
  const {t} = useTranslation();

  return (
    <div className={styles.wrap}>
      <Typo
        tag="div"
        variant={TypoVariants.h2}
        align={TypoAlignment.middle}
        className={styles.heading}
      >
        {t(getLocaleKey('title'))}
      </Typo>
      <form onSubmit={onSubmit} noValidate={true}>
        <div className={styles.row}>
          <ValidateTextField
            rule="notEmpty"
            name="company"
            label={t(getLocaleKey('formCompany'))}
            display="tall"
          />
        </div>
        <div className={styles.row}>
          <ValidateTextField
            name="username"
            rule="notEmpty"
            label={t(getLocaleKey('formUsername'))}
            display="tall"
          />
        </div>
        <div className={styles.row}>
          <ValidateTextField
            rule="notEmpty"
            name="password"
            label={t(getLocaleKey('formPassword'))}
            display="tall"
            type="password"
          />
        </div>
        <Button
          disabled={submitted}
          variant={ButtonVariants.Primary}
          display="big"
          className={styles.button}
        >
          {t(getLocaleKey('formSubmit'))}
        </Button>
      </form>
    </div>
  );
};

export default HOCForm(SignInForm);
