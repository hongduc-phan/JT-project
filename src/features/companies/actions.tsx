import {action} from 'typesafe-actions';
import {
  COMPANY_ADD_BANK,
  COMPANY_DELETE_BANK,
  COMPANY_EDIT,
  COMPANY_GET_DETAIL_DEFAULT,
  COMPANY_SET_DEFAULT,
} from './constants';
import {CompaniesDefaultState} from './reducers';
import {AddBank} from './models';
import {FetchEditCompanyBody} from './apis';

export const companyDefaultGetDetail = (
  id: string,
  done?: (success: boolean) => void,
) =>
  action(COMPANY_GET_DETAIL_DEFAULT, id, {
    done,
  });

export const companySetDefault = (data: Partial<CompaniesDefaultState>) =>
  action(COMPANY_SET_DEFAULT, data);

export const companyAddBank = (
  data: {
    info: AddBank;
    companyId: string;
  },
  done?: (success: boolean) => void,
) => action(COMPANY_ADD_BANK, data, {done});

export const companyDeleteBank = (
  companyId: string,
  bankAccountId: number,
  done?: (success: boolean) => void,
) => action(COMPANY_DELETE_BANK, {companyId, bankAccountId}, {done});

export const editCompany = (
  companyId: string,
  data: FetchEditCompanyBody,
  done?: (success: boolean) => void,
) => action(COMPANY_EDIT, {companyId, data}, {done});
