import {
  initialOptionsBanksState,
  initialOptionsCountriesState,
  initialOptionsCountryStatesState,
  OptionsStates,
} from './reducers';
import {optionsReducers} from './index';
import {banksSet, countriesSet} from './actions';

const getInitState = (state?: Partial<OptionsStates>) => {
  return optionsReducers(
    {
      countries: initialOptionsCountriesState,
      states: initialOptionsCountryStatesState,
      banks: initialOptionsBanksState,
      ...state,
    },
    {} as any,
  );
};

describe('Options Reducers', () => {
  describe('Init state', () => {
    it('Should match snapshot', () => {
      expect(getInitState()).toMatchSnapshot();
    });
  });

  describe('Countries', () => {
    it('Should update new state', () => {
      const initState = getInitState();
      expect(initState.countries).toEqual(initialOptionsCountriesState);
      const state = optionsReducers(
        initState,
        countriesSet({
          isFetching: true,
          isFailed: true,
          list: [{countryCode: '500', countryId: 500, countryName: 'SG'}],
        }),
      );
      expect(state.countries.isFailed).toBeTruthy();
      expect(state.countries.isFetching).toBeTruthy();
      expect(state.countries.list).toHaveLength(1);
      expect(state.countries.lastUpdated).not.toEqual(
        initState.countries.lastUpdated,
      );
    });
  });

  describe('banks', () => {
    it('Should set new state when list empty', () => {
      const initState = getInitState();
      expect(initState.banks).toEqual(initialOptionsBanksState);
      const state = optionsReducers(
        initState,
        banksSet({
          isFailed: true,
          isFetching: true,
          list: [{stateId: 1, bankName: '1', bankId: 1, lastUpdated: 0}],
        }),
      );

      expect(state.banks.isFailed).toBeTruthy();
      expect(state.banks.isFetching).toBeTruthy();
      expect(state.banks.list).toHaveLength(1);
      expect(state.banks.lastUpdated).not.toEqual(initState.banks.lastUpdated);
    });

    it('Should update banks information', () => {
      const initState = getInitState({
        banks: {
          isFetching: false,
          isFailed: false,
          list: [{stateId: 1, bankName: '1', bankId: 1, lastUpdated: 0}],
          lastUpdated: 0,
        },
      });
      expect(initState.banks.list[0].bankName).toEqual('1');
      const state = optionsReducers(
        initState,
        banksSet(
          {
            isFailed: true,
            isFetching: true,
            list: [{stateId: 1, bankName: '2', bankId: 1, lastUpdated: 0}],
          },
          1,
        ),
      );

      expect(state.banks.list[0].bankName).toEqual('2');
    });
  });
});
