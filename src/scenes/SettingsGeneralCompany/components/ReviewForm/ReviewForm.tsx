import React, {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import clsx from 'clsx';
import Typo, {TypoColors, TypoVariants} from '../../../../components/Typo';
import Button, {ButtonVariants} from '../../../../components/Button';
import Card from '../../../../components/Card';
import {getLocaleKey} from '../../SettingGeneralCompany.locale';
import {getCommonLocaleKey} from '../../../../locales/common.locale';
import {getDateLocaleKey} from '../../../../locales/date.locale';
import SceneHeading from '../../../../components/SceneHeading';
import {Company} from '../../../../features/companies/models';
import styles from './ReviewForm.module.css';
import useRedirectRoute from '../../../../hooks/useRedirectRoute';
import config from '../../../../config';

export interface ReviewFormProps {
  company: Company | null;
}

const ReviewForm: FunctionComponent<ReviewFormProps> = ({
  company,
}: ReviewFormProps) => {
  const {t} = useTranslation();
  const [ShouldRedirect, , setRedirectHandler] = useRedirectRoute();
  return (
    <div>
      {ShouldRedirect}
      <SceneHeading
        renderActions={
          <Button
            variant={ButtonVariants.Primary}
            onClick={setRedirectHandler(
              config.paths.settingsGeneralCompanyEdit,
            )}
          >
            {t(getCommonLocaleKey('edit'))}
          </Button>
        }
        title={t(getLocaleKey('title'))}
        subTitle={t(getLocaleKey('subTitle'))}
      />
      <Card>
        {company && (
          <div className="row">
            <div className="col-2">
              <div className={styles.uploadedLogo}>
                <div className={styles.logo}>
                  <Typo variant={TypoVariants.h1} color={TypoColors.white}>
                    {company.companyName.slice(0, 1)}
                  </Typo>
                </div>
              </div>
            </div>
            <div className="col-10">
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
                        <Typo>{company.companyName}</Typo>
                      </div>
                    </div>
                    <div className={clsx('row', styles.row)}>
                      <div className="col-4">
                        <Typo color={TypoColors.greyMedium}>
                          {t(getLocaleKey('formReg'))}
                        </Typo>
                      </div>
                      <div className="col-8">
                        <Typo>{company.businessRegNo}</Typo>
                      </div>
                    </div>
                    <div className={clsx('row', styles.row)}>
                      <div className="col-4">
                        <Typo color={TypoColors.greyMedium}>
                          {t(getLocaleKey('formCountry'))}
                        </Typo>
                      </div>
                      <div className="col-8">
                        <Typo>{company.country.countryName}</Typo>
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
                          {company.address1}
                          <br />
                          {company.address2}
                          <br />
                          {company.postalCode &&
                            `${company.country.countryName} ${
                              company.postalCode
                            }`}
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
                        <Typo>{company.weekStart}</Typo>
                      </div>
                    </div>
                    <div className={clsx('row', styles.row)}>
                      <div className="col-4">
                        <Typo color={TypoColors.greyMedium}>
                          {t(getLocaleKey('rest'))}
                        </Typo>
                      </div>
                      <div className="col-8">
                        {company.restDays.length > 0 &&
                          company.restDays.map((r) => (
                            <div
                              className={clsx('row', styles.subRow)}
                              key={r.restDayId}
                            >
                              <div className="col-5">
                                <Typo>{r.day}</Typo>
                              </div>
                              <div className="col-7">
                                <Typo>
                                  {t(
                                    getDateLocaleKey(
                                      r.isFullDay ? 'fullDay' : 'halfDay',
                                    ),
                                  )}
                                </Typo>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className={clsx('row', styles.row)}>
                      <div className="col-4">
                        <Typo color={TypoColors.greyMedium}>
                          {t(getLocaleKey('halfDaySetting'))}
                        </Typo>
                      </div>
                      <div className="col-8">
                        <Typo>{company.halfDayHour}</Typo>
                      </div>
                    </div>
                    <div className={clsx('row', styles.row)}>
                      <div className="col-4">
                        <Typo color={TypoColors.greyMedium}>
                          {t(getLocaleKey('bankDetails'))}
                        </Typo>
                      </div>
                      <div className="col-8">
                        {company.bankDetails.map((b) => (
                          <div
                            className={clsx('row', styles.subRow)}
                            key={b.bankId}
                          >
                            <div className="col-5">
                              <Typo>{b.accountName}</Typo>
                            </div>
                            <div className="col-7">
                              <Typo>{b.accountNumber}</Typo>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-2">&nbsp;</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ReviewForm;
