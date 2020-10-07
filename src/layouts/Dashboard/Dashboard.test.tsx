import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount} from 'enzyme';
import Dashboard from './Dashboard';
import config from '../../config';
import {EPayRoll, ETime, Setting} from '../../components/Icons';
import Sidebar from '../../components/Sidebar';
import MenuSettings from './components/MenuSettings';
import MenuEPayroll from './components/MenuEPayroll';
import MenuETime from './components/MenuETime';
import store from '../../store';
import {Provider} from 'react-redux';

const template = (url: string = '/') => {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={[url]}>
        <Dashboard companyName="Expresso Media">
          <h1>Dashboard</h1>
        </Dashboard>
      </MemoryRouter>
    </Provider>
  );
};

describe('<Dashboard />', () => {
  it('Can render children normally', () => {
    const component = mount(template());
    expect(component.find('h1').text()).toEqual('Dashboard');
  });

  it('Icon should active when in the pathname', () => {
    const component = mount(template(config.paths.settings));
    expect(component.find(Setting).props().active).toBeTruthy();
  });

  it('Should open sidebar when click on icon', () => {
    const component = mount(template(config.paths.settingsGeneralDepartments));
    component.find(Setting).simulate('click');
    expect(component.find(Sidebar).props().isExpanded).toBeTruthy();
    // Overlay appear
    expect(component.find('[aria-hidden="true"]').length).toEqual(1);
    expect(component.find(MenuSettings).length).toEqual(1);
    component.find(EPayRoll).simulate('click');
    expect(component.find(MenuEPayroll).length).toEqual(1);
    component.find(ETime).simulate('click');
    expect(component.find(MenuETime).length).toEqual(1);
    expect(component.find(Setting).props().active).toBeTruthy();
  });

  it('Should close sidebar when click on icon and overlay', () => {
    const component = mount(template(config.paths.settingsGeneralDepartments));
    component.find(Setting).simulate('click');
    expect(component.find(Sidebar).props().isExpanded).toBeTruthy();
    component.find(Setting).simulate('click');
    expect(component.find(Sidebar).props().isExpanded).not.toBeTruthy();
    component.find(Setting).simulate('click');
    expect(component.find(Sidebar).props().isExpanded).toBeTruthy();
    component.find('[aria-hidden="true"]').simulate('click');
    expect(component.find(Sidebar).props().isExpanded).not.toBeTruthy();
  });
});
