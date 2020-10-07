import React, {FunctionComponent, ReactNode, useRef} from 'react';
import posed, {PoseGroup} from 'react-pose';
import Snackbar, {SnackbarVariant} from '../../components/Snackbar';
import Portal from '../../components/Portal';
import {Error} from '../../components/Icons';
import styles from './SnackbarContainer.module.css';
import {RootState} from '../../store';
import {notificationActions, Snack} from '../../features/notifications';
import {connect} from 'react-redux';
import {DeepReadonly} from 'utility-types';

const Msg = posed.div({
  from: {opacity: 0, height: 0},
  enter: {
    opacity: 1,
    height: 'auto',
    transition: {
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      ease: [0.4, 0, 0.2, 1],
      height: {
        delay: 300,
      },
    },
  },
});

export interface SnackbarContainerProps {
  snacks: DeepReadonly<Snack[]>;
  onSnackRemove: (key: number) => void;
  onSnackAdd: (msg: ReactNode, variant?: SnackbarVariant) => void;
}

const SnackbarContainer: FunctionComponent<SnackbarContainerProps> = ({
  onSnackRemove,
  onSnackAdd,
  snacks,
}: SnackbarContainerProps) => {
  const snacksRef = useRef(snacks);

  snacksRef.current = snacks;

  function onMsgComplete(key: number) {
    return () => {
      setTimeout(() => {
        if (snacksRef.current.findIndex((s) => s.id === key) >= 0) {
          onSnackRemove(key);
        }
      }, 5000);
    };
  }

  return (
    <Portal mount={true}>
      <div className={styles.root}>
        <PoseGroup preEnterPose="from" flipMove={false}>
          {snacks.map((k) => (
            <Msg
              key={k.id}
              className={styles.msg}
              onPoseComplete={onMsgComplete(k.id)}
            >
              <Snackbar
                renderIcon={
                  k.variant === SnackbarVariant.Error ? <Error /> : undefined
                }
                variant={k.variant}
              >
                {k.msg}
              </Snackbar>
            </Msg>
          ))}
        </PoseGroup>
      </div>
    </Portal>
  );
};

const mapStateToProps = ({notifications: {snacks}}: RootState) => ({
  snacks,
});

const mapDispatchToPros = {
  onSnackRemove: notificationActions.snackRemove,
  onSnackAdd: notificationActions.snackAdd,
};

export default connect(
  mapStateToProps,
  mapDispatchToPros,
)(SnackbarContainer);
