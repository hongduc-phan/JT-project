import React, {FunctionComponent, useContext} from 'react';
import {useTranslation} from 'react-i18next';

import MenuItem from '../../../../components/MenuItem';
import ValidateTextField from '../../../../components/ValidateTextField';
import Typo, {TypoVariants, TypoColors} from '../../../../components/Typo';
import {getLocaleKey} from '../../SettingGeneralCompany.locale';
import {getDateLocaleKey} from '../../../../locales/date.locale';
import {Company} from '../../../../features/companies/models';
import RestDaysForm from '../RestDaysForm';
import BankForm from '../BankForm';
import {SettingFormContext} from '../../contexts/SettingFormContext';

import styles from './InputForm.module.css';

export interface InputFormProps {
  company: Company;
}

const InputForm: FunctionComponent<InputFormProps> = ({
  company,
}: InputFormProps) => {
  const {t} = useTranslation();
  const settingFormData = useContext(SettingFormContext);

  return (
    <div className={styles.wrapper}>
      <div className="row">
        <div className="col-6">
          <div className={styles.input}>
            <ValidateTextField
              defaultValue={company.companyName}
              name="company"
              rule="notEmpty"
              label={t(getLocaleKey('formCompany'))}
              placeholder={t(getLocaleKey('formCompany'))}
              required={true}
            />
          </div>
          <div className={styles.input}>
            <ValidateTextField
              defaultValue={company.businessRegNo}
              name="businessRegNo"
              rule="notEmpty"
              label={t(getLocaleKey('formReg'))}
              required={true}
            />
          </div>
          <div className={styles.input}>
            <ValidateTextField
              required={true}
              name="countryId"
              label={t(getLocaleKey('formCountry'))}
              select={true}
              defaultValue={company.countryId.toString()}
            >
              {settingFormData &&
                settingFormData.countries.map((c) => (
                  <MenuItem key={c.countryId} value={c.countryId.toString()}>
                    {c.countryName}
                  </MenuItem>
                ))}
            </ValidateTextField>
          </div>
          <div className={styles.input}>
            <ValidateTextField
              required={true}
              rule="notEmpty"
              defaultValue={company.address1}
              name="address1"
              label={t(getLocaleKey('formAddressLine1'))}
            />
          </div>
          <div className={styles.input}>
            <ValidateTextField
              defaultValue={company.address2}
              name="address2"
              label={t(getLocaleKey('formAddressLine2'))}
            />
          </div>

          <div className={styles.input}>
            <ValidateTextField
              required={true}
              defaultValue={company.postalCode || ''}
              name="postalCode"
              label={t(getLocaleKey('formPostal'))}
              rule="notEmpty|postalCode"
            />
          </div>
          <div className={styles.input}>
            <ValidateTextField
              rule="notEmpty"
              required={true}
              name="weekStart"
              label={t(getLocaleKey('formWeek'))}
              select={true}
              defaultValue={company.weekStart || ''}
            >
              <MenuItem value="mon">{t(getDateLocaleKey('mon'))}</MenuItem>
              <MenuItem value="tue">{t(getDateLocaleKey('tue'))}</MenuItem>
              <MenuItem value="wed">{t(getDateLocaleKey('wed'))}</MenuItem>
              <MenuItem value="thur">{t(getDateLocaleKey('thur'))}</MenuItem>
              <MenuItem value="fri">{t(getDateLocaleKey('fri'))}</MenuItem>
              <MenuItem value="sat">{t(getDateLocaleKey('sat'))}</MenuItem>
              <MenuItem value="sun">{t(getDateLocaleKey('sun'))}</MenuItem>
            </ValidateTextField>
          </div>
        </div>
      </div>
      <RestDaysForm restDays={company.restDays} />
      <Typo
        tag="div"
        className={styles.title}
        variant={TypoVariants.h4}
        color={TypoColors.greyDark}
      >
        {t(getLocaleKey('halfDaySetting'))}
      </Typo>
      <div className="row">
        <div className="col-6">
          <div className={styles.input}>
            <ValidateTextField
              required={true}
              rule="notEmpty"
              type="number"
              name="halfDayHour"
              defaultValue={company.halfDayHour || '0'}
              label="E.g. 4.5"
              placeholder="E.g. 4.5"
            />
          </div>
        </div>
      </div>
      <BankForm banks={company.bankDetails} />
    </div>
  );
};

export default InputForm;
