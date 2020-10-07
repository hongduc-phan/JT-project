import {combineReducers} from 'redux';
import {ActionType} from 'typesafe-actions';

import * as usersActions from './actions';
import {SET, LOGOUT} from './constants';
import {UserInformation} from './models';

export type UsersAction = ActionType<typeof usersActions>;

export interface UsersState {
  information: UserInformation | null;
  isLogged: boolean;
}

export default combineReducers<UsersState, UsersAction>({
  information: (state = null, action) => {
    switch (action.type) {
      case SET: {
        return action.payload;
      }
      case LOGOUT: {
        return null;
      }
      default:
        return state;
    }
  },
  isLogged: (state = false, action) => {
    switch (action.type) {
      case SET: {
        return true;
      }
      case LOGOUT: {
        return false;
      }
      default:
        return state;
    }
  },
});
