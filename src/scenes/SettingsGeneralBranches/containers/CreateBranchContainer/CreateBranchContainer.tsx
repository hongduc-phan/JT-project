import React, {Fragment, FunctionComponent, useContext} from 'react';
import {defaultRules, SubmitCallback} from 'react-hoc-form-validatable';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';

import FormCreateBranch from '../../components/FormCreateBranch';
import {RootState} from '../../../../store';
import {branchesActions} from '../../../../features/branches';
import {FetchCreateBranchBody} from '../../../../features/branches/apis';
import {AppContext} from '../../../../contexts/AppContext';
import useRedirectRoute from '../../../../hooks/useRedirectRoute';
import {getLocaleKey} from '../../SettingsGeneralBranches.locale';
import {SnackbarVariant} from '../../../../components/Snackbar';
import config from '../../../../config';
import {SetBranchDefaultData} from '../../../../features/branches/actions';

interface CreateBranchContainerProps {
  companyId: string;
  onCreateBranch: (
    data: FetchCreateBranchBody,
    done?: (success: boolean) => void,
  ) => void;
  onBranchSetDefault: (data: SetBranchDefaultData) => void;
}

const CreateBranchContainer: FunctionComponent<CreateBranchContainerProps> = ({
  onCreateBranch,
  onBranchSetDefault,
  companyId,
}: CreateBranchContainerProps) => {
  const {t} = useTranslation();
  const appContext = useContext(AppContext);
  const [ShouldRedirect, setRedirectPath] = useRedirectRoute();
  const handleSubmit: SubmitCallback = (inputs, done) => {
    if (appContext) {
      const lat = inputs.location.value.split(',')[0].trim();
      const lng = inputs.location.value.split(',')[1].trim();

      onCreateBranch(
        {
          address1: inputs.address1.value,
          address2: inputs.address2.value,
          branchName: inputs.name.value,
          companyId,
          branchLat: parseFloat(lat),
          branchLong: parseFloat(lng),
          branchLogoPath: inputs.image.files,
        },
        (success) => {
          if (success) {
            onBranchSetDefault({
              limit: 5,
              page: 1,
              keyword: '',
            });
            appContext.snackAdd(
              t(getLocaleKey('createBranchSuccess')),
              SnackbarVariant.Success,
            );
            setRedirectPath(config.paths.settingsGeneralBranches);
          } else {
            appContext.snackAdd(
              t(getLocaleKey('createBranchFailed')),
              SnackbarVariant.Error,
            );
          }
          done(success);
        },
      );
    }
  };

  return (
    <Fragment>
      {ShouldRedirect}
      <FormCreateBranch submitCallback={handleSubmit} rules={defaultRules} />
    </Fragment>
  );
};

const mapStateToProps = ({companies, user}: RootState) => ({
  companyId: user.information ? user.information.companyId : '',
});

const mapDispatchToProps = {
  onCreateBranch: branchesActions.createBranch,
  onBranchSetDefault: branchesActions.branchSetDefault,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateBranchContainer);
