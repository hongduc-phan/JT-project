import React from 'react';

import Typo, {TypoVariants, TypoColors} from '../../../../components/Typo';

import styles from './UploadedLogoForm.module.css';

const UploadedLogoForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Typo variant={TypoVariants.h1} color={TypoColors.white}>
          E
        </Typo>
      </div>
    </div>
  );
};

export default UploadedLogoForm;
