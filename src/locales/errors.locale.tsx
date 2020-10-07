import {Languages} from '../i18n';

export const nsErrors = 'errors';

export const errorsLocaleResources = {
  [Languages.EN]: {
    invalidUser: 'Invalid username or password.',
    // @todo get real message
    apiError: 'Api error',
    postalCode: 'Postal code must be number.',
  },
};

export type errorsLocaleKeys = keyof typeof errorsLocaleResources[Languages.EN];

export function getErrorsLocaleKey(key: errorsLocaleKeys) {
  return `${nsErrors}:${key}`;
}
