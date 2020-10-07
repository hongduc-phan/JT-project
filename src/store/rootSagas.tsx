import {all, fork} from 'redux-saga/effects';

import {usersSagas} from '../features/users';
import {optionsSagas} from '../features/options';
import {companiesSagas} from '../features/companies';
import {departmentsSagas} from '../features/departments';
import {branchesSagas} from '../features/branches';
import {gradingsSagas} from '../features/gradings';

export default function* rootSaga() {
  yield all([
    fork(usersSagas),
    fork(companiesSagas),
    fork(optionsSagas),
    fork(departmentsSagas),
    fork(branchesSagas),
    fork(gradingsSagas),
  ]);
}
