import React, {FunctionComponent, useContext, useState} from 'react';
import {
  FormValidateChildProps,
  HOCForm,
  FormContext,
} from 'react-hoc-form-validatable';
import {useTranslation} from 'react-i18next';

import Typo, {TypoVariants} from '../../../../components/Typo';
import ValidateTextField from '../../../../components/ValidateTextField';
import MenuItem from '../../../../components/MenuItem';
import {getLocaleKey} from '../../SettingGeneralCompany.locale';
import Button, {ButtonVariants} from '../../../../components/Button';
import {SettingFormDispatch} from '../SettingForm/SettingForm';
import {getCommonLocaleKey} from '../../../../locales/common.locale';
import {BankWithState, Country, State} from '../../../../features/options';
import styles from './AddBankForm.module.css';
import {DeepReadonly} from 'utility-types';

export interface AddBankFormProps {
  countries: DeepReadonly<Country[]>;
  banks: DeepReadonly<BankWithState[]>;
  states: DeepReadonly<State[]>;
  onGetBanks: (stateId: number) => void;
}
const AddBankForm: FunctionComponent<
  FormValidateChildProps & AddBankFormProps
> = ({
  submitted,
  onSubmit,
  countries,
  banks,
  states,
  onGetBanks,
}: FormValidateChildProps & AddBankFormProps) => {
  const {t} = useTranslation();
  const [country, setCountry] = useState<number>();
  const [state, setState] = useState<number>();

  const dispatch = useContext(SettingFormDispatch);

  function handlerCancel() {
    if (dispatch) {
      dispatch({type: 'toggleConfirmCancelAddBank', value: true});
    }
  }

  function handlerChangeCountry(
    changeForm: (name: string, value: any, files: FileList | undefined) => void,
  ) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newCountry = parseInt(e.target.value, 10);
      setCountry(newCountry);
      if (state && newCountry !== country) {
        setState(undefined);
        changeForm('state', '', undefined);
        changeForm('bank', '', undefined);
      }
    };
  }

  function handlerChangeState(
    changeForm: (name: string, value: any, files: FileList | undefined) => void,
    bankValue: any,
  ) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const newState = parseInt(e.target.value, 10);
      setState(newState);
      onGetBanks(newState);
      if (bankValue && newState !== state) {
        changeForm('bank', '', undefined);
      }
    };
  }

  return (
    <form onSubmit={onSubmit} noValidate={true}>
      <FormContext.Consumer>
        {({validateInputOnChange, validateInputs}) => (
          <div>
            <Typo
              tag="div"
              variant={TypoVariants.h3}
              className={styles.addTitle}
            >
              {t(getLocaleKey('addBankAcc'))}
            </Typo>
            <div className={styles.row}>
              <ValidateTextField
                onChange={handlerChangeCountry(validateInputOnChange)}
                name="country"
                label={t(getLocaleKey('formCountry'))}
                select={true}
                rule="notEmpty"
                defaultValue=""
                required={true}
              >
                {countries.map((c) => (
                  <MenuItem key={c.countryId} value={c.countryId}>
                    {c.countryName}
                  </MenuItem>
                ))}
              </ValidateTextField>
            </div>
            <div className={styles.row}>
              <ValidateTextField
                onChange={handlerChangeState(
                  validateInputOnChange,
                  validateInputs.bank && validateInputs.bank.value,
                )}
                disabled={!country}
                name="state"
                label={t(getLocaleKey('formState'))}
                select={true}
                rule="notEmpty"
                value={state ? state.toString() : ''}
                required={true}
              >
                {states
                  .filter((s) => s.countryId === country)
                  .map((s) => (
                    <MenuItem key={s.stateId} value={s.stateId}>
                      {s.stateName}
                    </MenuItem>
                  ))}
              </ValidateTextField>
            </div>
            <div className={styles.row}>
              <ValidateTextField
                disabled={!state}
                name="bank"
                label={t(getLocaleKey('bank'))}
                select={true}
                rule="notEmpty"
                defaultValue=""
                required={true}
              >
                {banks
                  .filter((b) => b.stateId === state)
                  .map((b) => (
                    <MenuItem key={b.bankId} value={b.bankId}>
                      {b.bankName}
                    </MenuItem>
                  ))}
              </ValidateTextField>
            </div>
            <div className={styles.row}>
              <ValidateTextField
                name="bankAcc"
                label={t(getLocaleKey('bankAccount'))}
                rule="notEmpty"
                defaultValue=""
                required={true}
              />
            </div>
            <div className={styles.row}>
              <ValidateTextField
                name="bankCode"
                label={t(getLocaleKey('branchCode'))}
                rule="notEmpty"
                defaultValue=""
                required={true}
              />
            </div>
            <div className={styles.row}>
              <ValidateTextField
                name="bankNum"
                label={t(getLocaleKey('bankAccountNum'))}
                rule="notEmpty"
                defaultValue=""
                required={true}
              />
            </div>
            <div className={styles.actions}>
              <Button
                disabled={submitted}
                variant={ButtonVariants.Secondary}
                type="button"
                onClick={handlerCancel}
              >
                {t(getCommonLocaleKey('cancel'))}
              </Button>
              <Button
                variant={ButtonVariants.Primary}
                type="submit"
                disabled={submitted}
              >
                {t(getCommonLocaleKey('add'))}
              </Button>
            </div>
          </div>
        )}
      </FormContext.Consumer>
    </form>
  );
};

export default HOCForm<AddBankFormProps>(AddBankForm);
