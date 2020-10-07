import React, {createElement} from 'react';
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, RouteComponentProps} from 'react-router-dom';
import loadable, {LoadableComponent} from '@loadable/component';
import {connect} from 'react-redux';

import config from './config';
import {RootState} from './store';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardContainer from './containers/DashboardContainer';

const history = createBrowserHistory();

const SignInPage = loadable(() => import('./scenes/SignIn'));

const ModuleSelectionPage = loadable(() => import('./scenes/ModuleSelection'));

const SettingsGeneralCompnanyPage = loadable(() =>
  import('./scenes/SettingsGeneralCompany'),
);

const SettingsGeneralDepartmentsPage = loadable(() =>
  import('./scenes/SettingsGeneralDepartments'),
);

const SettingsGeneralBranchesPage = loadable(() =>
  import('./scenes/SettingsGeneralBranches'),
);

const SettingsGeneralGradingPage = loadable(() =>
  import('./scenes/SettingsGeneralGradings'),
);

export interface AppRouteProps {
  isLogged?: boolean;
  isNoLayout?: boolean;
  exact?: boolean;
  path: string;
  component: LoadableComponent<{}>;
}

const AppRoute = ({
  exact,
  path,
  component,
  isLogged,
  isNoLayout,
}: AppRouteProps) => {
  function renderRoute(props: RouteComponentProps<any>) {
    return (
      <DashboardContainer isNoLayout={isNoLayout} {...props}>
        {createElement(component, null)}
      </DashboardContainer>
    );
  }

  return (
    <ProtectedRoute
      isLogged={isLogged}
      exact={exact}
      path={path}
      render={renderRoute}
    />
  );
};

interface AppProps {
  isLogged: boolean;
}

const App = ({isLogged}: AppProps) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact={true} path={'/'} component={SignInPage} />
        <Route exact={true} path={config.paths.signIn} component={SignInPage} />
        <AppRoute
          isNoLayout={true}
          isLogged={isLogged}
          exact={true}
          path={config.paths.moduleSelection}
          component={ModuleSelectionPage}
        />
        <AppRoute
          isLogged={isLogged}
          path={config.paths.settingsGeneralCompany}
          component={SettingsGeneralCompnanyPage}
        />
        <AppRoute
          isLogged={isLogged}
          path={config.paths.settingsGeneralDepartments}
          component={SettingsGeneralDepartmentsPage}
        />
        <AppRoute
          isLogged={isLogged}
          path={config.paths.settingsGeneralBranches}
          component={SettingsGeneralBranchesPage}
        />
        <AppRoute
          isLogged={isLogged}
          path={config.paths.settingsGeneralGradings}
          component={SettingsGeneralGradingPage}
        />
      </Switch>
    </Router>
  );
};

const mapStateToProps = ({user}: RootState) => ({
  isLogged: user.isLogged,
});

export default connect(
  mapStateToProps,
  null,
)(App);
