import {action} from 'typesafe-actions';
import {
  BANKS_GET,
  BANKS_SET,
  COUNTRIES_GET,
  COUNTRIES_SET,
  STATES_GET,
  STATES_SET,
} from './constants';
import {BanksState, CountriesState, CountryStatesState} from './reducers';

export const countriesGet = () => action(COUNTRIES_GET);
export const countriesSet = (data: Partial<CountriesState>) =>
  action(COUNTRIES_SET, data);

export const statesGet = (countryId?: string) => action(STATES_GET, countryId);
export const statesSet = (data: Partial<CountryStatesState>) =>
  action(STATES_SET, data);

export const banksGet = (stateId?: number) => action(BANKS_GET, stateId);
export const banksSet = (data: Partial<BanksState>, stateId?: number) =>
  action(BANKS_SET, {
    data,
    stateId,
  });
