import React from 'react';
import {RouteProps, Route, Redirect, RouteComponentProps} from 'react-router';
import config from '../../config';

export interface ProtectedRouteProps extends RouteProps {
  isLogged?: boolean;
}

const ProtectedRoute = ({
  isLogged,
  component,
  render,
  ...rest
}: ProtectedRouteProps) => {
  function handlerRender(props: RouteComponentProps) {
    if (!isLogged) {
      return (
        <Redirect
          to={{
            pathname: config.paths.signIn,
            state: {from: props.location},
          }}
        />
      );
    }

    if (component) {
      return React.createElement(
        component as React.ComponentType<RouteComponentProps>,
        props,
      );
    }

    if (render) {
      return render(props);
    }
  }
  return <Route {...rest} render={handlerRender} />;
};

export default ProtectedRoute;
