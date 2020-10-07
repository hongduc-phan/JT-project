import React, {FunctionComponent} from 'react';
import {defaultRules, InputStates} from 'react-hoc-form-validatable';
import {useTranslation} from 'react-i18next';
import {Link, Redirect} from 'react-router-dom';
import clsx from 'clsx';

import imgFavicon from '../../../../assets/img/logo-full.png';
import imgSignIn from '../../images/sign-in.svg';

import Typo, {
  TypoVariants,
  TypoColors,
  TypoAlignment,
} from '../../../../components/Typo';
import Button, {ButtonVariants} from '../../../../components/Button';

import SignInForm from '../SignInForm';

import styles from './SignIn.module.css';

import {getLocaleKey} from '../../SignIn.locale';
import config from '../../../../config';

interface SignInProps {
  isLogged: boolean;
  onLogin: (
    company: string,
    username: string,
    password: string,
    done: (reset?: boolean) => void,
  ) => void;
}

const SignInScene: FunctionComponent<SignInProps> = ({
  onLogin,
  isLogged,
}: SignInProps) => {
  const {t} = useTranslation();

  function handlerLoginSubmit(
    inputs: {
      [k: string]: InputStates;
    },
    done: (reset?: boolean) => void,
  ) {
    const {company, username, password} = inputs;
    onLogin(
      company.value,
      username.value,
      password.value,
      (success?: boolean) => {
        done(success);
      },
    );
  }

  if (isLogged) {
    return <Redirect to={config.paths.moduleSelection} />;
  }

  return (
    <div className={styles.signIn}>
      <div className={styles.colLeft}>
        <div className={styles.background}>
          <img className={styles.image} src={imgSignIn} alt="Background" />
          <Typo
            tag="div"
            variant={TypoVariants.h3}
            color={TypoColors.white}
            align={TypoAlignment.middle}
            className={styles.heading}
          >
            {t(getLocaleKey('line'))}
          </Typo>
          <Typo
            tag="p"
            variant={TypoVariants.body2}
            color={TypoColors.white}
            align={TypoAlignment.middle}
            className={styles.subHeading}
          >
            {t(getLocaleKey('subLine'))}
          </Typo>
          <Button
            target="_blank"
            rel="noopener noreferrer"
            href="https://juztalent.com/eprofile/"
            className={styles.button}
            variant={ButtonVariants.Secondary}
            color="blue"
          >
            {t(getLocaleKey('lineButton'))}
          </Button>
        </div>
      </div>
      <div className={styles.colRight}>
        <div className={styles.form}>
          <img className={styles.favicon} src={imgFavicon} alt="JuzTalent" />
          <SignInForm
            submitCallback={handlerLoginSubmit}
            rules={defaultRules}
          />
          <Link
            to="/forgot-password"
            className={clsx(styles.link, styles.forgotPassword)}
          >
            {t(getLocaleKey('forgot'))}
          </Link>
          <p className={styles.signUp}>
            <Typo variant={TypoVariants.body2} color={TypoColors.greyDark}>
              {t(getLocaleKey('doNotHave'))}
            </Typo>
            &nbsp;
            <Link to="/sign-up" className={styles.link}>
              {t(getLocaleKey('signUp'))}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInScene;
