import {ReactElement, useState} from 'react';
import {Redirect, RedirectProps} from 'react-router';
import React from 'react';

export interface UseRedirectRouteConfig {
  redirectProps?: Pick<RedirectProps, Exclude<keyof RedirectProps, 'to'>>;
}

function useRedirectRoute(
  config?: UseRedirectRouteConfig,
): [
  ReactElement | undefined,
  (path: string) => void,
  (path: string) => () => void
] {
  const [redirect, setRedirect] = useState<string>('');

  function setRedirectPath(path: string) {
    setRedirect(path);
  }

  function setRedirectPathHandler(path: string) {
    return () => {
      setRedirect(path);
    };
  }

  return [
    redirect ? (
      <Redirect {...config && config.redirectProps} to={redirect} />
    ) : (
      undefined
    ),
    setRedirectPath,
    setRedirectPathHandler,
  ];
}

export default useRedirectRoute;
