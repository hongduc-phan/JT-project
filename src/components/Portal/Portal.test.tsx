/* global it expect describe beforeEach */

import React from 'react';
import {mount} from 'enzyme';
import Portal from './Portal';

describe('<Portal />', () => {
  it('Should not render anything', () => {
    const wrapper = mount(
      <Portal>
        <h1>Hello</h1>
      </Portal>,
    );
    expect(wrapper.children().length).toEqual(0);
  });

  it('Should render children', () => {
    const wrapper = mount(
      <Portal mount={true}>
        <h1>Hello</h1>
      </Portal>,
    );
    expect(wrapper.children().length).toEqual(1);
  });
});
