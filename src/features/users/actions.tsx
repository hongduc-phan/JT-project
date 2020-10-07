import {action} from 'typesafe-actions';
import {LOGIN, LOGOUT, SET} from './constants';
import {UserInformation} from './models';

export const login = (
  company: string,
  username: string,
  password: string,
  done: (reset?: boolean) => void,
) =>
  action(
    LOGIN,
    {company, username, password},
    {
      done,
    },
  );

export const logout = () => action(LOGOUT);

export const set = (data: UserInformation) => action(SET, data);
