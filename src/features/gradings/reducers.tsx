import {combineReducers} from 'redux';
import {ActionType} from 'typesafe-actions';

import * as gradingActions from './actions';
import {GRADING_SET_LIST, GRADING_UPDATE_ENTITY} from './constants';
import {Grading} from './models';
import {UsersAction} from '../users';
import {LOGOUT} from '../users/constants';

export type DepartmentActions = ActionType<typeof gradingActions>;

export interface GradingsDefaultState {
  data: number[];
  total: number;
  limit: number;
  page: number;
  lastUpdated: number;
  isFetching: boolean;
  isFailed: boolean;
  keyword: string;
}

export interface GradingEntity {
  data?: Grading;
  lastUpdated: number;
  isFetching: boolean;
  isFailed: boolean;
}

export const gradingEntityDefaultState = {
  lastUpdated: 0,
  isFetching: false,
  isFailed: false,
};

export interface GradingsState {
  default: GradingsDefaultState;
  entities: {
    [k: number]: GradingEntity;
  };
}

const initGradingsDefaultState: GradingsDefaultState = {
  data: [],
  total: 0,
  limit: 5,
  page: 1,
  lastUpdated: 0,
  isFailed: false,
  isFetching: false,
  keyword: '',
};

export default combineReducers<GradingsState, DepartmentActions | UsersAction>({
  default: (state = initGradingsDefaultState, action) => {
    switch (action.type) {
      case GRADING_SET_LIST: {
        return {
          ...state,
          ...action.payload,
          data: action.payload.data
            ? action.payload.data.reduce(
                (re, cur) => {
                  re.push(cur.gradingId);
                  return re;
                },
                [] as number[],
              )
            : state.data,
          lastUpdated: new Date().getTime(),
        };
      }
      case LOGOUT: {
        return initGradingsDefaultState;
      }
    }
    return state;
  },
  entities: (state = {}, action) => {
    switch (action.type) {
      case GRADING_SET_LIST: {
        if (action.payload.data) {
          const newTime = new Date().getTime();
          return {
            ...state,
            ...action.payload.data.reduce((re, cur) => {
              return {
                ...re,
                [cur.gradingId]: {
                  data: cur,
                  lastUpdated: newTime,
                  isFailed: false,
                  isFetching: false,
                } as GradingEntity,
              };
            }, {}),
          };
        }
        return state;
      }
      case GRADING_UPDATE_ENTITY: {
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
                ...gradingEntityDefaultState,
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
