import {action} from 'typesafe-actions';

import {
  GRADING_CREATE,
  GRADING_DELETE,
  GRADING_EDIT,
  GRADING_LIST_ALL,
  GRADING_SET_LIST,
  GRADING_UPDATE_ENTITY,
} from './constants';
import {GradingEntity} from './reducers';
import {Grading} from './models';
import {FetchCreateGradingBody} from './apis';

export interface SetGradingDefaultData {
  data?: Grading[];
  total?: number;
  limit?: number;
  page?: number;
  lastUpdated?: number;
  isFetching?: boolean;
  isFailed?: boolean;
  keyword?: string;
}

export const listGradings = (
  page: number,
  limit: number,
  name: string,
  done?: (success: boolean) => void,
) => action(GRADING_LIST_ALL, {page, limit, name}, {done});

export const updateGradingEntity = (
  id: number,
  data?: Partial<GradingEntity>,
) =>
  action(GRADING_UPDATE_ENTITY, {
    id,
    data,
  });

export const gradingSetDefault = (data: SetGradingDefaultData) =>
  action(GRADING_SET_LIST, data);

export const createGrading = (
  data: FetchCreateGradingBody,
  done?: (success: boolean) => void,
) => action(GRADING_CREATE, data, {done});

export const editGrading = (
  id: number,
  data: Partial<FetchCreateGradingBody>,
  done?: (success: boolean) => void,
) => action(GRADING_EDIT, {id, data}, {done});

export const deleteGrading = (id: number, done?: (success: boolean) => void) =>
  action(GRADING_DELETE, {id}, {done});
