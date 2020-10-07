import React from 'react';
import {useTranslation} from 'react-i18next';

import imgEmptyState from '../../../../assets/img/empty-state.svg';

import Typo, {TypoVariants, TypoColors} from '../../../../components/Typo';
import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import {getLocaleKey} from '../../SettingsGeneralBranches.locale';
import styles from './EmptyScene.module.css';

const EmptyScene = () => {
  const {t} = useTranslation();
  return (
    <Card className={styles.wrapper}>
      <img src={imgEmptyState} alt="Empty state" className={styles.image} />
      <Typo
        className={styles.message}
        tag="div"
        variant={TypoVariants.h4}
        color={TypoColors.greyDark}
      >
        {t(getLocaleKey('empty'))}
      </Typo>
      <Button>{t(getLocaleKey('createABranch'))}</Button>
    </Card>
  );
};

export default EmptyScene;
