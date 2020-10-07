import React from 'react';
import renderer from 'react-test-renderer';

import Snackbar, {SnackbarVariant} from './index';
import {Error} from '../Icons';

describe('<Snackbar />', () => {
  it('Should match snapshot normal style', () => {
    const snack = <Snackbar>Company information saved</Snackbar>;
    const tree = renderer.create(snack).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should match snapshot error style with icon', () => {
    const snack = (
      <Snackbar renderIcon={<Error />} variant={SnackbarVariant.Error}>
        Unable to save company information. Please check your internet
        connection.
      </Snackbar>
    );
    const tree = renderer.create(snack).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
