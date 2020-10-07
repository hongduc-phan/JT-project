import React, {Fragment, FunctionComponent, useContext, useEffect} from 'react';
import {defaultRules, SubmitCallback} from 'react-hoc-form-validatable';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import FormEditBranch from '../../components/FormEditBranch';
import {RootState} from '../../../../store';
import {branchesActions} from '../../../../features/branches';
import {FetchCreateBranchBody} from '../../../../features/branches/apis';
import {AppContext} from '../../../../contexts/AppContext';
import useRedirectRoute from '../../../../hooks/useRedirectRoute';
import {getLocaleKey} from '../../SettingsGeneralBranches.locale';
import {SnackbarVariant} from '../../../../components/Snackbar';
import config from '../../../../config';
import {BranchEntity} from '../../../../features/branches/reducers';

interface EditBranchContainerOwnProps {
  branchId: string | null;
}

interface EditBranchContainerProps extends EditBranchContainerOwnProps {
  branch: null | BranchEntity;
  companyId: string;
  onEditBranch: (
    id: number,
    data: FetchCreateBranchBody,
    done?: (success: boolean, notFound?: boolean) => void,
  ) => void;
  onGetDetailBranch: (
    id: number,
    done?: (success: boolean, notFound?: boolean) => void,
  ) => void;
}

const EditBranchContainer: FunctionComponent<EditBranchContainerProps> = ({
  onEditBranch,
  companyId,
  branchId,
  onGetDetailBranch,
  branch,
}: EditBranchContainerProps) => {
  const {t} = useTranslation();
  const appContext = useContext(AppContext);
  const [ShouldRedirect, setRedirectPath] = useRedirectRoute();

  const handleSubmit: SubmitCallback = (inputs, done) => {
    if (appContext && branchId) {
      const lat = inputs.location.value.split(',')[0].trim();
      const lng = inputs.location.value.split(',')[1].trim();

      onEditBranch(
        parseInt(branchId, 10),
        {
          address1: inputs.address1.value,
          address2: inputs.address2.value,
          branchName: inputs.name.value,
          companyId,
          branchLat: parseFloat(lat),
          branchLong: parseFloat(lng),
        },
        (success) => {
          if (success) {
            appContext.snackAdd(
              t(getLocaleKey('editBranchSuccess')),
              SnackbarVariant.Success,
            );
            setRedirectPath(config.paths.settingsGeneralBranches);
          } else {
            appContext.snackAdd(
              t(getLocaleKey('editBranchFailed')),
              SnackbarVariant.Error,
            );
          }
          done(success);
        },
      );
    }
  };

  useEffect(() => {
    if (branchId && parseInt(branchId, 10) && appContext) {
      onGetDetailBranch(parseInt(branchId, 10), (success, notFound) => {
        if (!success && notFound) {
          appContext.snackAdd(
            t(getLocaleKey('notFoundBranch')),
            SnackbarVariant.Error,
          );
          setRedirectPath(config.paths.settingsGeneralBranches);
        }
      });
    } else {
      setRedirectPath(config.paths.settingsGeneralBranches);
    }
  }, [branchId]);

  return (
    <Fragment>
      {ShouldRedirect}
      {branch && (
        <FormEditBranch
          data={branch.data}
          isFetching={branch.isFetching}
          submitCallback={handleSubmit}
          rules={defaultRules}
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = (
  {companies, user, branches}: RootState,
  {branchId}: EditBranchContainerOwnProps,
) => {
  const parseBranchId = branchId ? parseInt(branchId, 10) : null;
  let branch = null;

  if (parseBranchId && branches.entities[parseBranchId]) {
    branch = branches.entities[parseBranchId];
  }

  return {
    companyId: user.information ? user.information.companyId : '',
    branch,
  };
};

const mapDispatchToProps = {
  onEditBranch: branchesActions.editBranch,
  onGetDetailBranch: branchesActions.detailBranch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditBranchContainer);
