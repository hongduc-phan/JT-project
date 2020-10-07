import axios from 'axios';
import config from '../../config';
import {Bank, Country, State} from './models';

export interface FetchCountriesResponse {
  data: Country[];
}

export interface FetchCountryStatesResponse {
  data: State[];
}

export interface FetchBanksResponse {
  data: Bank[];
}

export function fetchCountries() {
  return axios.get<FetchCountriesResponse>(
    `${config.apiHost}${config.apiEndPoints.getCountries}`,
  );
}

export function fetchCountryStates(countryId?: number | string) {
  return axios.get<FetchCountryStatesResponse>(
    `${config.apiHost}${config.apiEndPoints.getCountryStates(countryId)}`,
  );
}

export function fetchBanks(stateId?: number | string) {
  return axios.get<FetchBanksResponse>(
    `${config.apiHost}${config.apiEndPoints.getBanks(stateId)}`,
  );
}
