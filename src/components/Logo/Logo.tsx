import React, {AllHTMLAttributes} from 'react';
import clsx from 'clsx';

import Typo, {TypoVariants, TypoColors, TypoAlignment} from '../Typo';

import styles from './Logo.module.css';

export interface ILogoProps extends AllHTMLAttributes<HTMLDivElement> {
  logo?: string;
  company: string;
  className?: string;
}

function getFirstCharacter(text: string) {
  if (!text) {
    return '';
  }
  return text[0].toLocaleUpperCase();
}

const Logo = ({logo, company, className, ...others}: ILogoProps) => {
  return (
    <div className={className} {...others}>
      {logo ? (
        <img
          className={clsx(styles.logo, styles.logoWithIcon)}
          src={logo}
          alt={company}
        />
      ) : (
        <Typo
          variant={TypoVariants.h4}
          color={TypoColors.white}
          align={TypoAlignment.middle}
          className={clsx(styles.logo, styles.logoDefault)}
        >
          {getFirstCharacter(company)}
        </Typo>
      )}
    </div>
  );
};

export default Logo;
