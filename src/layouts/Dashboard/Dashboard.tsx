import React, {FunctionComponent, ReactNode, useState} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import imgFavicon from '../../assets/img/favicon.svg';

import Topbar from '../../components/Topbar';
import Typo, {
  TypoVariants,
  TypoColors,
  TypoAlignment,
} from '../../components/Typo';
import Logo from '../../components/Logo';
import Sidebar, {SidebarButton, SidebarLogo} from '../../components/Sidebar';
import MenuSettings from './components/MenuSettings';
import MenuEPayroll from './components/MenuEPayroll';
import MenuETime from './components/MenuETime';
import {EPayRoll, Setting, ETime} from '../../components/Icons';

import {UserNavigationContainer} from '../../containers';

import styles from './Dashboard.module.css';
import config from '../../config';

export interface DashboardLayoutProps extends RouteComponentProps {
  children: ReactNode;
  companyName: string;
}

export enum DashboardMenu {
  Settings = 'settings',
  ETime = 'eTime',
  EPayRoll = 'ePayRoll',
}

const Dashboard: FunctionComponent<DashboardLayoutProps> = ({
  children,
  location,
  companyName,
}: DashboardLayoutProps) => {
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const [levelSidebarButton, setLevelSidebarButton] = useState<
    DashboardMenu | ''
  >('');

  const onClickSidebarButton = (module: DashboardMenu) => {
    return () => {
      if (module === levelSidebarButton) {
        setIsExpand(false);
        setLevelSidebarButton('');
      } else {
        setLevelSidebarButton(module);
        setIsExpand(true);
      }
    };
  };

  function renderSidebar() {
    switch (levelSidebarButton) {
      case DashboardMenu.Settings: {
        return <MenuSettings pathname={location.pathname} />;
      }
      case DashboardMenu.EPayRoll: {
        return <MenuEPayroll pathname={location.pathname} />;
      }
      case DashboardMenu.ETime: {
        return <MenuETime pathname={location.pathname} />;
      }
      default: {
        return null;
      }
    }
  }

  function handlerClickOverlay() {
    setIsExpand(false);
    setLevelSidebarButton('');
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.sidebar}>
        <Sidebar isExpanded={isExpand} renderExpand={renderSidebar()}>
          <SidebarButton
            active={
              location.pathname.includes(config.paths.settingsETime) ||
              DashboardMenu.ETime === levelSidebarButton
            }
            onClick={onClickSidebarButton(DashboardMenu.ETime)}
          >
            <ETime active={location.pathname.includes(config.paths.eTime)} />
          </SidebarButton>
          <SidebarButton
            active={
              location.pathname.includes(config.paths.ePayroll) ||
              DashboardMenu.EPayRoll === levelSidebarButton
            }
            onClick={onClickSidebarButton(DashboardMenu.EPayRoll)}
          >
            <EPayRoll
              active={location.pathname.includes(config.paths.ePayroll)}
            />
          </SidebarButton>
          <SidebarButton
            active={
              location.pathname.includes(config.paths.settings) ||
              DashboardMenu.Settings === levelSidebarButton
            }
            onClick={onClickSidebarButton(DashboardMenu.Settings)}
          >
            <Setting
              active={location.pathname.includes(config.paths.settings)}
            />
          </SidebarButton>
          <SidebarLogo
            className={styles.favicon}
            src={imgFavicon}
            alt="JuzTalent"
          />
        </Sidebar>
      </div>
      <div className={styles.drawn}>
        <Topbar className={styles.topbar}>
          <Logo company={companyName} />
          <Typo<HTMLDivElement>
            tag="div"
            variant={TypoVariants.h4}
            color={TypoColors.greyDark}
            align={TypoAlignment.middle}
          >
            {companyName}
          </Typo>
          <UserNavigationContainer />
        </Topbar>
        <div className={styles.content}>{children}</div>
      </div>
      {isExpand && (
        <div
          aria-hidden="true"
          className={styles.overlay}
          onClick={handlerClickOverlay}
        />
      )}
    </div>
  );
};

export default withRouter<DashboardLayoutProps>(Dashboard);
