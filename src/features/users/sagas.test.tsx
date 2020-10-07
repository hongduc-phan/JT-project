import {testSaga} from 'redux-saga-test-plan';
import {spy} from 'sinon';
import {handlerLogin} from './sagas';
import * as usersApis from './apis';
import {LOGIN, SET} from './constants';
import {UserInformation} from './models';
import * as userActions from './actions';
import axios from 'axios';
import {notificationActions} from '../notifications';
import {SNACK_ADD} from '../notifications/constants';
import {SnackbarVariant} from '../../components/Snackbar';
import i18n from '../../i18n';
import {getErrorsLocaleKey} from '../../locales/errors.locale';
import {FetchSiginResponse} from './apis';

describe('User sagas', () => {
  describe('Handler login', () => {
    it('Should work when login success', () => {
      const doneSpy = spy();
      const dataUser: UserInformation = {
        accessToken: '1',
        expiresIn: '2',
        tokenType: '3',
        refreshToken: '4',
        companyId: '5',
      };

      testSaga(handlerLogin, {
        type: LOGIN,
        payload: {
          company: '1',
          password: '1',
          username: '1',
        },
        meta: {
          done: doneSpy,
        },
      })
        .next()
        .call(usersApis.fetchSigin, '1', '1', '1')
        .next({
          data: {
            data: dataUser,
          } as FetchSiginResponse,
        })
        .put({
          type: SET,
          payload: dataUser,
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof userActions.set>)
        .next()
        .next();
      expect(doneSpy.calledWith(true)).toBeTruthy();
      expect(axios.defaults.headers.common.Authorization).toEqual('1');
    });

    it('Should work when login failed', () => {
      const doneSpy = spy();

      const apiErr = Object.create(Error);

      apiErr.response = {
        status: 404,
      };

      apiErr.request = 1;

      testSaga(handlerLogin, {
        type: LOGIN,
        payload: {
          company: '1',
          password: '1',
          username: '1',
        },
        meta: {
          done: doneSpy,
        },
      })
        .next()
        .call(usersApis.fetchSigin, '1', '1', '1')
        .throw(apiErr)
        .put({
          type: SNACK_ADD,
          payload: {
            msg: i18n.t(getErrorsLocaleKey('invalidUser')),
            variant: SnackbarVariant.Error,
          },
          meta: undefined,
          error: undefined,
        } as ReturnType<typeof notificationActions.snackAdd>)
        .next();
      expect(doneSpy.calledWith(false)).toBeTruthy();
    });
  });
});
