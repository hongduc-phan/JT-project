import axios from 'axios';

import config from '../../config';

import {Branch} from './models';

export interface FetchGetBranchesResponse {
  data: Branch[];
  meta: {total: number};
}

export interface FetchCreateBranchResponse {
  data: Branch;
}

export interface FetchDetailBranchResponse {
  data: Branch;
}

export interface FetchCreateBranchBody {
  branchName: string;
  branchLogoPath?: FileList;
  companyId: string;
  address1: string;
  address2: string;
  branchLat: number;
  branchLong: number;
}

export function fetchGetBranches(page: number, limit: number, name: string) {
  return axios.get<FetchGetBranchesResponse>(
    `${config.apiHost}${config.apiEndPoints.getBranches(page, limit, name)}`,
  );
}

export function fetchCreateBranch(data: FetchCreateBranchBody) {
  if (!data.branchLogoPath) {
    return axios.post<FetchCreateBranchResponse>(
      `${config.apiHost}${config.apiEndPoints.createBranch}`,
      data,
    );
  }

  const bodyFormData = new FormData();

  bodyFormData.set('address1', data.address1);
  bodyFormData.set('address2', data.address2);
  bodyFormData.set('branchLat', data.branchLat.toString());
  bodyFormData.set('branchLong', data.branchLong.toString());
  bodyFormData.set('branchName', data.branchName);
  bodyFormData.set('companyId', data.companyId);
  bodyFormData.set('logo', data.branchLogoPath[0]);

  return axios.post<FetchCreateBranchResponse>(
    `${config.apiHost}${config.apiEndPoints.createBranch}`,
    bodyFormData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
}

export function fetchDeleteBranch(id: number) {
  return axios.delete(
    `${config.apiHost}${config.apiEndPoints.deleteBranch(id)}`,
  );
}

export function fetchEditBranch(id: number, data: FetchCreateBranchBody) {
  if (!data.branchLogoPath) {
    return axios.put(
      `${config.apiHost}${config.apiEndPoints.editBranch(id)}`,
      data,
    );
  }
  const bodyFormData = new FormData();
  bodyFormData.set('address1', data.address2);
  bodyFormData.set('address1', data.address1);
  bodyFormData.set('address2', data.address2);
  bodyFormData.set('branchLat', data.branchLat.toString());
  bodyFormData.set('branchLong', data.branchLong.toString());
  bodyFormData.set('branchName', data.branchName);
  bodyFormData.set('companyId', data.companyId);
  bodyFormData.set('logo', data.branchLogoPath[0]);

  return axios.post<FetchCreateBranchResponse>(
    `${config.apiHost}${config.apiEndPoints.createBranch}`,
    bodyFormData,
    {
      headers: {'Content-Type': 'multipart/form-data'},
    },
  );
}

export function fetchDetailBranch(id: number) {
  return axios.get(`${config.apiHost}${config.apiEndPoints.detailBranch(id)}`);
}
