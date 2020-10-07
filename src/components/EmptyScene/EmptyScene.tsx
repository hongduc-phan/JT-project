import React, {FunctionComponent, ReactNode} from 'react';
import clsx from 'clsx';

import imgEmptyState from '../../assets/img/empty-state.svg';
import Typo, {TypoVariants, TypoColors} from '../Typo';
import Card from '../Card';

import styles from './EmptyScene.module.css';

interface EmptySceneProps {
  classes?: {
    wrapper?: string;
  };
  text: string;
  children?: ReactNode;
}

const EmptyScene: FunctionComponent<EmptySceneProps> = ({
  classes = {},
  text,
  children,
}: EmptySceneProps) => {
  return (
    <Card className={clsx(styles.wrapper, classes.wrapper)}>
      <img src={imgEmptyState} alt="Empty state" className={styles.image} />
      <Typo
        className={styles.message}
        tag="div"
        variant={TypoVariants.h4}
        color={TypoColors.greyDark}
      >
        {text}
      </Typo>
      {children}
    </Card>
  );
};

export default EmptyScene;
