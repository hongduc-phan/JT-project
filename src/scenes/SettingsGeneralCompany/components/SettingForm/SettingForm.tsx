import React, {
  createContext,
  Fragment,
  FunctionComponent,
  useContext,
  useReducer,
} from 'react';
import {
  defaultRules,
  FormValidateChildProps,
  HOCForm,
  SubmitCallback,
} from 'react-hoc-form-validatable';
import UploadLogoForm from '../UploadLogoForm';
import InputForm from '../InputForm';
import BankContainer from '../../containers/BankContainer';
import Modal from '../../../../components/Modal';
import SceneHeading from '../../../../components/SceneHeading';
import {getLocaleKey} from '../../SettingGeneralCompany.locale';
import {useTranslation} from 'react-i18next';
import Card from '../../../../components/Card';
import {AddBank, Company} from '../../../../features/companies/models';
import {AppContext} from '../../../../contexts/AppContext';
import Button, {ButtonVariants} from '../../../../components/Button';
import {getCommonLocaleKey} from '../../../../locales/common.locale';
import styles from './SettingForm.module.css';
import {SettingFormContext} from '../../contexts/SettingFormContext';
import {DeepReadonly} from 'utility-types';
import {Country} from '../../../../features/options';
import {SnackbarVariant} from '../../../../components/Snackbar';

export type SettingFormAction =
  | {
      type: 'toggleAddBank';
      value?: boolean;
    }
  | {
      type: 'toggleConfirmCancelAddBank';
      value?: boolean;
    };

export interface SettingFormStates {
  isOpenAdd: boolean;
  isOpenConfirmCancelAdd: boolean;
}

const initialSettingFormStates = {
  isOpenAdd: false,
  isOpenConfirmCancelAdd: false,
};

export const SettingFormDispatch = createContext<React.Dispatch<
  SettingFormAction
> | null>(null);

function reducer(
  stateR: SettingFormStates,
  action: SettingFormAction,
): SettingFormStates {
  switch (action.type) {
    case 'toggleAddBank':
      return {
        ...stateR,
        isOpenAdd:
          typeof action.value === 'boolean' ? action.value : !stateR.isOpenAdd,
      };
    case 'toggleConfirmCancelAddBank':
      return {
        ...stateR,
        isOpenConfirmCancelAdd:
          typeof action.value === 'boolean' ? action.value : !stateR.isOpenAdd,
      };
    default:
      throw new Error();
  }
}

export interface SettingFormProps {
  company: Company | null;
  countries: DeepReadonly<Country[]>;
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
}

const SettingForm: FunctionComponent<
  SettingFormProps & FormValidateChildProps
> = ({
  submitted,
  onSubmit,
  children,
  company,
  countries,
  onCreateBank,
  onDeleteBank,
}: FormValidateChildProps & SettingFormProps) => {
  const [{isOpenAdd, isOpenConfirmCancelAdd}, dispatch] = useReducer(
    reducer,
    initialSettingFormStates,
  );

  const appContext = useContext(AppContext);

  const {t} = useTranslation();

  if (!company) {
    return null;
  }

  const handlerCreatBank: SubmitCallback = (inputs) => {
    if (company && appContext) {
      onCreateBank(
        {
          companyId: company.companyId,
          info: {
            accountName: inputs.bankAcc.value,
            accountNumber: inputs.bankNum.value,
            bankId: inputs.bank.value,
            branchCode: inputs.bankCode.value,
          },
        },
        (success) => {
          if (success) {
            dispatch({type: 'toggleAddBank'});
            appContext.snackAdd(
              t(getLocaleKey('addBankSuccess')),
              SnackbarVariant.Success,
            );
          } else {
            appContext.snackAdd(
              t(getLocaleKey('addBankFailed')),
              SnackbarVariant.Error,
            );
          }
        },
      );
    }
  };

  function handlerCancelBank() {
    dispatch({type: 'toggleAddBank', value: false});
    dispatch({type: 'toggleConfirmCancelAddBank', value: false});
  }

  function handlerContinueBank() {
    dispatch({type: 'toggleConfirmCancelAddBank', value: false});
  }

  function deleteBankAccount(
    bankId: number,
    done?: (success: boolean) => void,
  ) {
    if (company) {
      onDeleteBank(company.companyId, bankId, (success) => {
        if (done) {
          done(success);
        }
      });
    }
  }

  return (
    <SettingFormDispatch.Provider value={dispatch}>
      <SettingFormContext.Provider
        value={{
          deleteBankAccount,
          countries,
        }}
      >
        <SceneHeading
          title={t(getLocaleKey('title'))}
          subTitle={t(getLocaleKey('subTitle'))}
        />
        <Card>
          <form onSubmit={onSubmit} noValidate={true}>
            <div className="row">
              <div className="col-4">
                <UploadLogoForm
                  currentLogo={company.companyLogoPath}
                  companyName={company.companyName}
                />
              </div>
              <div className="col-8">
                <InputForm company={company} />
              </div>
            </div>
            {children}
            <div className={styles.footer}>
              <Button
                disabled={submitted}
                type="button"
                className={styles.button}
                variant={ButtonVariants.Secondary}
              >
                {t(getCommonLocaleKey('cancel'))}
              </Button>
              <Button
                disabled={submitted}
                className={styles.button}
                variant={ButtonVariants.Primary}
              >
                {t(getCommonLocaleKey('save'))}
              </Button>
            </div>
          </form>
        </Card>
        {isOpenAdd && (
          <Modal
            open={isOpenAdd}
            classes={{
              card: styles.card,
            }}
          >
            <BankContainer
              submitCallback={handlerCreatBank}
              rules={defaultRules}
            />
          </Modal>
        )}
        {isOpenConfirmCancelAdd && (
          <Modal
            open={isOpenConfirmCancelAdd}
            renderTitle={t(getCommonLocaleKey('cancelNotice'))}
            renderActions={
              <Fragment>
                <Button
                  variant={ButtonVariants.Secondary}
                  onClick={handlerCancelBank}
                >
                  {t(getCommonLocaleKey('yes'))}
                </Button>
                <Button
                  onClick={handlerContinueBank}
                  variant={ButtonVariants.Primary}
                  className={styles.modalButton}
                >
                  {t(getCommonLocaleKey('no'))}
                </Button>
              </Fragment>
            }
          />
        )}
      </SettingFormContext.Provider>
    </SettingFormDispatch.Provider>
  );
};

export default HOCForm<SettingFormProps>(SettingForm);
