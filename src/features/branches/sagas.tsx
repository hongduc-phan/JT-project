import {all, fork, put, takeEvery, call} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {branchesActions, branchesApis, branchesConstants} from './index';
import {notificationActions} from '../notifications';

import {SnackbarVariant} from '../../components/Snackbar';
import {FetchCreateBranchResponse, FetchDetailBranchResponse} from './apis';

export function* handleGetBranches({
  payload,
  meta,
}: ReturnType<typeof branchesActions.listBranches>) {
  try {
    yield put(
      branchesActions.branchSetDefault({
        isFailed: false,
        isFetching: true,
      }),
    );

    const data: AxiosResponse<
      branchesApis.FetchGetBranchesResponse
    > = yield call(
      branchesApis.fetchGetBranches,
      payload.page,
      payload.limit,
      payload.name,
    );

    yield put(
      branchesActions.branchSetDefault({
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
      branchesActions.branchSetDefault({
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

export function* handleCreateBranch({
  payload,
  meta,
}: ReturnType<typeof branchesActions.createBranch>) {
  try {
    const data: AxiosResponse<FetchCreateBranchResponse> = yield call(
      branchesApis.fetchCreateBranch,
      payload,
    );

    yield put(
      branchesActions.updateBranchEntity(data.data.data.branchId, {
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

export function* handleDeleteBranch({
  payload,
  meta,
}: ReturnType<typeof branchesActions.deleteBranch>) {
  try {
    yield call(branchesApis.fetchDeleteBranch, payload);

    yield put(branchesActions.updateBranchEntity(payload));

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

export function* handleDetailBranch({
  payload,
  meta,
}: ReturnType<typeof branchesActions.detailBranch>) {
  try {
    yield put(
      branchesActions.updateBranchEntity(payload, {
        isFetching: true,
        isFailed: false,
      }),
    );

    const data: AxiosResponse<FetchDetailBranchResponse> = yield call(
      branchesApis.fetchDetailBranch,
      payload,
    );

    yield put(
      branchesActions.updateBranchEntity(payload, {
        data: data.data.data,
        isFetching: false,
        isFailed: false,
      }),
    );

    if (meta.done) {
      meta.done(true);
    }
  } catch (e) {
    if (e.response && e.request && e.response.status === 404 && meta.done) {
      meta.done(false, true);
    } else {
      yield put(
        branchesActions.updateBranchEntity(payload, {
          isFetching: false,
          isFailed: true,
        }),
      );

      yield put(notificationActions.snackAdd(e.message, SnackbarVariant.Error));

      if (meta.done) {
        meta.done(false);
      }
    }
  }
}

export function* handleEditBranch({
  payload,
  meta,
}: ReturnType<typeof branchesActions.editBranch>) {
  try {
    yield call(branchesApis.fetchEditBranch, payload.id, payload.data);

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

function* watchBranches() {
  yield takeEvery(branchesConstants.BRANCH_LIST_ALL, handleGetBranches);
  yield takeEvery(branchesConstants.BRANCH_CREATE, handleCreateBranch);
  yield takeEvery(branchesConstants.BRANCH_DELETE, handleDeleteBranch);
  yield takeEvery(branchesConstants.BRANCH_GET_DETAIL, handleDetailBranch);
  yield takeEvery(branchesConstants.BRANCH_EDIT, handleEditBranch);
}

export function* branchesSagas() {
  yield all([fork(watchBranches)]);
}
