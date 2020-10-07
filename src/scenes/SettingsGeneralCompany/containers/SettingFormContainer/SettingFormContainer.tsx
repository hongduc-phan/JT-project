import React, {useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {DeepReadonly} from 'utility-types';
import {useTranslation} from 'react-i18next';
import {RootState} from '../../../../store';
import SettingForm from '../../components/SettingForm';
import {AddBank, Company} from '../../../../features/companies/models';
import {
  defaultRules,
  SubmitCallback,
  ValidationRuleFunction,
} from 'react-hoc-form-validatable';
import {Country, optionsActions} from '../../../../features/options';
import {companiesActions} from '../../../../features/companies';
import {FetchEditCompanyBody} from '../../../../features/companies/apis';
import {getErrorsLocaleKey} from '../../../../locales/errors.locale';
import {AppContext} from '../../../../contexts/AppContext';
import {getLocaleKey} from '../../SettingGeneralCompany.locale';
import {SnackbarVariant} from '../../../../components/Snackbar';
import {
  validateFileSizeLimitRule,
  validateFileTypeRule,
} from '../../../../helpers/validationRules';

export interface SettingFormContainerProps {
  countries: DeepReadonly<Country[]>;
  company: Company | null;
  onGetCountries: () => void;
  onGetCountryStates: () => void;
  onCreateBank: (
    data: {
      info: AddBank;
      companyId: string;
    },
    done?: (success: boolean) => void,
  ) => void;
  onDeleteBank: (
    companyId: string,
    bankAccountId: number,
    done?: (success: boolean) => void,
  ) => void;
  onEditCompany: (
    companyId: string,
    data: FetchEditCompanyBody,
    done?: (success: boolean) => void,
  ) => void;
}

const rulePostalCode: ValidationRuleFunction = (value) => {
  return /^[1-9]\d*$/.test(value);
};

const SettingFormContainer = ({
  company,
  countries,
  onGetCountries,
  onGetCountryStates,
  onCreateBank,
  onDeleteBank,
  onEditCompany,
}: SettingFormContainerProps) => {
  const {t} = useTranslation();

  const appContext = useContext(AppContext);

  useEffect(() => {
    onGetCountries();
    onGetCountryStates();
  }, []);

  const handleSubmit: SubmitCallback = (inputs, done) => {
    if (company && appContext) {
      onEditCompany(
        company.companyId,
        {
          companyName: inputs.company.value,
          businessRegNo: inputs.businessRegNo.value,
          countryId: inputs.countryId.value,
          postalCode: inputs.postalCode.value,
          startWeek: inputs.weekStart.value,
          logo: inputs.logo.files ? inputs.logo.files : undefined,
          address1: inputs.address1.value,
          address2: inputs.address2.value,
          halfDayHour: inputs.halfDayHour.value,
        },
        (success) => {
          done(success);
          if (success) {
            appContext.snackAdd(
              t(getLocaleKey('editCompanySuccess')),
              SnackbarVariant.Success,
            );
          } else {
            appContext.snackAdd(
              t(getLocaleKey('editCompanyFailed')),
              SnackbarVariant.Error,
            );
          }
        },
      );
    }
  };

  function handleSubmitError() {
    if (appContext) {
      appContext.snackAdd(
        t(getLocaleKey('formCompanyError')),
        SnackbarVariant.Error,
      );
    }
  }

  return (
    <SettingForm
      errorCallback={handleSubmitError}
      countries={countries}
      submitCallback={handleSubmit}
      onDeleteBank={onDeleteBank}
      onCreateBank={onCreateBank}
      company={company}
      rules={{
        ...defaultRules,
        postalCode: {
          rule: rulePostalCode,
          message: {
            error: t(getErrorsLocaleKey('postalCode')),
          },
        },
        fileSizeLimit: {
          rule: validateFileSizeLimitRule,
          message: {
            error: t(getLocaleKey('errorUploadLogoFileSize')),
          },
        },
        fileType: {
          rule: validateFileTypeRule,
          message: {
            error: t(getLocaleKey('errorUploadLogoFileType')),
          },
        },
      }}
    />
  );
};

const mapStateToProps = ({companies, options: {countries}}: RootState) => {
  return {
    company: companies.default.data,
    countries: countries.list,
  };
};

const mapDispatchToProps = {
  onCreateBank: companiesActions.companyAddBank,
  onGetCountries: optionsActions.countriesGet,
  onGetCountryStates: optionsActions.statesGet,
  onDeleteBank: companiesActions.companyDeleteBank,
  onEditCompany: companiesActions.editCompany,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingFormContainer);
