import {all, fork, put, select, takeEvery, call} from 'redux-saga/effects';
import axios, {AxiosError, AxiosResponse} from 'axios';

import * as userActions from './actions';
import * as userApis from './apis';
import {notificationActions} from '../notifications';
import {UserInformation, usersConstants} from './';
import {RootState} from '../../store';
import config from '../../config';
import {SnackbarVariant} from '../../components/Snackbar';
import i18n from '../../i18n';
import {getErrorsLocaleKey} from '../../locales/errors.locale';

export function* handlerLogin({
  payload,
  meta,
}: ReturnType<typeof userActions.login>) {
  try {
    const data: AxiosResponse<{data: UserInformation}> = yield call(
      userApis.fetchSigin,
      payload.username,
      payload.password,
      payload.company,
    );
    yield put(userActions.set(data.data.data));
    axios.defaults.headers.common.Authorization = data.data.data.accessToken;
    const info = yield select((state: RootState) => {
      return state.user.information;
    });
    const serializedState = JSON.stringify(info);
    localStorage.setItem(config.localStoreKeys.user, serializedState);
    meta.done(true);
  } catch (e) {
    meta.done(false);
    if (e.response && e.request) {
      const apiErr = e as AxiosError;
      if (apiErr.response && apiErr.response.status < 500) {
        yield put(
          notificationActions.snackAdd(
            i18n.t(getErrorsLocaleKey('invalidUser')),
            SnackbarVariant.Error,
          ),
        );

        return;
      }
    }
    yield put(notificationActions.snackAdd(e.message, SnackbarVariant.Error));
  }
}

export function handlerLogout() {
  axios.defaults.headers.common.Authorization = undefined;
  localStorage.removeItem(config.localStoreKeys.user);
}

function* watchUserActions() {
  yield takeEvery(usersConstants.LOGIN, handlerLogin);
  yield takeEvery(usersConstants.LOGOUT, handlerLogout);
}

export function* usersSagas() {
  yield all([fork(watchUserActions)]);
}
