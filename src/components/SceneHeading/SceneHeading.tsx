import React, {FunctionComponent, ReactNode} from 'react';
import clsx from 'clsx';
import Typo, {TypoColors, TypoVariants} from '../Typo';
import styles from './SceneHeading.module.css';

export interface SceneHeadingProps {
  title: string;
  subTitle: string;
  className?: string;
  renderActions?: ReactNode;
}

const SceneHeading: FunctionComponent<SceneHeadingProps> = ({
  title,
  subTitle,
  renderActions,
  className,
}: SceneHeadingProps) => {
  return (
    <div className={clsx(styles.heading, className)}>
      <div className={styles.row}>
        <div className={styles.col1}>
          <Typo tag="div" variant={TypoVariants.h2} className={styles.title}>
            {title}
          </Typo>
          <Typo
            tag="div"
            color={TypoColors.greyDark}
            className={styles.subTitle}
          >
            {subTitle}
          </Typo>
        </div>
        <div className={styles.col2}>
          <div className={styles.colRight}>{renderActions}</div>
        </div>
      </div>
    </div>
  );
};

export default SceneHeading;
