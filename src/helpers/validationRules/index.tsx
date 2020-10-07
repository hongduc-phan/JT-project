import {ValidationRuleFunction} from 'react-hoc-form-validatable';
import validateFileSizeLimit from './fileSizeLimit';
import validateType from './fileType';

// Usage example: fileSizeLimit,50000
const validateFileSizeLimitRule: ValidationRuleFunction = (
  value,
  params,
  input,
) => {
  /* tslint:disable:prefer-for-of */
  return validateFileSizeLimit(input.files, parseFloat(params[0]));
};

// Usage example: fileType,jpg,png,jpeg
const validateFileTypeRule: ValidationRuleFunction = (value, params, input) => {
  /* tslint:disable:prefer-for-of */
  return validateType(input.files, params);
};

export {validateFileSizeLimitRule, validateFileTypeRule};
