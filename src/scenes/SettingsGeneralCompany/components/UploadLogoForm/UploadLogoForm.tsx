import React, {FunctionComponent, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {getLocaleKey} from '../../SettingGeneralCompany.locale';

import Typo, {TypoVariants, TypoColors} from '../../../../components/Typo';
import Button, {ButtonVariants} from '../../../../components/Button';
import ValidateTextField from '../../../../components/ValidateTextField';
import validateFileSizeLimit from '../../../../helpers/validationRules/fileSizeLimit';
import validateType from '../../../../helpers/validationRules/fileType';

import styles from './UploadLogoForm.module.css';

export interface UploadLogoFormProps {
  currentLogo?: string | null;
  companyName: string;
}

const UploadLogoForm: FunctionComponent<UploadLogoFormProps> = ({
  companyName,
}: UploadLogoFormProps) => {
  const {t} = useTranslation();
  const [isReviewing, setIsReviewing] = useState<string>('');
  const inputLogo = useRef<HTMLInputElement>(null);

  const onClick = () => {
    if (inputLogo && inputLogo.current) {
      inputLogo.current.click();
    }
  };

  function handlerChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      if (
        validateFileSizeLimit(e.target.files, 3000000) &&
        validateType(e.target.files, ['jpg', 'jpeg'])
      ) {
        const reader = new FileReader();

        reader.onload = (er) => {
          if (er.target) {
            setIsReviewing((er.target as FileReader).result as string);
          }
        };

        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
      }
    }
  }

  function renderUpload({
    error,
    errorMessage,
    submitted,
  }: {
    error: boolean;
    submitted: boolean;
    errorMessage: string;
  }) {
    return (
      <div>
        <div
          className={styles.logo}
          style={{
            backgroundColor: isReviewing ? 'transparent' : undefined,
            backgroundImage: `url(${isReviewing})`,
          }}
        >
          {!isReviewing && (
            <Typo variant={TypoVariants.h1} color={TypoColors.white}>
              {companyName.slice(0, 1).toUpperCase()}
            </Typo>
          )}
        </div>
        <div className={styles.control}>
          <Button
            disabled={submitted}
            type="button"
            className={styles.button}
            variant={ButtonVariants.Secondary}
            onClick={onClick}
          >
            {t(getLocaleKey('uploadLogo'))}
          </Button>
          {error && errorMessage && (
            <Typo
              variant={TypoVariants.subTitle}
              tag="div"
              className={styles.error}
              color={TypoColors.red}
            >
              {errorMessage}
            </Typo>
          )}
          <Typo
            tag="p"
            className={styles.description}
            variant={TypoVariants.body2}
            color={TypoColors.greyDark}
          >
            {t(getLocaleKey('uploadRecommend'))}
          </Typo>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ValidateTextField
        hidden={true}
        renderTop={renderUpload}
        classes={{
          textField: styles.upload,
          assistiveText: styles.error,
        }}
        optional={true}
        rule="fileType,jpg,jpeg|fileSizeLimit,3000000"
        name="logo"
        onChange={handlerChangeImage}
        type="file"
        inputRef={inputLogo}
      />
    </div>
  );
};

export default UploadLogoForm;
