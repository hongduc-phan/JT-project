import {combineReducers} from 'redux';
import {usersReducers} from '../features/users';
import {notificationReducers} from '../features/notifications';
import {optionsReducers} from '../features/options';
import {companiesReducers} from '../features/companies';
import {departmentsReducers} from '../features/departments';
import {branchesReducers} from '../features/branches';
import {gradingsReducers} from '../features/gradings';

const rootReducers = combineReducers({
  user: usersReducers,
  notifications: notificationReducers,
  options: optionsReducers,
  companies: companiesReducers,
  departments: departmentsReducers,
  branches: branchesReducers,
  gradings: gradingsReducers,
});

export default rootReducers;
