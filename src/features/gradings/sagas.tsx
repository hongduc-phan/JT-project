import {all, fork, put, takeEvery, call} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {gradingsActions, gradingsApis, gradingsConstants} from './index';
import {notificationActions} from '../notifications';

import {SnackbarVariant} from '../../components/Snackbar';
import {FetchCreateGradingResponse} from './apis';

export function* handleGetGradings({
  payload,
  meta,
}: ReturnType<typeof gradingsActions.listGradings>) {
  try {
    yield put(
      gradingsActions.gradingSetDefault({
        isFailed: false,
        isFetching: true,
      }),
    );

    const data: AxiosResponse<
      gradingsApis.FetchGetGradingsResponse
    > = yield call(
      gradingsApis.fetchGetGradings,
      payload.page,
      payload.limit,
      payload.name,
    );

    yield put(
      gradingsActions.gradingSetDefault({
        data: data.data.data,
        total: data.data.meta.total,
        isFetching: false,
        isFailed: false,
      }),
    );
    if (meta.done) {
      meta.done(true);
    }
  } catch (e) {
    yield put(
      gradingsActions.gradingSetDefault({
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

export function* handleCreateDepartment({
  payload,
  meta,
}: ReturnType<typeof gradingsActions.createGrading>) {
  try {
    const data: AxiosResponse<FetchCreateGradingResponse> = yield call(
      gradingsApis.fetchCreategrading,
      payload,
    );

    yield put(
      gradingsActions.updateGradingEntity(data.data.data.gradingId, {
        data: data.data.data,
      }),
    );

    if (meta.done) {
      meta.done(true);
    }
  } catch (e) {
    yield put(notificationActions.snackAdd(e.message, SnackbarVariant.Error));
    if (meta.done) {
      meta.done(false);
    }
  }
}

export function* handleEditDepartment({
  payload,
  meta,
}: ReturnType<typeof gradingsActions.editGrading>) {
  try {
    yield call(gradingsApis.fetchEditGrading, payload.id, payload.data);

    if (meta.done) {
      meta.done(true);
    }
  } catch (e) {
    yield put(notificationActions.snackAdd(e.message, SnackbarVariant.Error));
    if (meta.done) {
      meta.done(false);
    }
  }
}

export function* handleDeleteDepartment({
  payload,
  meta,
}: ReturnType<typeof gradingsActions.deleteGrading>) {
  try {
    yield call(gradingsApis.fetchDeleteGrading, payload.id);

    yield put(gradingsActions.updateGradingEntity(payload.id));

    if (meta.done) {
      meta.done(true);
    }
  } catch (e) {
    yield put(notificationActions.snackAdd(e.message, SnackbarVariant.Error));
    if (meta.done) {
      meta.done(false);
    }
  }
}

function* watchGradings() {
  yield takeEvery(gradingsConstants.GRADING_LIST_ALL, handleGetGradings);
  yield takeEvery(gradingsConstants.GRADING_CREATE, handleCreateDepartment);
  yield takeEvery(gradingsConstants.GRADING_EDIT, handleEditDepartment);
  yield takeEvery(gradingsConstants.GRADING_DELETE, handleDeleteDepartment);
}

export function* gradingsSagas() {
  yield all([fork(watchGradings)]);
}
