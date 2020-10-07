import React, {FunctionComponent, useState, useEffect, ReactNode} from 'react';
import clsx from 'clsx';
import Portal from '../Portal';
import Typo from '../Typo';
import posed from 'react-pose';
import Card from '../Card';
import {TypoVariants} from '../Typo';
import ModalAction from './components/ModalAction';

import styles from './Modal.module.css';

interface IModalProps {
  open?: boolean;
  children?: React.ReactNode;
  onRequestClose?: () => void;
  classes?: {
    root?: string;
    overlay?: string;
    box?: string;
    card?: string;
    actions?: string;
    title?: string;
    content?: string;
  };
  renderActions?: ReactNode;
  renderTitle?: ReactNode;
}

const Box = posed.div({
  closed: {
    opacity: 0,
    transition: {
      opacity: {
        ease: [0.4, 0, 0.2, 1],
        duration: 225,
      },
    },
  },
  open: {
    opacity: 1,
    transition: {
      opacity: {
        ease: [0.4, 0, 0.2, 1],
        duration: 225,
      },
    },
  },
});

const Modal: FunctionComponent<IModalProps> = ({
  classes = {},
  open = false,
  children,
  onRequestClose,
  renderActions,
  renderTitle,
}: IModalProps) => {
  const [pose, setPose] = useState<'closed' | 'open'>(open ? 'open' : 'closed');
  const [portalOpen, setPortalOpen] = useState<boolean>(open);
  const [mountDownTarget, setMountDownTarget] = useState<HTMLElement | null>(
    null,
  );

  // Reference https://github.com/mui-org/material-ui/blob/c0287df54346221af06a5fea860a9d2e58e0f2d1/packages/material-ui/src/Dialog/Dialog.js#L143
  function handlerOverlayClick(e: React.MouseEvent<HTMLElement>) {
    if (e.target !== e.currentTarget) {
      return;
    }

    // Make sure the event starts and ends on the same DOM element.
    if (mountDownTarget !== e.target) {
      return;
    }

    setMountDownTarget(null);

    if (onRequestClose) {
      onRequestClose();
    }
  }

  function handlerOverlayMouseDown(e: React.MouseEvent<HTMLElement>) {
    setMountDownTarget(e.target as HTMLElement);
  }

  function handlerPoseChangeValue() {
    if (pose === 'closed') {
      setPortalOpen(false);
    }
  }

  useEffect(() => {
    if (open !== portalOpen && open === false) {
      setPose('closed');
    }

    if (open !== portalOpen && open === true) {
      setPortalOpen(true);
      setPose('open');
    }
  });

  return (
    <Portal mount={portalOpen}>
      <div className={clsx(styles.root, classes.root)}>
        <div
          className={clsx(styles.overlay, classes.overlay)}
          aria-hidden={true}
        />
        <Box
          onMouseDown={handlerOverlayMouseDown}
          onClick={handlerOverlayClick}
          initialPose={'closed'}
          pose={pose}
          onPoseComplete={handlerPoseChangeValue}
          className={clsx(styles.box, classes.box)}
          role="document"
        >
          <Card className={clsx(styles.card, classes.card)}>
            {renderTitle && (
              <Typo
                tag="div"
                variant={TypoVariants.h3}
                className={clsx(styles.title, classes.title)}
              >
                {renderTitle}
              </Typo>
            )}
            <div
              className={clsx(
                styles.content,
                classes.content,
                !children && styles.contentEmpty,
              )}
            >
              {children}
            </div>
            {renderActions && (
              <ModalAction className={clsx(classes.actions)}>
                {renderActions}
              </ModalAction>
            )}
          </Card>
        </Box>
      </div>
    </Portal>
  );
};

export default Modal;
