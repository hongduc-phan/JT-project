import {combineReducers} from 'redux';
import {ActionType} from 'typesafe-actions';

import * as branchActions from './actions';
import {BRANCH_SET_LIST, BRANCH_UPDATE_ENTITY} from './constants';
import {Branch} from './models';
import {UsersAction} from '../users';
import {LOGOUT} from '../users/constants';

export type BranchActions = ActionType<typeof branchActions>;

export interface BranchesDefaultState {
  data: number[];
  total: number;
  limit: number;
  page: number;
  lastUpdated: number;
  isFetching: boolean;
  isFailed: boolean;
  keyword: string;
}

export interface BranchEntity {
  data?: Branch;
  lastUpdated: number;
  isFetching: boolean;
  isFailed: boolean;
}

export const branchEntityDefaultState = {
  lastUpdated: 0,
  isFetching: false,
  isFailed: false,
};

export interface BranchesState {
  default: BranchesDefaultState;
  entities: {
    [k: number]: BranchEntity;
  };
}

export const initBranchDefaultState: BranchesDefaultState = {
  data: [],
  total: 0,
  limit: 5,
  page: 1,
  lastUpdated: 0,
  isFailed: false,
  isFetching: false,
  keyword: '',
};

export default combineReducers<BranchesState, BranchActions | UsersAction>({
  default: (state = initBranchDefaultState, action) => {
    switch (action.type) {
      case BRANCH_SET_LIST: {
        return {
          ...state,
          ...action.payload,
          data: action.payload.data
            ? action.payload.data.reduce(
                (re, cur) => {
                  re.push(cur.branchId);
                  return re;
                },
                [] as number[],
              )
            : state.data,
          lastUpdated: new Date().getTime(),
        };
      }
      case LOGOUT: {
        return initBranchDefaultState;
      }
    }
    return state;
  },
  entities: (state = {}, action) => {
    switch (action.type) {
      case BRANCH_SET_LIST: {
        if (action.payload.data) {
          const newTime = new Date().getTime();
          return {
            ...state,
            ...action.payload.data.reduce((re, cur) => {
              return {
                ...re,
                [cur.branchId]: {
                  data: cur,
                  lastUpdated: newTime,
                  isFailed: false,
                  isFetching: false,
                } as BranchEntity,
              };
            }, {}),
          };
        }
        return state;
      }
      case BRANCH_UPDATE_ENTITY: {
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
                ...branchEntityDefaultState,
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
