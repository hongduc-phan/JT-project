import React, {Fragment, FunctionComponent, ReactNode} from 'react';
import {HOCInput, InputValidateChildProps} from 'react-hoc-form-validatable';
import TextField, {ITextFieldProps} from '../TextField';

interface ValidateTextFieldProps {
  hidden?: boolean;
  children?: ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
  renderTop?: (state: {
    error: boolean;
    submitted: boolean;
    errorMessage: string;
  }) => ReactNode;
}

const ValidateTextField: FunctionComponent<
  ValidateTextFieldProps & ITextFieldProps & InputValidateChildProps
> = ({
  renderTop,
  dirty,
  validated,
  error,
  submitted,
  value,
  defaultValue,
  type,
  name,
  onBlur,
  onChange,
  errorMessage,
  label,
  lang,
  pending,
  hidden,
  onChangeValue,
  disabled,
  optional,
  ...rest
}: ValidateTextFieldProps & ITextFieldProps & InputValidateChildProps) => {
  const customOnBlur = (event: any) => {
    if (event.target.value) {
      onBlur();
    }
  };
  return (
    <Fragment>
      {renderTop && renderTop({error, submitted, errorMessage})}
      <TextField
        {...rest}
        assistiveText={errorMessage}
        type={type}
        name={name}
        onBlur={customOnBlur}
        onChange={onChange}
        error={error}
        value={value}
        disabled={disabled || submitted}
        label={label}
        hidden={hidden}
      />
    </Fragment>
  );
};

export default HOCInput<ITextFieldProps & ValidateTextFieldProps>(
  ValidateTextField,
);
