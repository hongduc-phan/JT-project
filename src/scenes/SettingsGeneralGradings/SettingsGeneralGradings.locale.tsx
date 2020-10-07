import {Languages} from '../../i18n';

export const ns = 'SettingsGeneralGradings';

export const resources = {
  [Languages.EN]: {
    title: 'Gradings',
    subTitle: 'Create and edit gradings within your company',
    empty: 'You have not created any gradings yet.',
    name: 'Grading',
    createGrading: 'Create a grading',
    addGrading: 'Add grading',
    editGrading: 'Edit grading',
    deleteGrading: 'Delete grading',
    labelRowsPerPage: 'Items per page',
    confirmCancellationTitle: 'Are you sure you want to abandon your changes?',
    createSuccessfully: 'The grading has been successfully created.',
    createFailed: 'The grading was not created. Please try again.',
    editSuccessfully: 'The grading has been successfully edited.',
    editFailed: 'The grading was not edited. Please try again.',
    deleteSuccessfully: 'The grading has been successfully deleted.',
    deleteFailed: 'The grading was not deleted. Please try again.',
    formGradingName: 'Grading name',
  },
};

export type localeKeys = keyof typeof resources[Languages.EN];

export function getLocaleKey(key: localeKeys) {
  return `${ns}:${key}`;
}
