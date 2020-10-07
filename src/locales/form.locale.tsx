import {Languages} from '../i18n';

export const nsForm = 'form';

export const formLocaleResources = {
  [Languages.EN]: {
    country: 'Country',
    address: 'Address',
    addressLine1: 'Address line 1',
    addressLine2: 'Address line 2',
    postal: 'Postal code',
    locationCor: 'Location coordinates',
    chooseFile: 'Choose file',
    uploadImage: 'Upload image',
  },
};

export type formLocaleKeys = keyof typeof formLocaleResources[Languages.EN];

export function getFormLocaleKey(key: formLocaleKeys) {
  return `${nsForm}:${key}`;
}
