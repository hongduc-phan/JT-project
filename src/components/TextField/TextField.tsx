import React, {
  AllHTMLAttributes,
  useState,
  useRef,
  ReactNode,
  useEffect,
} from 'react';
import clsx from 'clsx';

import {TextFieldAlignment} from './types';

import Typo, {TypoVariants, TypoColors} from '../Typo';
import {ArrowDown} from '../Icons';
import Select from '../Select';

import styles from './TextField.module.css';

export interface ITextFieldProps extends AllHTMLAttributes<HTMLInputElement> {
  active?: boolean;
  disabled?: boolean;
  label?: string;
  icon?: ReactNode;
  assistiveText?: string;
  error?: boolean;
  display?: string;
  alignIcon?: TextFieldAlignment;
  select?: boolean;
  children?: ReactNode;
  /** Callback when change selected value on select box */
  onChangeSelectValue?: (value: any) => void;
  /** Set init open select box */
  open?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  className?: string;
  classes?: {
    assistiveText?: string;
    textField?: string;
    textFieldFocus?: string;
    textFieldError?: string;
    arrow?: string;
    inputSelect?: string;
  };
}

function getDisplay(display: string) {
  if ('tall' === display) {
    return styles.tall;
  }
  return styles.normal;
}

function getColor(error: boolean, active: boolean): TypoColors {
  if (error) {
    return TypoColors.red;
  }
  return active ? TypoColors.black : TypoColors.greyMedium;
}

const TextField = ({
  required,
  name,
  children,
  select,
  label,
  icon,
  assistiveText = '',
  error = false,
  display = 'normal',
  alignIcon = TextFieldAlignment.right,
  onBlur,
  onFocus,
  value,
  defaultValue,
  readOnly,
  onChangeSelectValue,
  open,
  disabled,
  onChange,
  inputRef,
  hidden,
  className,
  active = false,
  classes = {},
  ...others
}: ITextFieldProps) => {
  const inputEl = useRef(null);
  const [isActive, setActive] = useState(active || Boolean(value));
  const [focus, setFocus] = useState(false);
  const [openSelect, setOpenSelect] = useState(open);
  const [valueSelect, setValueSelect] = useState(value);
  const [displaySelectValue, setDisplaySelectValue] = useState('');

  function handlerOnFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!active) {
      setActive(true);
      setFocus(true);
    }
    e.persist();
    if (onFocus) {
      onFocus(e);
    }
  }

  function onFocusOut(e: React.FocusEvent<HTMLInputElement>) {
    if (!active) {
      setActive(Boolean(e.currentTarget.value) || false);
      setFocus(false);
    }
    e.persist();
    if (onBlur) {
      onBlur(e);
    }
  }

  function onClickParent() {
    setOpenSelect(!openSelect);
    setFocus(true);
  }

  function onRequestCloseSelect() {
    setOpenSelect(false);
    setFocus(false);
  }

  function handlerOnChangeValueSelect(v: any) {
    setValueSelect(v);
    if (onChangeSelectValue) {
      onChangeSelectValue(v);
    }
    if (onChange) {
      // Manually call onchange. So react-hoc-form-validatable can capture new values
      onChange({
        target: {
          name,
          value: v,
        },
        persist(): void {
          //
        },
      } as any);
    }
  }

  useEffect(() => {
    if (!active) {
      if (value) {
        setActive(true);
      } else {
        setActive(false);
      }
    }

    if (select) {
      setValueSelect(value);
    }
  }, [value]);

  return (
    <div
      className={clsx(styles.root, disabled && styles.rootDisabled, className)}
      hidden={hidden}
    >
      <div
        ref={inputEl}
        onClick={select && !disabled ? onClickParent : undefined}
        className={clsx(
          styles.textField,
          getDisplay(display),
          {
            [styles.active]: isActive,
            [styles.focus]: focus,
            [styles.error]: error,
            [classes.textFieldFocus as string]: isActive,
            [classes.textFieldError as string]: error,
          },
          classes.textField,
        )}
      >
        {select && (
          <span className={clsx(styles.arrow, classes.arrow)}>
            <ArrowDown />
          </span>
        )}
        <div
          className={clsx(styles.formGroup, {
            [styles.reverse]: 'left' === alignIcon,
          })}
        >
          <div className={styles.formLabel}>
            {label && (
              <Typo
                className={clsx(styles.label, {
                  [styles.activedLabel]: select
                    ? Boolean(valueSelect)
                    : isActive,
                  [styles.error]: error,
                })}
                variant={TypoVariants.subTitle}
              >
                {label}
                {required && '*'}
              </Typo>
            )}
            <input
              {...others}
              className={clsx(styles.input, readOnly && styles.inputReadOnly)}
              onFocus={!readOnly ? handlerOnFocus : undefined}
              onBlur={!readOnly ? onFocusOut : undefined}
              value={select ? valueSelect : value}
              readOnly={select ? true : readOnly}
              disabled={disabled}
              hidden={select}
              onChange={onChange}
              ref={inputRef}
              name={name}
              required={required}
              defaultValue={defaultValue}
            />
            {select && (
              <div
                className={clsx(
                  styles.input,
                  select && styles.inputSelect,
                  classes.inputSelect,
                )}
              >
                {displaySelectValue}
              </div>
            )}
          </div>
          {icon && <span className={styles.icon}>{icon}</span>}
        </div>
      </div>
      {assistiveText && (
        <Typo
          tag="div"
          variant={TypoVariants.subTitle}
          color={getColor(error, isActive)}
          className={clsx(styles.assistiveText, classes.assistiveText)}
        >
          {assistiveText}
        </Typo>
      )}
      {select && (
        <Select
          value={valueSelect}
          onChangeValue={handlerOnChangeValueSelect}
          onChangeDisplayValue={setDisplaySelectValue}
          onRequestCloseSelect={onRequestCloseSelect}
          open={openSelect}
          anchor={inputEl.current}
        >
          {children}
        </Select>
      )}
    </div>
  );
};

export default TextField;
