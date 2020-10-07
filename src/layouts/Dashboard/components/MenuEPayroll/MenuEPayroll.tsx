import React, {FunctionComponent} from 'react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTitle,
} from '../../../../components/Sidebar';
import config from '../../../../config';

interface IMenuSettingsProps {
  pathname: string;
}

const MenuEPayroll: FunctionComponent<IMenuSettingsProps> = ({
  pathname,
}: IMenuSettingsProps) => {
  return (
    <div>
      <SidebarTitle>ePayroll</SidebarTitle>
      <SidebarMenu>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsEPayrollMyPayroll)}
        >
          My Payroll
        </SidebarMenuItem>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsEPayrollManagePayroll)}
        >
          Manage Payroll
        </SidebarMenuItem>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsEPayrollReports)}
        >
          Reports
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};

export default MenuEPayroll;
