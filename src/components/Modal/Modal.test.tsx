import React from 'react';
import {mount} from 'enzyme';

import Modal from './Modal';

describe('<Modal />', () => {
  it('Should render correctly', () => {
    mount(
      <Modal open={true}>
        <p>Modal is here</p>
      </Modal>,
    );

    const portal = document.querySelector('[data-portal]');

    expect(portal).not.toEqual(null);

    if (portal) {
      const text = portal.querySelector('p');

      expect(text ? text.innerHTML : null).toEqual('Modal is here');
    }
  });

  // Below test always fail because enzyme can't simulate currentTarget using mount
  // If we use shallow then useState hooks not work https://github.com/facebook/react/issues/14840
  // For now test it manually
  // @todo waiting fix from the community for shallow render or convert back to react class so we can test it with shallow.

  // it('Should callback when not click on modal content', () => {
  //   const cbOnRequestClose = spy();
  //
  //   const wrapper = mount(
  //     <Modal open={true} onRequestClose={cbOnRequestClose}>
  //       <p>Modal is here 2</p>
  //     </Modal>,
  //   );
  //
  //   const wrapper = shallow(
  //     <Modal open={true} onRequestClose={cbOnRequestClose}>
  //       <p>Modal is here 2</p>
  //     </Modal>,
  //   );
  //
  //   const mouseDownTarget = 'backdrop';
  //
  //   const backdrop = wrapper.find('[role="document"]').at(0);
  //
  //   backdrop.simulate('mousedown', {target: mouseDownTarget});
  //
  //   backdrop.simulate('click', {
  //     target: mouseDownTarget,
  //     currentTarget: mouseDownTarget,
  //   });
  //
  //   expect(cbOnRequestClose.calledOnce).toBeTruthy();
  // });
});
