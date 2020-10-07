import React from 'react';
import loadable from '@loadable/component';
import {Route, RouteComponentProps} from 'react-router';

import config from '../../config';
import Loading from '../../components/Loading';
import styles from './SettingsGeneralBranches.module.css';

const ListingBranchesContainer = loadable(
  () => import('./containers/ListingBranchesContainer'),
  {
    fallback: <Loading />,
  },
);

const CreateBranchContainer = loadable(
  () => import('./containers/CreateBranchContainer'),
  {
    fallback: <Loading />,
  },
);

const EditBranchContainer = loadable(
  () => import('./containers/EditBranchContainer'),
  {
    fallback: <Loading />,
  },
);

const SettingsGeneralBranches = () => {
  const handlerRender = (paths: string) => {
    switch (paths) {
      case config.paths.settingsGeneralBranches: {
        return function handlerRenderListingScene() {
          return <ListingBranchesContainer />;
        };
      }
      case config.paths.settingsGeneralBranchesCreate: {
        return function handlerRenderFormCreateBranch() {
          return <CreateBranchContainer />;
        };
      }

      case config.paths.settingsGeneralBranchesEdit(): {
        return function handlerRenderFormCreateBranch(
          props: RouteComponentProps<{id: string}>,
        ) {
          return <EditBranchContainer branchId={props.match.params.id} />;
        };
      }
    }

    return;
  };

  return (
    <div className={styles.wrapper}>
      <Route
        exact={true}
        path={config.paths.settingsGeneralBranches}
        render={handlerRender(config.paths.settingsGeneralBranches)}
      />

      <Route
        path={config.paths.settingsGeneralBranchesCreate}
        render={handlerRender(config.paths.settingsGeneralBranchesCreate)}
      />

      <Route
        path={config.paths.settingsGeneralBranchesEdit()}
        render={handlerRender(config.paths.settingsGeneralBranchesEdit())}
      />
    </div>
  );
};

export default SettingsGeneralBranches;
