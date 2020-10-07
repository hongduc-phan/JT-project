import {connect} from 'react-redux';
import {RootState} from '../../../../store';
import {usersActions} from '../../../../features/users';

import SignInScene from '../../components/SignInScene';

const mapStateToProps = ({user}: RootState) => ({
  isLogged: user.isLogged,
});

export default connect(
  mapStateToProps,
  {
    onLogin: usersActions.login,
  },
)(SignInScene);
