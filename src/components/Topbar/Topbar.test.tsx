import React from 'react';
import renderer from 'react-test-renderer';

import Topbar from './Topbar';
import Logo from '../Logo';

describe('<Topbar />', () => {
  let topBar: any;

  beforeEach(() => {
    topBar = (
      <Topbar>
        <Logo company="Juztalent" />
      </Topbar>
    );
  });

  it('Should match topbar snapshot', () => {
    const tree = renderer.create(topBar).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
