import React from 'react';
import renderer from 'react-test-renderer';
import {mount, ReactWrapper} from 'enzyme';

import Logo from './Logo';

describe('<Logo />', () => {
  describe('Normal', () => {
    let normalLogo: any;
    let component: ReactWrapper;

    beforeEach(() => {
      normalLogo = <Logo company="JuzTalent" />;

      component = mount(normalLogo);
    });

    it('Should alway render <span> tag', () => {
      const spans = component.find('span');
      expect(spans.length).toBeGreaterThan(0);
    });

    it('Should generate the first alphabel of company name', () => {
      expect(component.find('span').text()).toEqual('J');
    });

    it('Should match logo snapshot', () => {
      const tree = renderer.create(normalLogo).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('With logo', () => {
    let normalLogo: any;
    let component: ReactWrapper;

    beforeEach(() => {
      normalLogo = (
        <Logo
          logo="https://juztalent.com/wp-content/uploads/2017/01/cropped-juztalent.png"
          company="JuzTalent"
        />
      );

      component = mount(normalLogo);
    });

    it('Should alway render <img> tag', () => {
      const imgs = component.find('img');
      expect(imgs.length).toBeGreaterThan(0);
    });

    it('Should match logo with logo snapshot', () => {
      const tree = renderer.create(normalLogo).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
