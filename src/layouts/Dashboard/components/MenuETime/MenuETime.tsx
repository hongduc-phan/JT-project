import React, {FunctionComponent} from 'react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTitle,
} from '../../../../components/Sidebar';
import config from '../../../../config';
import {SidebarMenuVariant} from '../../../../components/Sidebar/types';

interface IMenuSettingsProps {
  pathname: string;
}

const MenuETime: FunctionComponent<IMenuSettingsProps> = ({
  pathname,
}: IMenuSettingsProps) => {
  return (
    <div>
      <SidebarTitle>eTime</SidebarTitle>
      <SidebarMenu>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsETimeTimesheets)}
          sub={
            <SidebarMenu variant={SidebarMenuVariant.Sub}>
              <SidebarMenuItem>My Timesheet</SidebarMenuItem>
            </SidebarMenu>
          }
        >
          Timesheets
        </SidebarMenuItem>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsETimeShifts)}
          sub={
            <SidebarMenu variant={SidebarMenuVariant.Sub}>
              <SidebarMenuItem>My Shifts</SidebarMenuItem>
              <SidebarMenuItem>Manage Shifts</SidebarMenuItem>
            </SidebarMenu>
          }
        >
          Shifts
        </SidebarMenuItem>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsETimeReports)}
        >
          Reports
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};

export default MenuETime;
