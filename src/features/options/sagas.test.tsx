import {testSaga} from 'redux-saga-test-plan';
import {
  getCountriesSelector,
  getCountryStatesSelector,
  handlerBanksGet,
  handlerCountriesGet,
  handlerCountryStatesGet,
} from './sagas';
import {
  BankWithState,
  Country,
  initialOptionsCountriesState,
  initialOptionsCountryStatesState,
  optionsActions,
  State,
} from './index';
import {
  BANKS_GET,
  BANKS_SET,
  COUNTRIES_GET,
  COUNTRIES_SET,
  STATES_GET,
  STATES_SET,
} from './constants';
import {
  fetchBanks,
  fetchCountries,
  FetchCountriesResponse,
  fetchCountryStates,
  FetchCountryStatesResponse,
} from './apis';
import {AxiosResponse} from 'axios';

describe('Option sagas', () => {
  describe('Handler get countries', () => {
    it('Should stop get countries', () => {
      testSaga(handlerCountriesGet, {
        type: COUNTRIES_GET,
      } as ReturnType<typeof optionsActions.countriesGet>)
        .next()
        .select(getCountriesSelector)
        .next({
          lastUpdated: new Date().getTime() + 620000,
        })
        .finish()
        .isDone();
    });

    it('Should work when get api success', () => {
      const apiData = {
        data: {
          data: [
            {countryCode: '1', countryName: 'SG', countryId: 1},
          ] as Country[],
        },
      };
      testSaga(handlerCountriesGet, {
        type: COUNTRIES_GET,
      } as ReturnType<typeof optionsActions.countriesGet>)
        .next()
        .select(getCountriesSelector)
        .next(initialOptionsCountriesState)
        .put({
          type: COUNTRIES_SET,
          payload: {isFailed: false, isFetching: true},
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.countriesSet>)
        .next()
        .call(fetchCountries)
        .next(apiData as AxiosResponse<FetchCountriesResponse>)
        .put({
          type: COUNTRIES_SET,
          payload: {
            isFailed: false,
            isFetching: false,
            list: apiData.data.data,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.countriesSet>)
        .finish()
        .isDone();
    });

    it('Should work when get api failed', () => {
      const apiErr = Object.create(Error);

      apiErr.response = {
        status: 500,
      };

      apiErr.request = 1;

      testSaga(handlerCountriesGet, {
        type: COUNTRIES_GET,
      } as ReturnType<typeof optionsActions.countriesGet>)
        .next()
        .select(getCountriesSelector)
        .next(initialOptionsCountriesState)
        .put({
          type: COUNTRIES_SET,
          payload: {isFailed: false, isFetching: true},
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.countriesSet>)
        .next()
        .call(fetchCountries)
        .throw(apiErr)
        .put({
          type: COUNTRIES_SET,
          payload: {
            isFailed: true,
            isFetching: false,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.countriesSet>)
        .finish()
        .isDone();
    });
  });

  describe('Handler get country states', () => {
    it('Should stop get country states', () => {
      testSaga(handlerCountryStatesGet, {
        type: STATES_GET,
      } as ReturnType<typeof optionsActions.statesGet>)
        .next()
        .select(getCountryStatesSelector)
        .next({
          lastUpdated: new Date().getTime() + 620000,
        })
        .finish()
        .isDone();
    });

    it('Should work when call api success', () => {
      const apiData = {
        data: {
          data: [{countryId: 1, stateName: 'SG', stateId: 1}] as State[],
        },
      };

      testSaga(handlerCountryStatesGet, {
        type: STATES_GET,
      } as ReturnType<typeof optionsActions.statesGet>)
        .next()
        .select(getCountryStatesSelector)
        .next(initialOptionsCountryStatesState)
        .put({
          type: STATES_SET,
          payload: {
            isFetching: true,
            isFailed: false,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.statesSet>)
        .next()
        .call(fetchCountryStates, undefined)
        .next(apiData as AxiosResponse<FetchCountryStatesResponse>)
        .put({
          type: STATES_SET,
          payload: {
            isFetching: false,
            isFailed: false,
            list: apiData.data.data,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.statesSet>)
        .finish()
        .isDone();
    });

    it('Should work when call api error', () => {
      const apiErr = Object.create(Error);

      apiErr.response = {
        status: 500,
      };

      apiErr.request = 1;

      testSaga(handlerCountryStatesGet, {
        type: STATES_GET,
      } as ReturnType<typeof optionsActions.statesGet>)
        .next()
        .select(getCountryStatesSelector)
        .next(initialOptionsCountryStatesState)
        .put({
          type: STATES_SET,
          payload: {
            isFetching: true,
            isFailed: false,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.statesSet>)
        .next()
        .call(fetchCountryStates, undefined)
        .throw(apiErr)
        .put({
          type: STATES_SET,
          payload: {
            isFetching: false,
            isFailed: true,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.statesSet>)
        .finish()
        .isDone();
    });
  });

  describe('Handler get banks states', () => {
    it('Should stop get banks states', () => {
      testSaga(handlerBanksGet, {
        type: BANKS_GET,
        payload: 1,
      } as ReturnType<typeof optionsActions.banksGet>)
        .next()
        .next({
          list: [
            {
              bankId: 1,
              stateId: 1,
              bankName: '1',
              lastUpdated: new Date().getTime() + 620000,
            },
          ] as BankWithState[],
          lastUpdated: 0,
        })
        .finish()
        .isDone();
    });

    it('Should work when call api success', () => {
      const mockedDate = new Date(2017, 11, 10);

      (global.Date as any) = jest.fn(() => mockedDate);

      const apiData = {
        data: {
          data: [
            {
              bankId: 1,
              bankName: '1',
              stateId: 0,
              lastUpdated: mockedDate.getTime(),
            },
          ] as BankWithState[],
        },
      };

      testSaga(handlerBanksGet, {
        type: BANKS_GET,
      } as ReturnType<typeof optionsActions.banksGet>)
        .next()
        .put({
          type: BANKS_SET,
          payload: {
            data: {
              isFetching: true,
              isFailed: false,
            },
            stateId: undefined,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.banksSet>)
        .next()
        .call(fetchBanks, undefined)
        .next(apiData)
        .put({
          type: BANKS_SET,
          payload: {
            data: {
              isFetching: false,
              isFailed: false,
              list: apiData.data.data,
            },
            stateId: undefined,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.banksSet>)
        .finish()
        .isDone();
    });

    it('Should work when call api error', () => {
      const apiErr = Object.create(Error);

      apiErr.response = {
        status: 500,
      };

      apiErr.request = 1;

      testSaga(handlerBanksGet, {
        type: BANKS_GET,
      } as ReturnType<typeof optionsActions.banksGet>)
        .next()
        .put({
          type: BANKS_SET,
          payload: {
            data: {
              isFetching: true,
              isFailed: false,
            },
            stateId: undefined,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.banksSet>)
        .next()
        .call(fetchBanks, undefined)
        .throw(apiErr)
        .put({
          type: BANKS_SET,
          payload: {
            data: {
              isFetching: false,
              isFailed: true,
            },
            stateId: undefined,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof optionsActions.banksSet>)
        .finish()
        .isDone();
    });
  });
});
