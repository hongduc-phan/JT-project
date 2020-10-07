import axios from 'axios';
import config from '../../config';
import {AddBank, Company} from './models';

export interface FetchGetCompanyDetailResponse {
  data: Company;
}

export function fetchGetCompanyDetail(id: string) {
  return axios.get<FetchGetCompanyDetailResponse>(
    `${config.apiHost}${config.apiEndPoints.companyDetail(id)}`,
  );
}

export function fetchCompanyCreateBank(companyId: string, data: AddBank) {
  return axios.post(
    `${config.apiHost}${config.apiEndPoints.createCompanyBank(companyId)}`,
    data,
  );
}

export function fetchCompanyDeleteBank(companyId: string, bankId: number) {
  return axios.delete(
    `${config.apiHost}${config.apiEndPoints.deleteCompanyBank(
      companyId,
      bankId,
    )}`,
  );
}

export interface FetchEditCompanyBody {
  companyName: string;
  businessRegNo?: string;
  countryId?: string;
  startWeek?: string;
  logo?: FileList;
  postalCode?: string;
  address1?: string;
  address2?: string;
  halfDayHour?: string;
}

export function fetchEditCompany(id: string, data: FetchEditCompanyBody) {
  const bodyFormData = new FormData();

  bodyFormData.set('companyName', data.companyName);
  bodyFormData.set('businessRegNo', data.businessRegNo || '');
  bodyFormData.set('countryId', data.countryId || '');
  if (data.logo && data.logo.length > 0) {
    bodyFormData.set('logo', data.logo[0]);
  }
  bodyFormData.set('address1', data.address1 || '');
  bodyFormData.set('address2', data.address2 || '');
  bodyFormData.set('weekStart', data.startWeek || '');
  bodyFormData.set('halfDayHour', data.halfDayHour || '');
  bodyFormData.set('postalCode', data.postalCode || '');

  return axios.put<FetchGetCompanyDetailResponse>(
    `${config.apiHost}${config.apiEndPoints.companyDetail(id)}`,
    bodyFormData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
}
