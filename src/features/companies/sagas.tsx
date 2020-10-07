import {all, fork, put, takeEvery, call, select} from 'redux-saga/effects';
import update from 'immutability-helper';
import {companiesActions, companiesApis, companiesConstants} from './index';
import {notificationActions} from '../notifications';
import {SnackbarVariant} from '../../components/Snackbar';
import {AxiosResponse} from 'axios';
import i18n from '../../i18n';
import {getErrorsLocaleKey} from '../../locales/errors.locale';
import {RootState} from '../../store';
import {Company} from './models';
import {FetchGetCompanyDetailResponse} from './apis';

export function getDefaultCompanySelector(state: RootState): Company | null {
  return state.companies.default.data;
}

export function* handlerGetCompanyDefaultDetail({
  payload,
  meta,
}: ReturnType<typeof companiesActions.companyDefaultGetDetail>) {
  try {
    yield put(
      companiesActions.companySetDefault({
        isFailed: false,
        isFetching: true,
      }),
    );

    const data: AxiosResponse<
      companiesApis.FetchGetCompanyDetailResponse
    > = yield call(companiesApis.fetchGetCompanyDetail, payload);

    yield put(
      companiesActions.companySetDefault({
        data: data.data.data,
        isFetching: false,
        isFailed: false,
      }),
    );
    if (meta.done) {
      meta.done(true);
    }
  } catch (e) {
    yield put(
      companiesActions.companySetDefault({
        isFailed: true,
        isFetching: false,
      }),
    );
    yield put(notificationActions.snackAdd(e.message, SnackbarVariant.Error));
    if (meta.done) {
      meta.done(false);
    }
  }
}

export function* handlerAddBank({
  payload,
  meta,
}: ReturnType<typeof companiesActions.companyAddBank>) {
  try {
    yield call(
      companiesApis.fetchCompanyCreateBank,
      payload.companyId,
      payload.info,
    );

    // @todo wait api add stateId when return so we can update local state rather than manually call get detail again

    yield put(companiesActions.companyDefaultGetDetail(payload.companyId));

    if (meta.done) {
      meta.done(true);
    }
  } catch (e) {
    if (e.response && e.request) {
      yield put(
        notificationActions.snackAdd(
          i18n.t(getErrorsLocaleKey('apiError')),
          SnackbarVariant.Error,
        ),
      );
    }
    if (meta.done) {
      meta.done(false);
    }
  }
}

export function* handlerDeleteBank({
  payload,
  meta,
}: ReturnType<typeof companiesActions.companyDeleteBank>) {
  try {
    const currentState: Company = yield select(getDefaultCompanySelector);

    if (currentState.bankDetails.length > 0) {
      const findBankIndex = currentState.bankDetails.findIndex((b) => {
        return b.bankAccountId === payload.bankAccountId;
      });

      if (findBankIndex >= 0) {
        yield call(
          companiesApis.fetchCompanyDeleteBank,
          payload.companyId,
          payload.bankAccountId,
        );

        yield put(
          companiesActions.companySetDefault({
            data: update(currentState, {
              bankDetails: {
                $splice: [[findBankIndex, 1]],
              },
            }),
          }),
        );
      }

      if (meta.done) {
        meta.done(true);
      }

      return;
    }
    throw new Error('Not found bank account');
  } catch (e) {
    if (e.response && e.request) {
      yield put(
        notificationActions.snackAdd(
          i18n.t(getErrorsLocaleKey('apiError')),
          SnackbarVariant.Error,
        ),
      );
    }
    if (meta.done) {
      meta.done(false);
    }
  }
}

export function* handleEditCompany({
  payload,
  meta,
}: ReturnType<typeof companiesActions.editCompany>) {
  try {
    const data: AxiosResponse<FetchGetCompanyDetailResponse> = yield call(
      companiesApis.fetchEditCompany,
      payload.companyId,
      payload.data,
    );

    yield put(
      companiesActions.companySetDefault({
        data: data.data.data,
      }),
    );

    if (meta.done) {
      meta.done(true);
    }
  } catch (e) {
    if (e.response && e.request) {
      yield put(
        notificationActions.snackAdd(
          i18n.t(getErrorsLocaleKey('apiError')),
          SnackbarVariant.Error,
        ),
      );
    }
    if (meta.done) {
      meta.done(false);
    }
  }
}

function* watchCompanies() {
  yield takeEvery(
    companiesConstants.COMPANY_GET_DETAIL_DEFAULT,
    handlerGetCompanyDefaultDetail,
  );
  yield takeEvery(companiesConstants.COMPANY_ADD_BANK, handlerAddBank);
  yield takeEvery(companiesConstants.COMPANY_DELETE_BANK, handlerDeleteBank);
  yield takeEvery(companiesConstants.COMPANY_EDIT, handleEditCompany);
}

export function* companiesSagas() {
  yield all([fork(watchCompanies)]);
}
