import {combineReducers} from 'redux';
import {ReactNode} from 'react';
import {ActionType} from 'typesafe-actions';
import {DeepReadonly} from 'utility-types';
import update from 'immutability-helper';

import * as notificationsActions from './actions';
import {SnackbarVariant} from '../../components/Snackbar';
import {SNACK_ADD, SNACK_REMOVE} from './constants';

export type NotificationsActions = ActionType<typeof notificationsActions>;

export interface Snack {
  id: number;
  msg: string | ReactNode;
  variant?: SnackbarVariant;
}

export type NotificationsState = DeepReadonly<{
  snacks: Snack[];
}>;

export const InitialNotificationsState = {};

export default combineReducers<NotificationsState, NotificationsActions>({
  snacks: (state = [], action) => {
    switch (action.type) {
      case SNACK_ADD: {
        return update(state, {
          $push: [
            {
              id: new Date().getTime(),
              msg: action.payload.msg,
              variant: action.payload.variant,
            },
          ],
        });
      }

      case SNACK_REMOVE: {
        const item = state.findIndex((s) => {
          return s.id === action.payload;
        });

        if (item >= 0) {
          return update(state, {
            $splice: [[item, 1]],
          });
        }
      }
    }
    return state;
  },
});
