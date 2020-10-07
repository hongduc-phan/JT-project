import React from 'react';
import renderer from 'react-test-renderer';
import {mount, ReactWrapper} from 'enzyme';

import Notification from './Notification';

describe('<Notification />', () => {
  describe('Normal', () => {
    let normalNotification: any;
    let component: ReactWrapper;

    beforeEach(() => {
      normalNotification = <Notification>Notification</Notification>;

      component = mount(normalNotification);
    });

    it('Should display a <span> tag', () => {
      const spans = component.find('span');
      expect(spans.length).toEqual(1);
    });

    it('Should match notification snapshot', () => {
      const tree = renderer.create(normalNotification).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('Has notifications', () => {
    let normalNotification: any;
    let component: ReactWrapper;

    beforeEach(() => {
      normalNotification = <Notification count={2}>Notification</Notification>;

      component = mount(normalNotification);
    });

    it('Should display two spans', () => {
      const spans = component.find('span');
      expect(spans.length).toEqual(2);
    });

    it('Should display badge', () => {
      const spans = component.find('span.badge');
      expect(spans.length).toEqual(1);
    });

    it('Should match notification with bage snapshot', () => {
      const tree = renderer.create(normalNotification).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
