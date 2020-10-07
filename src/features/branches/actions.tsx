import {action} from 'typesafe-actions';

import {
  BRANCH_CREATE,
  BRANCH_DELETE,
  BRANCH_EDIT,
  BRANCH_GET_DETAIL,
  BRANCH_LIST_ALL,
  BRANCH_SET_LIST,
  BRANCH_UPDATE_ENTITY,
} from './constants';
import {FetchCreateBranchBody} from './apis';
import {Branch} from './models';
import {BranchEntity} from './reducers';

export const listBranches = (
  page: number,
  limit: number,
  name: string,
  done?: (success: boolean) => void,
) => action(BRANCH_LIST_ALL, {page, limit, name}, {done});

export interface SetBranchDefaultData {
  data?: Branch[];
  total?: number;
  limit?: number;
  page?: number;
  lastUpdated?: number;
  isFetching?: boolean;
  isFailed?: boolean;
  keyword?: string;
}

export const updateBranchEntity = (id: number, data?: Partial<BranchEntity>) =>
  action(BRANCH_UPDATE_ENTITY, {
    id,
    data,
  });

export const branchSetDefault = (data: SetBranchDefaultData) =>
  action(BRANCH_SET_LIST, data);

export const createBranch = (
  data: FetchCreateBranchBody,
  done?: (success: boolean) => void,
) => action(BRANCH_CREATE, data, {done});

export const deleteBranch = (id: number, done?: (success: boolean) => void) =>
  action(BRANCH_DELETE, id, {done});

export const editBranch = (
  id: number,
  data: FetchCreateBranchBody,
  done?: (success: boolean) => void,
) => action(BRANCH_EDIT, {id, data}, {done});

export const detailBranch = (
  id: number,
  done?: (success: boolean, notFound?: boolean) => void,
) => action(BRANCH_GET_DETAIL, id, {done});
