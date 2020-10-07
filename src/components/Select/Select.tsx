import React, {
  FunctionComponent,
  Children,
  cloneElement,
  ReactNode,
  useEffect,
} from 'react';
import Popover, {IPopoverClasses} from '../Popover';
import {IMenuItemProps} from '../MenuItem';
import Menu from '../Menu';

export interface ISelectProps {
  value?: any;
  children: ReactNode;
  anchor: HTMLElement | null;
  open?: boolean;
  onRequestCloseSelect?: () => void;
  onChangeValue?: (value: any) => void;
  onChangeDisplayValue?: (display: string) => void;
  popoverClasses?: IPopoverClasses;
}

const Select: FunctionComponent<ISelectProps> = ({
  anchor,
  open,
  onRequestCloseSelect,
  children,
  onChangeValue,
  onChangeDisplayValue,
  popoverClasses,
  value,
}: ISelectProps) => {
  useEffect(() => {
    const childs = Children.toArray(children);
    if (childs.length > 0 && onChangeDisplayValue) {
      let child = childs[0] as React.ReactElement<IMenuItemProps>;

      if (value) {
        childs.forEach((c) => {
          const x = c as React.ReactElement<IMenuItemProps>;

          if (x.props.value === value) {
            child = x;
          }
        });

        if (onChangeDisplayValue) {
          onChangeDisplayValue(
            child.props.children ? child.props.children.toString() : '',
          );
        }
      }
    }
  }, [children]);

  function handlerClickMenuItem(
    valueItem: any,
    requestClose: () => void,
    onClick?: (event: React.MouseEvent<HTMLLIElement>) => void,
  ) {
    return (event: React.MouseEvent<HTMLLIElement>) => {
      if (onChangeValue) {
        onChangeValue(valueItem);
      }

      if (onChangeDisplayValue) {
        onChangeDisplayValue(
          event.currentTarget.innerText ||
            event.currentTarget.textContent ||
            '',
        );
      }

      requestClose();

      if (onClick) {
        onClick(event);
      }
    };
  }

  useEffect(() => {
    if (!value && onChangeDisplayValue) {
      onChangeDisplayValue('');
    }
  }, [value]);

  if (open) {
    return (
      <Popover
        classes={popoverClasses}
        open={open}
        anchor={anchor}
        onRequestClose={onRequestCloseSelect}
      >
        {(requestClose) => (
          <Menu>
            {Children.map(
              children as any,
              (child: React.ReactElement<IMenuItemProps>) => {
                const {
                  onClick,
                  value: itemValue,
                  ...otherChildProps
                } = child.props;

                return cloneElement(
                  child as React.ReactElement<IMenuItemProps>,
                  {
                    ...otherChildProps,
                    selected: itemValue === value,
                    value: itemValue,
                    onClick: handlerClickMenuItem(
                      itemValue,
                      requestClose,
                      onClick,
                    ),
                  },
                );
              },
            )}
          </Menu>
        )}
      </Popover>
    );
  }

  return null;
};

export default Select;
