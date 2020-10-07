import {combineReducers} from 'redux';
import {ActionType} from 'typesafe-actions';
import {DeepReadonly} from 'utility-types';
import * as optionsActions from './actions';
import {BankWithState, Country, State} from './models';
import * as optionsConstants from './constants';

export type OptionsActions = ActionType<typeof optionsActions>;

export interface CountriesState {
  list: Country[];
  lastUpdated: number;
  isFetching: boolean;
  isFailed: boolean;
}

export interface CountryStatesState {
  list: State[];
  lastUpdated: number;
  isFetching: boolean;
  isFailed: boolean;
}

export interface BanksState {
  list: BankWithState[];
  lastUpdated: number;
  isFetching: boolean;
  isFailed: boolean;
}

export type OptionsStates = DeepReadonly<{
  countries: CountriesState;
  states: CountryStatesState;
  banks: BanksState;
}>;

export const initialOptionsCountriesState = {
  list: [],
  lastUpdated: 0,
  isFetching: false,
  isFailed: false,
};

export const initialOptionsCountryStatesState = {
  list: [],
  lastUpdated: 0,
  isFetching: false,
  isFailed: false,
};

export const initialOptionsBanksState = {
  list: [],
  lastUpdated: 0,
  isFetching: false,
  isFailed: false,
};

export default combineReducers<OptionsStates, OptionsActions>({
  countries: (state = initialOptionsCountriesState, action) => {
    switch (action.type) {
      case optionsConstants.COUNTRIES_SET: {
        return {
          ...state,
          ...action.payload,
          lastUpdated: new Date().getTime(),
        };
      }
    }
    return state;
  },
  states: (state = initialOptionsCountryStatesState, action) => {
    switch (action.type) {
      case optionsConstants.STATES_SET: {
        return {
          ...state,
          ...action.payload,
          lastUpdated: new Date().getTime(),
        };
      }
    }
    return state;
  },
  banks: (state = initialOptionsBanksState, action) => {
    switch (action.type) {
      case optionsConstants.BANKS_SET: {
        if (state.list.length !== 0 && action.payload.data.list) {
          const newList = state.list.slice(0).filter((l) => {
            if (action.payload.stateId) {
              return l.stateId !== action.payload.stateId;
            }
            return true;
          });

          return {
            ...state,
            ...action.payload.data,
            list: [...newList, ...action.payload.data.list],
            lastUpdated: new Date().getTime(),
          };
        }
        return {
          ...state,
          ...action.payload.data,
          lastUpdated: new Date().getTime(),
        };
      }
    }
    return state;
  },
});
