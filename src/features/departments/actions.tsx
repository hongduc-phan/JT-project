import {action} from 'typesafe-actions';
import {
  DEPARTMENT_CREATE,
  DEPARTMENT_DELETE,
  DEPARTMENT_EDIT,
  DEPARTMENT_LIST_ALL,
  DEPARTMENT_SET_LIST,
  DEPARTMENT_UPDATE_ENTITY,
} from './constants';
import {DepartmentEntity} from './reducers';
import {Department} from './models';
import {FetchCreateDepartmentBody} from './apis';

export const listDepartments = (
  page: number,
  limit: number,
  name: string,
  done?: (success: boolean) => void,
) => action(DEPARTMENT_LIST_ALL, {page, limit, name}, {done});

export interface SetDepartmentDefaultData {
  data?: Department[];
  total?: number;
  limit?: number;
  page?: number;
  lastUpdated?: number;
  isFetching?: boolean;
  isFailed?: boolean;
  keyword?: string;
}

export const updateBranchEntity = (
  id: number,
  data?: Partial<DepartmentEntity>,
) =>
  action(DEPARTMENT_UPDATE_ENTITY, {
    id,
    data,
  });

export const departmentSetDefault = (data: SetDepartmentDefaultData) =>
  action(DEPARTMENT_SET_LIST, data);

export const createDepartment = (
  data: FetchCreateDepartmentBody,
  done?: (success: boolean) => void,
) => action(DEPARTMENT_CREATE, data, {done});

export const editDepartment = (
  id: number,
  data: Partial<FetchCreateDepartmentBody>,
  done?: (success: boolean) => void,
) => action(DEPARTMENT_EDIT, {id, data}, {done});

export const deleteDepartment = (
  id: number,
  done?: (success: boolean) => void,
) => action(DEPARTMENT_DELETE, {id}, {done});
