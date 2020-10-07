import React from 'react';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';

import {getLocaleKey} from '../../SettingGeneralCompany.locale';

import styles from './InformationForm.module.css';
import Typo, {TypoColors} from '../../../../components/Typo';

const InformationForm = () => {
  const {t} = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className="row">
        <div className="col-10">
          <div className={clsx('row', styles.row)}>
            <div className="col-4">
              <Typo color={TypoColors.greyMedium}>
                {t(getLocaleKey('formCompany'))}
              </Typo>
            </div>
            <div className="col-8">
              <Typo>Expresso Media</Typo>
            </div>
          </div>
          <div className={clsx('row', styles.row)}>
            <div className="col-4">
              <Typo color={TypoColors.greyMedium}>
                {t(getLocaleKey('formReg'))}
              </Typo>
            </div>
            <div className="col-8">
              <Typo>12345678</Typo>
            </div>
          </div>
          <div className={clsx('row', styles.row)}>
            <div className="col-4">
              <Typo color={TypoColors.greyMedium}>
                {t(getLocaleKey('formCountry'))}
              </Typo>
            </div>
            <div className="col-8">
              <Typo>Singapore</Typo>
            </div>
          </div>
          <div className={clsx('row', styles.row)}>
            <div className="col-4">
              <Typo color={TypoColors.greyMedium}>
                {t(getLocaleKey('formAddress'))}
              </Typo>
            </div>
            <div className="col-8">
              <Typo>
                3 Gambas Crescent
                <br />
                #04-123
                <br />
                Singapore 765432
              </Typo>
            </div>
          </div>
          <div className={clsx('row', styles.row)}>
            <div className="col-4">
              <Typo color={TypoColors.greyMedium}>
                {t(getLocaleKey('formWeek'))}
              </Typo>
            </div>
            <div className="col-8">
              <Typo>Monday</Typo>
            </div>
          </div>
          <div className={clsx('row', styles.row)}>
            <div className="col-4">
              <Typo color={TypoColors.greyMedium}>
                {t(getLocaleKey('rest'))}
              </Typo>
            </div>
            <div className="col-8">
              <div className={clsx('row', styles.subRow)}>
                <div className="col-5">
                  <Typo>Saturday</Typo>
                </div>
                <div className="col-7">
                  <Typo>Haft day</Typo>
                </div>
              </div>
              <div className={clsx('row', styles.subRow)}>
                <div className="col-5">
                  <Typo>Sunday</Typo>
                </div>
                <div className="col-7">
                  <Typo>Full day</Typo>
                </div>
              </div>
            </div>
          </div>
          <div className={clsx('row', styles.row)}>
            <div className="col-4">
              <Typo color={TypoColors.greyMedium}>
                {t(getLocaleKey('halfDaySetting'))}
              </Typo>
            </div>
            <div className="col-8">
              <Typo>4.5</Typo>
            </div>
          </div>
          <div className={clsx('row', styles.row)}>
            <div className="col-4">
              <Typo color={TypoColors.greyMedium}>
                {t(getLocaleKey('bankDetails'))}
              </Typo>
            </div>
            <div className="col-8">
              <div className={clsx('row', styles.subRow)}>
                <div className="col-5">
                  <Typo>OCBC</Typo>
                </div>
                <div className="col-7">
                  <Typo>Business account</Typo>
                </div>
              </div>
              <div className={clsx('row', styles.subRow)}>
                <div className="col-5">
                  <Typo>DBS</Typo>
                </div>
                <div className="col-7">
                  <Typo>Business account</Typo>
                </div>
              </div>
              <div className={clsx('row', styles.subRow)}>
                <div className="col-5">
                  <Typo>UOB</Typo>
                </div>
                <div className="col-7">
                  <Typo>Business account</Typo>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2">&nbsp;</div>
      </div>
    </div>
  );
};

export default InformationForm;
