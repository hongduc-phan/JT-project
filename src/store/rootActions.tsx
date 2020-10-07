import * as usersActions from '../features/users/actions';
import {notificationActions} from '../features/notifications';
import {optionsActions} from '../features/options';
import {departmentsActions} from '../features/departments';
import {branchesActions} from '../features/branches';
import {gradingsActions} from '../features/gradings';

export default {
  user: usersActions,
  notifications: notificationActions,
  options: optionsActions,
  departments: departmentsActions,
  branches: branchesActions,
  gradings: gradingsActions,
};
