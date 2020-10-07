import React from 'react';
import renderer from 'react-test-renderer';

import Sidebar, {
  SidebarButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTitle,
} from './';

import {ETime, EPayRoll, Setting} from '../Icons';

import {SidebarMenuVariant} from './types';

describe('<Sidebar />', () => {
  describe('Normal', () => {
    const SidebarNormalContainer = (isExpanded: boolean) => (
      <Sidebar
        isExpanded={isExpanded}
        classNames={{
          content: 'testContent',
          expand: 'testExpand',
          wrap: 'testWrap',
        }}
        renderExpand={
          <div>
            <SidebarTitle>Settings</SidebarTitle>
            <SidebarMenu>
              <SidebarMenuItem
                active={true}
                sub={
                  <SidebarMenu variant={SidebarMenuVariant.Sub}>
                    <SidebarMenuItem active={true}>Company</SidebarMenuItem>
                    <SidebarMenuItem>Departments</SidebarMenuItem>
                    <SidebarMenuItem>Gradings</SidebarMenuItem>
                    <SidebarMenuItem>Branches</SidebarMenuItem>
                    <SidebarMenuItem>WorkFlows</SidebarMenuItem>
                  </SidebarMenu>
                }
              >
                General
              </SidebarMenuItem>
              <SidebarMenuItem sub={<div />}>eTime</SidebarMenuItem>
              <SidebarMenuItem sub={<div />}>ePayroll</SidebarMenuItem>
              <SidebarMenuItem>Users</SidebarMenuItem>
            </SidebarMenu>
          </div>
        }
      >
        <SidebarButton>
          <ETime />
        </SidebarButton>
        <SidebarButton>
          <EPayRoll />
        </SidebarButton>
        <SidebarButton active={true}>
          <Setting active={true} />
        </SidebarButton>
      </Sidebar>
    );

    it('Should match normal sidebar snapshot', () => {
      const SidebarNormal = SidebarNormalContainer(false);

      const tree = renderer.create(SidebarNormal).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('Should match sidebar expanded snapshot', () => {
      const SidebarNormal = SidebarNormalContainer(true);

      const tree = renderer.create(SidebarNormal).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
