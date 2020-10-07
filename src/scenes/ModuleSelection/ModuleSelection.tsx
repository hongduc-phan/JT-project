import React from 'react';
import clsx from 'clsx';
import {Link} from 'react-router-dom';

import config from '../../config';

import imgFavicon from '../../assets/img/favicon.png';
import imgClock from '../../assets/img/clock.svg';
import imgDollarSign from '../../assets/img/dollar-sign.svg';

import Topbar from '../../components/Topbar';
import Logo from '../../components/Logo';
import Card from '../../components/Card';
import Typo, {TypoVariants, TypoAlignment} from '../../components/Typo';

import {UserNavigationContainer} from '../../containers';

import styles from './ModuleSelection.module.css';
import {getLocaleKey} from './ModuleSelection.locale';
import {useTranslation} from 'react-i18next';

const ModuleSelection = () => {
  const modules = [
    {
      name: 'eTime',
      path: config.paths.eTime,
      className: styles.eTime,
      icon: imgClock,
    },
    {
      name: 'ePayroll',
      path: config.paths.ePayroll,
      className: styles.ePayroll,
      icon: imgDollarSign,
    },
  ];

  const {t} = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Topbar className={styles.topbar}>
        <Logo className={styles.logo} company="JuzTalent" logo={imgFavicon} />
        <UserNavigationContainer className={styles.profile} />
      </Topbar>
      <div className={styles.selection}>
        <Typo
          tag="div"
          className={styles.heading}
          variant={TypoVariants.h1}
          align={TypoAlignment.middle}
        >
          {t(getLocaleKey('subscribe'))}
        </Typo>
        <div className={styles.row}>
          {modules.map((module, index) => (
            <Link to={module.path} key={index}>
              <div className={styles.column}>
                <Card className={styles.card}>
                  <div className={clsx(styles.icon, module.className)}>
                    <img src={module.icon} alt={module.name} />
                  </div>
                  <Typo
                    tag="div"
                    variant={TypoVariants.body1}
                    align={TypoAlignment.middle}
                  >
                    {module.name}
                  </Typo>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleSelection;
