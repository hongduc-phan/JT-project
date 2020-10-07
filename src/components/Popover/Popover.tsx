import React from 'react';
import posed from 'react-pose';
import clsx from 'clsx';

import debounce from 'lodash.debounce';

import Portal from '../Portal';

import styles from './Popover.module.css';

export interface IPopoverClasses {
  root?: string;
  overlay?: string;
  content?: string;
  child?: string;
}

export interface IPopoverProps {
  open: boolean;
  anchor: HTMLElement | null;
  onRequestClose?: () => void;
  children: (requestClose: () => void) => React.ReactNode;
  classes?: IPopoverClasses;
}

interface IPopoverStates {
  pose: 'open' | 'closed';
  maxHeight: string | undefined;
  minWidth: number;
  transformOrigin: TransformOrigin;
  position: {
    top: number;
    left: number;
  };
}

type TransformOrigin = [number, number];

const Box = posed.div({
  closed: {
    opacity: 0,
    transform: 'scale(0, 0) translateZ(0)',
    transformOrigin: ({
      transformOrigin,
    }: {
      transformOrigin: TransformOrigin;
    }) => {
      return `${transformOrigin[0]}px ${transformOrigin[1]}px`;
    },
    transition: {
      opacity: {
        ease: [0.4, 0, 0.2, 1],
        duration: 281,
      },
      transform: {
        ease: [0.4, 0, 0.2, 1],
        duration: 187,
      },
    },
  },
  open: {
    opacity: 1,
    transform: 'scale(1, 1) translateZ(0)',
    transformOrigin: ({
      transformOrigin,
    }: {
      transformOrigin: TransformOrigin;
    }) => {
      return `${transformOrigin[0]}px ${transformOrigin[1]}px`;
    },
    transition: {
      opacity: {
        ease: [0.4, 0, 0.2, 1],
        duration: 281,
      },
      transform: {
        ease: [0.4, 0, 0.2, 1],
        duration: 187,
      },
    },
  },
});

class Popover extends React.Component<IPopoverProps, IPopoverStates> {
  private handlerResize = debounce(() => {
    this.setPosition();
  }, 100);

  private content: HTMLDivElement | null | undefined;

  constructor(props: IPopoverProps) {
    super(props);
    this.state = {
      minWidth: 0,
      transformOrigin: [0, 0],
      pose: 'closed',
      maxHeight: '100%',
      position: {
        top: 0,
        left: 0,
      },
    };
  }

  public componentDidMount() {
    this.begin();
  }

  public componentWillUnmount() {
    this.cleanUp();
  }

  public componentDidUpdate(
    prevProps: Readonly<IPopoverProps>,
    prevState: Readonly<IPopoverStates>,
    snapshot?: any,
  ): void {
    const {anchor, open} = this.props;
    if (prevProps.anchor !== anchor) {
      this.setPosition();
    }

    if (prevProps.open && !open) {
      this.cleanUp();
    }

    if (!prevProps.open && open) {
      this.cleanUp();
      this.begin();
    }
  }

  public render() {
    const {open, children, classes = {}} = this.props;
    const {pose, transformOrigin, minWidth, position} = this.state;

    return (
      <Portal mount={open}>
        <div className={clsx(styles.root, classes.root)}>
          <div
            className={clsx(styles.overlay, classes.overlay)}
            onClick={this.handleOverlayClick}
            aria-hidden={true}
          />

          <Box
            transformOrigin={transformOrigin}
            onPoseComplete={this.handlerPoseChangeValue}
            pose={pose}
            ref={(node) => {
              this.content = node;
            }}
            className={clsx(styles.content, classes.content)}
            style={{
              maxHeight: this.state.maxHeight,
              top: position.top,
              left: position.left,
              minWidth,
            }}
          >
            <div className={clsx(styles.child, classes.child)}>
              {typeof children === 'function' && children(this.requestClose)}
            </div>
          </Box>
        </div>
      </Portal>
    );
  }

  private begin = () => {
    this.cleanUp();
    this.setPosition();
    window.addEventListener('resize', this.handlerResize);
  };

  private cleanUp = () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
    window.removeEventListener('resize', this.handlerResize);
  };

  private setPosition = () => {
    const {anchor} = this.props;
    if (this.content && anchor) {
      document.body.style.overflow = 'hidden';
      // Detect scrollbar
      document.body.style.paddingRight =
        window.innerWidth > document.documentElement.clientWidth ? '15px' : '0';

      const rect = anchor.getBoundingClientRect();

      const bottomSize = window.innerHeight - rect.top;
      const rightSize = document.body.clientWidth - rect.left;

      const top =
        bottomSize >= this.content.clientHeight
          ? rect.bottom
          : rect.top - (this.content.clientHeight - bottomSize);

      const left =
        rightSize >= this.content.clientWidth
          ? rect.left
          : rect.left + rect.width - this.content.clientWidth;

      this.setState({
        minWidth: rect.width,
        maxHeight: undefined,
        transformOrigin: [
          rightSize >= this.content.clientWidth ? 0 : this.content.clientWidth,
          bottomSize >= this.content.clientHeight ? 0 : rect.top - top,
        ],

        position: {
          top,
          left,
        },
        pose: 'open',
      });
    }
  };

  private handleOverlayClick = () => {
    this.setState({
      pose: 'closed',
    });
  };

  private handlerPoseChangeValue = () => {
    if (this.state.pose === 'closed' && this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  };

  private requestClose = () => {
    this.setState({
      pose: 'closed',
    });
  };
}

export default Popover;
