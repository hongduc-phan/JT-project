import {all, fork, takeLatest, call, put, select} from 'redux-saga/effects';
import {
  BanksState,
  BankWithState,
  CountriesState,
  CountryStatesState,
  optionsActions,
  optionsConstants,
} from './index';
import {
  fetchBanks,
  FetchBanksResponse,
  fetchCountries,
  FetchCountriesResponse,
  fetchCountryStates,
  FetchCountryStatesResponse,
} from './apis';
import {AxiosResponse} from 'axios';
import {RootState} from '../../store';
import {DeepReadonly} from 'utility-types';

export function getCountriesSelector(
  state: RootState,
): DeepReadonly<CountriesState> {
  return state.options.countries;
}

export function getCountryStatesSelector(
  state: RootState,
): DeepReadonly<CountryStatesState> {
  return state.options.states;
}

export function getBanksSelector(state: RootState): DeepReadonly<BanksState> {
  return state.options.banks;
}

export function* handlerCountriesGet() {
  try {
    const countriesCurrent: DeepReadonly<CountriesState> = yield select(
      getCountriesSelector,
    );

    if (
      countriesCurrent.lastUpdated !== 0 &&
      new Date().getTime() - countriesCurrent.lastUpdated < 600000
    ) {
      return;
    }

    yield put(
      optionsActions.countriesSet({
        isFailed: false,
        isFetching: true,
      }),
    );

    const data: AxiosResponse<FetchCountriesResponse> = yield call(
      fetchCountries,
    );

    yield put(
      optionsActions.countriesSet({
        isFailed: false,
        isFetching: false,
        list: data.data.data,
      }),
    );
  } catch (e) {
    yield put(
      optionsActions.countriesSet({
        isFailed: true,
        isFetching: false,
      }),
    );
  }
}

export function* handlerCountryStatesGet({
  payload,
}: ReturnType<typeof optionsActions.statesGet>) {
  try {
    const statesCurrent: DeepReadonly<CountryStatesState> = yield select(
      getCountryStatesSelector,
    );

    if (
      statesCurrent.lastUpdated !== 0 &&
      new Date().getTime() - statesCurrent.lastUpdated < 600000
    ) {
      return;
    }

    yield put(
      optionsActions.statesSet({
        isFailed: false,
        isFetching: true,
      }),
    );

    const data: AxiosResponse<FetchCountryStatesResponse> = yield call(
      fetchCountryStates,
      payload,
    );

    yield put(
      optionsActions.statesSet({
        list: data.data.data,
        isFailed: false,
        isFetching: false,
      }),
    );
  } catch (e) {
    yield put(
      optionsActions.statesSet({
        isFailed: true,
        isFetching: false,
      }),
    );
  }
}

export function* handlerBanksGet({
  payload,
}: ReturnType<typeof optionsActions.banksGet>) {
  try {
    if (payload) {
      const statesCurrent: DeepReadonly<BanksState> = yield select(
        getBanksSelector,
      );

      const bankWithStateId = statesCurrent.list.find(
        (l) => l.stateId === payload,
      );

      if (
        bankWithStateId &&
        new Date().getTime() - bankWithStateId.lastUpdated < 6000
      ) {
        return;
      }
    }

    yield put(
      optionsActions.banksSet({
        isFailed: false,
        isFetching: true,
      }),
    );

    const data: AxiosResponse<FetchBanksResponse> = yield call(
      fetchBanks,
      payload,
    );

    const newDate = new Date().getTime();

    yield put(
      optionsActions.banksSet(
        {
          list: data.data.data.reduce(
            (acc, current) => {
              acc.push({
                ...current,
                // @todo wait api team fix stateId missing
                stateId: payload || 0,
                lastUpdated: newDate,
              });
              return acc;
            },
            [] as BankWithState[],
          ),
          isFetching: false,
          isFailed: false,
        },
        payload,
      ),
    );
  } catch (e) {
    yield put(
      optionsActions.banksSet({
        isFailed: true,
        isFetching: false,
      }),
    );
  }
}

function* watchOptionsActions() {
  yield takeLatest(optionsConstants.COUNTRIES_GET, handlerCountriesGet);
  yield takeLatest(optionsConstants.STATES_GET, handlerCountryStatesGet);
  yield takeLatest(optionsConstants.BANKS_GET, handlerBanksGet);
}

export function* optionsSagas() {
  yield all([fork(watchOptionsActions)]);
}
