import {
  notificationActions as actions,
  notificationReducers as reducers,
  NotificationsState,
} from './';
import {SnackbarVariant} from '../../components/Snackbar';

const getInitialState = (initial?: Partial<NotificationsState>) =>
  reducers(initial as NotificationsState, {} as any);

describe('Notifications Reducers', () => {
  describe('Initial state', () => {
    it('Should match snapshot', () => {
      expect(getInitialState()).toMatchSnapshot();
    });
  });

  describe('Snacks', () => {
    it('Can add new snack', () => {
      const initialState = getInitialState();
      expect(initialState.snacks).toHaveLength(0);
      let state = reducers(initialState, actions.snackAdd('message'));
      expect(state.snacks).toHaveLength(1);
      state = reducers(
        state,
        actions.snackAdd('message', SnackbarVariant.Error),
      );
      expect(state.snacks).toHaveLength(2);
      expect(state.snacks[1].variant).toEqual(SnackbarVariant.Error);
    });

    it('Can remove snack', () => {
      const initialState = getInitialState();
      expect(initialState.snacks).toHaveLength(0);
      let state = reducers(initialState, actions.snackAdd('message'));
      state = reducers(
        state,
        actions.snackAdd('message', SnackbarVariant.Error),
      );
      state = reducers(state, actions.snackRemove(state.snacks[0].id));
      expect(state.snacks).toHaveLength(1);
      expect(state.snacks[0].variant).toEqual(SnackbarVariant.Error);
    });
  });
});
