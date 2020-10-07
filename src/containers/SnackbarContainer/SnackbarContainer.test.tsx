import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import SnackbarContainer from './';
import rootReducers from '../../store/rootReducers';
import Snackbar from '../../components/Snackbar';

describe('<SnackbarContainer />', () => {
  test('Can render', () => {
    const store = createStore(rootReducers, {
      notifications: {
        snacks: [
          {
            id: 1,
            msg: '100',
          },
        ],
      },
    });
    const component = mount(
      <Provider store={store}>
        <SnackbarContainer />
      </Provider>,
    );

    expect(component.find(Snackbar)).toHaveLength(1);
  });
});
