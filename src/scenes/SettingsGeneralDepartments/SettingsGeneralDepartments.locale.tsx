import {Languages} from '../../i18n';

export const ns = 'SettingsGeneralDepartments';

export const resources = {
  [Languages.EN]: {
    title: 'Departments',
    subTitle: 'Create and edit departments within your company',
    empty: 'You have not created any departments yet.',
    createDepartment: 'Create a department',
    addDepartment: 'Add department',
    editDepartment: 'Edit department',
    deleteDepartment: 'Delete department',
    labelRowsPerPage: 'Items per page',
    confirmCancellationTitle: 'Are you sure you want to abandon your changes?',
    createSuccessfully: 'The department has been successfully created',
    createFailed: 'The department was not created. Please try again.',
    editSuccessfully: 'The department has been successfully edited',
    editFailed: 'The department was not edited. Please try again.',
    deleteSuccessfully: 'The department has been successfully deleted',
    deleteFailed: 'The department was not deleted. Please try again.',
    formDepartmentName: 'Department name',
  },
};

export type localeKeys = keyof typeof resources[Languages.EN];

export function getLocaleKey(key: localeKeys) {
  return `${ns}:${key}`;
}
