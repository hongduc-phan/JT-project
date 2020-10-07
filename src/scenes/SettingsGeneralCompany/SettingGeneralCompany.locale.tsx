import {Languages} from '../../i18n';

export const ns = 'SettingGeneralCompany';

export const resources = {
  [Languages.EN]: {
    title: 'Company information',
    subTitle: 'Enter basic information, work days and payment details',
    uploadLogo: 'Upload company logo',
    uploadRecommend:
      'We recommend the logo be sized at least 240 x 240 px, not more than 3MB in file size and uploaded in jpeg format.',
    formCompany: 'Company name',
    formReg: 'Business reg no.',
    formCountry: 'Country',
    formAddress: 'Address',
    formAddressLine1: 'Address line 1',
    formAddressLine2: 'Address line 2',
    formPostal: 'Postal code',
    formWeek: 'Week starts',
    rest: 'Company rest day(s)',
    addRest: 'Add rest days',
    halfDaySetting: 'Half-day settings(hrs)',
    formSelectDay: 'Select day',
    fullOrHalf: 'Full or half day',
    fullDay: 'Full day',
    halfDay: 'Half day',
    bankDetails: 'Bank details',
    bank: 'Bank',
    bankAccount: 'Bank account name',
    bankAccountNum: 'Bank account number',
    addBankAcc: 'Add bank account',
    back2List: 'Back to list',
    formState: 'State',
    branchCode: 'Branch code',
    modalSuccessfulLoginHeading: 'Welcome to JuzTalent',
    modalSuccessfulLoginSubHeading:
      'Let’s set up some basic information to get started!',
    modalSuccessfulLoginButton: "Let's go",
    addBankSuccess: 'Bank account has been successfully added.',
    addBankFailed: 'Cannot add bank account. Please try again.',
    deleteBankFailed: 'Cannot delete bank account. Please try again.',
    deleteBankSuccess: 'Bank account has been successfully deleted.',
    confirmDeleteBank: 'Are you sure you want to delete the bank account?',
    editCompanySuccess: 'Company information has been successfully edited.',
    editCompanyFailed: 'Cannot edit company information. Please try again.',
    formCompanyError:
      'Please correct the errors on the company information form before you can submit.',
    errorUploadLogoFileSize:
      'Please upload an image that is no larger than 3MB.',
    errorUploadLogoFileType:
      'Please upload an image that is in .jpg/.jpeg format.',
  },
};

export type localeKeys = keyof typeof resources[Languages.EN];

export function getLocaleKey(key: localeKeys) {
  return `${ns}:${key}`;
}
