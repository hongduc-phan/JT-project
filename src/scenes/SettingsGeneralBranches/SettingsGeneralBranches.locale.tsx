import {Languages} from '../../i18n';

export const ns = 'SettingsGeneralBranches';

export const resources = {
  [Languages.EN]: {
    title: 'Branches',
    subTitle: 'Create and edit branches for your company here.',
    empty: 'You have not created any branches yet.',
    createABranch: 'Create a branch',
    createBranch: 'Create branch',
    editBranch: 'Edit branch',
    formBranchName: 'Branch name',
    cancelNotice: 'Are you sure you want to abandon your changes?',
    searchBranchLocation: 'Search branch location',
    address: 'Address',
    createBranchSuccess: 'The branch has been successfully created',
    createBranchFailed: 'The branch was not created. Please try again.',
    confirmDeleteBranchTitle:
      'Are you sure you want to delete the bank account?',
    deleteBranchSuccess: 'The branch has been successfully deleted',
    deleteBranchFailed: 'The branch was not deleted. Please try again.',
    editBranchSuccess: 'The branch has been successfully edited',
    editBranchFailed: 'The branch was not edited. Please try again.',
    notFoundBranch: 'Not found branch',
  },
};

export type localeKeys = keyof typeof resources[Languages.EN];

export function getLocaleKey(key: localeKeys) {
  return `${ns}:${key}`;
}
