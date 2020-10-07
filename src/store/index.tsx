import {createStore, applyMiddleware} from 'redux';
import {StateType, ActionType} from 'typesafe-actions';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

import {composeEnhancers} from './utils';
import rootReducers from './rootReducers';
import rootSaga from './rootSagas';
import config from '../config';

export const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

let user = null;

try {
  const serializedState = localStorage.getItem(config.localStoreKeys.user);
  if (serializedState !== null) {
    user = JSON.parse(serializedState);

    if (!user.accessToken) {
      throw new Error('No user data');
    }
    axios.defaults.headers.common.Authorization = user.accessToken;
  }
} catch (error) {
  /* tslint:disable */
  console.error('User deserialization failed');
  /* tslint:enable */
  localStorage.removeItem(config.localStoreKeys.user);
}

// create store
const store = createStore(
  rootReducers,
  {
    user: {
      information: user,
      isLogged: Boolean(user),
    },
  },
  enhancer,
);

sagaMiddleware.run(rootSaga);

// export store singleton instance
export default store;

export type Store = StateType<typeof import('./index').default>;
export type RootAction = ActionType<typeof import('./rootActions').default>;
export type RootState = StateType<typeof import('./rootReducers').default>;
