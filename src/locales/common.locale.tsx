import {Languages} from '../i18n';

export const nsCommon = 'common';

export const commonLocaleResources = {
  [Languages.EN]: {
    cancel: 'Cancel',
    save: 'Save',
    add: 'Add',
    edit: 'Edit',
    create: 'Create',
    delete: 'Delete',
    search: 'Search',
    backToList: 'Back to list',
    yes: 'Yes',
    no: 'No',
    cancelNotice: 'Are you sure you want to abandon your changes?',
    noResults: 'No Results Found',
    itemsPerPage: 'Items per page:',
  },
};

export type commonLocaleKeys = keyof typeof commonLocaleResources[Languages.EN];

export function getCommonLocaleKey(key: commonLocaleKeys) {
  return `${nsCommon}:${key}`;
}
