import axios from 'axios';

import config from '../../config';

import {Department} from './models';

export interface FetchGetDepartmentsResponse {
  data: Department[];
  meta: {total: number};
}

export interface FetchCreateDepartmentResponse {
  data: Department;
}

export interface FetchDetailDepartmentResponse {
  data: Department;
}

export interface FetchCreateDepartmentBody {
  departmentName: string;
}

export function fetchGetDepartments(page: number, limit: number, name: string) {
  return axios.get<FetchGetDepartmentsResponse>(
    `${config.apiHost}${config.apiEndPoints.getDepartments(page, limit, name)}`,
  );
}

export function fetchCreateDepartment(data: FetchCreateDepartmentBody) {
  return axios.post<FetchCreateDepartmentResponse>(
    `${config.apiHost}${config.apiEndPoints.createDepartment}`,
    data,
  );
}

export function fetchEditDepartment(
  id: number,
  data: Partial<FetchCreateDepartmentBody>,
) {
  return axios.put(
    `${config.apiHost}${config.apiEndPoints.editDepartment(id)}`,
    data,
  );
}

export function fetchDeleteDepartment(id: number) {
  return axios.delete(
    `${config.apiHost}${config.apiEndPoints.deleteDepartment(id)}`,
  );
}
