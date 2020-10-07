import {combineReducers} from 'redux';
import {ActionType} from 'typesafe-actions';

import * as companiesActions from './actions';
import {Company} from './models';
import {COMPANY_SET_DEFAULT} from './constants';
import {UsersAction} from '../users';
import {LOGOUT} from '../users/constants';

export type CompaniesActions = ActionType<typeof companiesActions>;

export interface CompaniesDefaultState {
  data: Company | null;
  lastUpdated: number;
  isFetching: boolean;
  isFailed: boolean;
}

export interface CompaniesState {
  default: CompaniesDefaultState;
}

const initCompaniesDefaultState: CompaniesDefaultState = {
  data: null,
  lastUpdated: 0,
  isFailed: false,
  isFetching: false,
};

export default combineReducers<CompaniesState, CompaniesActions | UsersAction>({
  default: (state = initCompaniesDefaultState, action) => {
    switch (action.type) {
      case COMPANY_SET_DEFAULT: {
        return {
          ...state,
          ...action.payload,
          lastUpdated: new Date().getTime(),
        };
      }

      case LOGOUT: {
        return initCompaniesDefaultState;
      }
    }
    return state;
  },
});
