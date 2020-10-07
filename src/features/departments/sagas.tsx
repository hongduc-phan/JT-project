import {all, fork, put, takeEvery, call} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {
  departmentsActions,
  departmentsApis,
  departmentsConstants,
} from './index';
import {notificationActions} from '../notifications';

import {SnackbarVariant} from '../../components/Snackbar';
import {FetchCreateDepartmentResponse} from './apis';

export function* handleGetDepartments({
  payload,
  meta,
}: ReturnType<typeof departmentsActions.listDepartments>) {
  try {
    yield put(
      departmentsActions.departmentSetDefault({
        isFailed: false,
        isFetching: true,
      }),
    );

    const data: AxiosResponse<
      departmentsApis.FetchGetDepartmentsResponse
    > = yield call(
      departmentsApis.fetchGetDepartments,
      payload.page,
      payload.limit,
      payload.name,
    );

    yield put(
      departmentsActions.departmentSetDefault({
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
      departmentsActions.departmentSetDefault({
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
}: ReturnType<typeof departmentsActions.createDepartment>) {
  try {
    const data: AxiosResponse<FetchCreateDepartmentResponse> = yield call(
      departmentsApis.fetchCreateDepartment,
      payload,
    );

    yield put(
      departmentsActions.updateBranchEntity(data.data.data.departmentId, {
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
}: ReturnType<typeof departmentsActions.editDepartment>) {
  try {
    yield call(departmentsApis.fetchEditDepartment, payload.id, payload.data);

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
}: ReturnType<typeof departmentsActions.deleteDepartment>) {
  try {
    yield call(departmentsApis.fetchDeleteDepartment, payload.id);

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

function* watchDepartments() {
  yield takeEvery(
    departmentsConstants.DEPARTMENT_LIST_ALL,
    handleGetDepartments,
  );

  yield takeEvery(
    departmentsConstants.DEPARTMENT_CREATE,
    handleCreateDepartment,
  );

  yield takeEvery(departmentsConstants.DEPARTMENT_EDIT, handleEditDepartment);

  yield takeEvery(
    departmentsConstants.DEPARTMENT_DELETE,
    handleDeleteDepartment,
  );
}

export function* departmentsSagas() {
  yield all([fork(watchDepartments)]);
}
