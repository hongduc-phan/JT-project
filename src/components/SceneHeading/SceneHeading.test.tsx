import React from 'react';
import renderer from 'react-test-renderer';

import SceneHeading from './SceneHeading';
import Button, {ButtonVariants} from '../Button';

describe('<SceneHeading />', () => {
  it('Should match snapshot', () => {
    const tree = renderer
      .create(
        <SceneHeading
          title="Tile here"
          subTitle="Subtitle here"
          renderActions={
            <Button variant={ButtonVariants.Primary}>Action</Button>
          }
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
