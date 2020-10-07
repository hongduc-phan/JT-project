import {action} from 'typesafe-actions';
import {ReactNode} from 'react';
import {SNACK_ADD, SNACK_REMOVE} from './constants';
import {SnackbarVariant} from '../../components/Snackbar';

export const snackAdd = (msg: ReactNode, variant?: SnackbarVariant) =>
  action(SNACK_ADD, {msg, variant});

export const snackRemove = (key: number) => action(SNACK_REMOVE, key);
