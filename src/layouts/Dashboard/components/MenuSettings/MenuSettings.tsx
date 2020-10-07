import React, {FunctionComponent} from 'react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTitle,
} from '../../../../components/Sidebar';
import config from '../../../../config';
import {SidebarMenuVariant} from '../../../../components/Sidebar/types';
import {Link} from 'react-router-dom';
import styles from '../../Dashboard.module.css';

interface IMenuSettingsProps {
  pathname: string;
}

const MenuSettings: FunctionComponent<IMenuSettingsProps> = ({
  pathname,
}: IMenuSettingsProps) => {
  return (
    <div>
      <SidebarTitle>Settings</SidebarTitle>
      <SidebarMenu>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsGeneral)}
          sub={
            <SidebarMenu variant={SidebarMenuVariant.Sub}>
              <SidebarMenuItem
                active={pathname.includes(config.paths.settingsGeneralCompany)}
              >
                <Link
                  className={styles.link}
                  to={config.paths.settingsGeneralCompany}
                >
                  Company
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem
                active={pathname.includes(
                  config.paths.settingsGeneralDepartments,
                )}
              >
                <Link
                  className={styles.link}
                  to={config.paths.settingsGeneralDepartments}
                >
                  Departments
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem
                active={pathname.includes(config.paths.settingsGeneralGradings)}
              >
                <Link
                  className={styles.link}
                  to={config.paths.settingsGeneralGradings}
                >
                  Gradings
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem
                active={pathname.includes(config.paths.settingsGeneralBranches)}
              >
                <Link
                  className={styles.link}
                  to={config.paths.settingsGeneralBranches}
                >
                  Branches
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>WorkFlows</SidebarMenuItem>
              <SidebarMenuItem>Festives Categories</SidebarMenuItem>
              <SidebarMenuItem>Festives</SidebarMenuItem>
              <SidebarMenuItem>Cost Center</SidebarMenuItem>
            </SidebarMenu>
          }
        >
          General
        </SidebarMenuItem>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsETime)}
          sub={
            <SidebarMenu variant={SidebarMenuVariant.Sub}>
              <SidebarMenuItem>eTime Settings</SidebarMenuItem>
              <SidebarMenuItem>Departments</SidebarMenuItem>
              <SidebarMenuItem>Gradings</SidebarMenuItem>
              <SidebarMenuItem>Overtime</SidebarMenuItem>
              <SidebarMenuItem>Punctuality</SidebarMenuItem>
            </SidebarMenu>
          }
        >
          eTime
        </SidebarMenuItem>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsEPayroll)}
          sub={
            <SidebarMenu variant={SidebarMenuVariant.Sub}>
              <SidebarMenuItem>ePayroll Settings</SidebarMenuItem>
              <SidebarMenuItem>Salary Items</SidebarMenuItem>
              <SidebarMenuItem>Recurring Items</SidebarMenuItem>
              <SidebarMenuItem>Payroll Schedules</SidebarMenuItem>
              <SidebarMenuItem>Tax Tables</SidebarMenuItem>
              <SidebarMenuItem>Statutory Rules</SidebarMenuItem>
            </SidebarMenu>
          }
        >
          ePayroll
        </SidebarMenuItem>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsUsers)}
          sub={
            <SidebarMenu variant={SidebarMenuVariant.Sub}>
              <SidebarMenuItem>Users</SidebarMenuItem>
              <SidebarMenuItem>Roles</SidebarMenuItem>
            </SidebarMenu>
          }
        >
          Users
        </SidebarMenuItem>
        <SidebarMenuItem
          active={pathname.includes(config.paths.settingsUsers)}
          sub={
            <SidebarMenu variant={SidebarMenuVariant.Sub}>
              <SidebarMenuItem>Audit Trail</SidebarMenuItem>
              <SidebarMenuItem>Approval Records</SidebarMenuItem>
            </SidebarMenu>
          }
        >
          Admin Tools
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
};

export default MenuSettings;
