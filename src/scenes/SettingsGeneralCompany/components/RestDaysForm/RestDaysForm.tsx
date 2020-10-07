import React, {FunctionComponent, useState} from 'react';
import clsx from 'clsx';

import Typo, {TypoColors, TypoVariants} from '../../../../components/Typo';
import Button, {ButtonVariants} from '../../../../components/Button';
import {Add, Delete} from '../../../../components/Icons';
import MenuItem from '../../../../components/MenuItem';
import ValidateTextField from '../../../../components/ValidateTextField';
import {useTranslation} from 'react-i18next';
import {getLocaleKey} from '../../SettingGeneralCompany.locale';
import {getDateLocaleKey} from '../../../../locales/date.locale';
import {RestDay} from '../../../../features/companies/models';

import styles from './RestDaysForm.module.css';

interface RestDayNew {
  day: string;
  type: string;
  id: number;
}

export interface RestDaysFormProps {
  restDays: RestDay[];
}

const RestDaysForm: FunctionComponent<RestDaysFormProps> = (
  props: RestDaysFormProps,
) => {
  const {t} = useTranslation();
  const [restDaysNew, setRestDaysNew] = useState<RestDayNew[]>([]);

  const handleAdd = () => {
    const newRestDays: RestDayNew[] = [
      ...restDaysNew,
      {day: 'sun', type: 'half', id: new Date().getTime()},
    ];
    setRestDaysNew(newRestDays);
  };

  function handleDelete(id: number) {
    return () => {
      // const newRestDays = restDaysNew;
    };
  }

  return (
    <div>
      <Typo
        tag="div"
        className={styles.title}
        variant={TypoVariants.h4}
        color={TypoColors.greyDark}
      >
        {t(getLocaleKey('rest'))}
      </Typo>
      {restDaysNew.map((restday, index) => (
        <div key={index} className={clsx('row', styles.rowInput)}>
          <div className="col-6">
            <div className={styles.input}>
              <ValidateTextField
                name="days"
                label={t(getLocaleKey('formSelectDay'))}
                select={true}
                rule="notEmpty"
                defaultValue={restday.day}
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
          <div className="col-6">
            <div className={styles.colRight}>
              <div className={styles.input}>
                <ValidateTextField
                  name="fullOrHalf"
                  label={t(getLocaleKey('fullOrHalf'))}
                  select={true}
                  rule="notEmpty"
                  defaultValue={restday.type}
                >
                  <MenuItem value="full">{t(getLocaleKey('fullDay'))}</MenuItem>
                  <MenuItem value="half">{t(getLocaleKey('halfDay'))}</MenuItem>
                </ValidateTextField>
              </div>
              <div className={styles.icon}>
                <Button
                  onClick={handleDelete(restday.id)}
                  variant={ButtonVariants.Icon}
                >
                  <Delete />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button onClick={handleAdd} type="button">
        <Add /> {t(getLocaleKey('addRest'))}
      </Button>
    </div>
  );
};

export default RestDaysForm;
