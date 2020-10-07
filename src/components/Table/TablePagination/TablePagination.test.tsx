import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import {spy} from 'sinon';

import TablePagination from './index';
import {ArrowRight} from '../../Icons';

describe('<TablePagination />', () => {
  it('Should match table snapshot', () => {
    const pagi = (
      <TablePagination
        labelRowsPerPage="Items per page:"
        rowsPerPageOptions={[5, 10, 25]}
        page={1}
        count={200}
        rowsPerPage={10}
      />
    );
    const tree = renderer.create(pagi).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should trigger change value', () => {
    const cbChangePage = spy();
    const cbChangeRow = spy();

    const wrapper = mount(
      <TablePagination
        labelRowsPerPage="Items per page:"
        rowsPerPageOptions={[5, 10, 25]}
        page={1}
        count={200}
        rowsPerPage={10}
        onChangePage={cbChangePage}
        onChangeRowsPerPage={cbChangeRow}
      />,
    );

    wrapper.find(ArrowRight).simulate('click');

    expect(cbChangePage.calledWith(2)).toBeTruthy();

    wrapper.find('input').simulate('click');

    expect(
      wrapper
        .find('li')
        .at(1)
        .text(),
    ).toEqual('10');
    wrapper
      .find('li')
      .at(1)
      .simulate('click');

    expect(cbChangeRow.calledWith(10)).toBeTruthy();
  });
});
