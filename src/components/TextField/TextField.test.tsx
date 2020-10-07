import React from 'react';
import renderer from 'react-test-renderer';
import {mount, ReactWrapper} from 'enzyme';
import {spy} from 'sinon';

import TextField from './TextField';
import MenuItem from '../MenuItem';

describe('<TextField />', () => {
  let textField: any;
  let component: ReactWrapper;

  beforeEach(() => {
    textField = <TextField label="Label" />;

    component = mount(textField);
  });

  it("Shouldn't display icon", () => {
    const imgs = component.find('img');
    expect(imgs.length).toEqual(0);
  });

  it('Should display icon', () => {
    textField = (
      <TextField
        label="Label"
        icon="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-eye-256.png"
      />
    );
    const imgs = component.find('img');
    expect(imgs.length).toEqual(0);
  });

  it("Shouldn't focus on TextField", () => {
    let classNames;

    classNames = component.find('.label.activedLabel');
    expect(classNames.length).toEqual(0);
  });

  it('Should focus on Textfield', () => {
    component.find('input').simulate('focus');
    expect(
      component
        .find('div')
        .at(3)
        .find('span')
        .hasClass('activedLabel'),
    ).toEqual(true);
  });

  it('Should match textField snapshot', () => {
    const tree = renderer.create(textField).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should match TextField select snapshot', () => {
    const tree = renderer
      .create(
        <TextField label="Country" select={true} value="nKorea">
          <MenuItem value="usa">USA</MenuItem>
          <MenuItem value="russia">Russia</MenuItem>
          <MenuItem value="nKorea">North Korea</MenuItem>
          <MenuItem value="china">China</MenuItem>
        </TextField>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('TextField type select should work', () => {
    const cbChangeSelect = spy();

    const wrapper = mount(
      <TextField
        label="Country"
        select={true}
        onChangeSelectValue={cbChangeSelect}
        value="usa"
      >
        <MenuItem value="usa">USA</MenuItem>
        <MenuItem value="russia">Russia</MenuItem>
        <MenuItem value="nKorea">North Korea</MenuItem>
        <MenuItem value="china">China</MenuItem>
      </TextField>,
    );

    wrapper.find('input').simulate('click');
    expect(
      wrapper
        .find('li')
        .at(0)
        .text(),
    ).toEqual('USA');
    expect(wrapper.find('input').props().value).toEqual('usa');
    expect(wrapper.find('.inputSelect').text()).toEqual('USA');
    wrapper
      .find('li')
      .at(1)
      .simulate('click');
    expect(wrapper.find('input').props().value).toEqual('russia');
    expect(wrapper.find('.inputSelect').text()).toEqual('Russia');
    expect(cbChangeSelect.calledWith('russia')).toBeTruthy();
  });
});
