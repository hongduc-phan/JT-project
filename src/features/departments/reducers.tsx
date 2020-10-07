import {combineReducers} from 'redux';
import {ActionType} from 'typesafe-actions';

import * as departmentActions from './actions';
import {DEPARTMENT_SET_LIST, DEPARTMENT_UPDATE_ENTITY} from './constants';
import {Department} from './models';
import {UsersAction} from '../users';
import {LOGOUT} from '../users/constants';

export type DepartmentActions = ActionType<typeof departmentActions>;

export interface DepartmentsDefaultState {
  data: number[];
  total: number;
  limit: number;
  page: number;
  lastUpdated: number;
  isFetching: boolean;
  isFailed: boolean;
  keyword: string;
}

export interface DepartmentEntity {
  data?: Department;
  lastUpdated: number;
  isFetching: boolean;
  isFailed: boolean;
}

export const departmentEntityDefaultState = {
  lastUpdated: 0,
  isFetching: false,
  isFailed: false,
};

export interface DepartmentsState {
  default: DepartmentsDefaultState;
  entities: {
    [k: number]: DepartmentEntity;
  };
}

const initDepartmentsDefaultState: DepartmentsDefaultState = {
  data: [],
  total: 0,
  limit: 5,
  page: 1,
  lastUpdated: 0,
  isFailed: false,
  isFetching: false,
  keyword: '',
};

export default combineReducers<
  DepartmentsState,
  DepartmentActions | UsersAction
>({
  default: (state = initDepartmentsDefaultState, action) => {
    switch (action.type) {
      case DEPARTMENT_SET_LIST: {
        return {
          ...state,
          ...action.payload,
          data: action.payload.data
            ? action.payload.data.reduce(
                (re, cur) => {
                  re.push(cur.departmentId);
                  return re;
                },
                [] as number[],
              )
            : state.data,
          lastUpdated: new Date().getTime(),
        };
      }
      case LOGOUT: {
        return initDepartmentsDefaultState;
      }
    }
    return state;
  },
  entities: (state = {}, action) => {
    switch (action.type) {
      case DEPARTMENT_SET_LIST: {
        if (action.payload.data) {
          const newTime = new Date().getTime();
          return {
            ...state,
            ...action.payload.data.reduce((re, cur) => {
              return {
                ...re,
                [cur.departmentId]: {
                  data: cur,
                  lastUpdated: newTime,
                  isFailed: false,
                  isFetching: false,
                } as DepartmentEntity,
              };
            }, {}),
          };
        }
        return state;
      }
      case DEPARTMENT_UPDATE_ENTITY: {
        if (!action.payload.data && state[action.payload.id]) {
          const newState = {
            ...state,
          };
          delete newState[action.payload.id];
          return newState;
        } else {
          return {
            ...state,
            ...{
              [action.payload.id]: {
                ...departmentEntityDefaultState,
                ...state[action.payload.id],
                ...action.payload.data,
              },
            },
          };
        }
      }
      case LOGOUT: {
        return {};
      }
    }
    return state;
  },
});
