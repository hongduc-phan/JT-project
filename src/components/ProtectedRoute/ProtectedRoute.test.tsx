import React from 'react';
import {MemoryRouter, Router} from 'react-router-dom';
import {mount} from 'enzyme';
import config from '../../config';
import ProtectedRoute from './ProtectedRoute';

const HelloComponent = () => <h1>Hello</h1>;

const template = (url: string = '/', isLogged: boolean) => {
  return (
    <MemoryRouter initialEntries={[url]}>
      <ProtectedRoute
        isLogged={isLogged}
        exact={true}
        path={config.paths.moduleSelection}
        component={HelloComponent}
      />
    </MemoryRouter>
  );
};

describe('<ProtectedRoute />', () => {
  it('Can render children normally when logged', () => {
    const component = mount(template(config.paths.moduleSelection, true));
    expect(component.find(HelloComponent).length).toEqual(1);
  });

  it('Should render redirect when not logged', () => {
    const component = mount(template(config.paths.moduleSelection, false));
    expect(component.find(HelloComponent).length).toEqual(0);
    expect(component.find(Router).props().history.location.pathname).toEqual(
      config.paths.signIn,
    );
  });
});
