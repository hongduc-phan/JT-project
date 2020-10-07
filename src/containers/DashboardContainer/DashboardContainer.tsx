import React, {FunctionComponent, ReactNode, useEffect} from 'react';
import {connect} from 'react-redux';
import {Dashboard} from '../../layouts';
import {RootState} from '../../store';
import {CompaniesDefaultState} from '../../features/companies/reducers';
import {companiesActions} from '../../features/companies';
import {AppContext} from '../../contexts/AppContext';
import {notificationActions} from '../../features/notifications';
import {SnackbarVariant} from '../../components/Snackbar';

export interface LayoutContainerProps {
  isNoLayout?: boolean;
  children?: ReactNode;
  company: CompaniesDefaultState;
  companyId: string | null;
  onGetCompanyDetail: (id: string) => void;
  onAddSnack: (msg: ReactNode, variant?: SnackbarVariant) => void;
}

const DashboardContainer: FunctionComponent<LayoutContainerProps> = ({
  children,
  company,
  companyId,
  onGetCompanyDetail,
  isNoLayout,
  onAddSnack,
}: LayoutContainerProps) => {
  useEffect(() => {
    if (!company.data && companyId) {
      onGetCompanyDetail(companyId);
    }
  }, [companyId]);

  if (!company.data) {
    // @todo do loading screen
    return <div>Loading</div>;
  }

  if (isNoLayout) {
    return <div>{children}</div>;
  }

  return (
    <AppContext.Provider
      value={{
        snackAdd: onAddSnack,
      }}
    >
      <Dashboard companyName={company.data.companyName}>{children}</Dashboard>
    </AppContext.Provider>
  );
};

const mapStateToProps = ({companies, user}: RootState) => ({
  company: companies.default,
  companyId: user.information ? user.information.companyId : null,
  user,
});

const mapDispatchToProps = {
  onGetCompanyDetail: companiesActions.companyDefaultGetDetail,
  onAddSnack: notificationActions.snackAdd,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardContainer);
