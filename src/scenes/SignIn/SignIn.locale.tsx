import {Languages} from '../../i18n';

export const ns = 'SignIn';

export const resources = {
  [Languages.EN]: {
    line: 'Supercharge your HR department.',
    subLine:
      'with our complete suite of human resource information system (HRIS) solutions.',
    lineButton: 'Learn more',
    title: 'Sign in',
    formCompany: 'Company name',
    formUsername: 'User name',
    formPassword: 'Password',
    formSubmit: 'Sign in',
    forgot: 'Forgot your password?',
    doNotHave: "Don't have an account?",
    signUp: 'Sign up free',
  },
};

export type localeKeys = keyof typeof resources[Languages.EN];

export function getLocaleKey(key: localeKeys) {
  return `${ns}:${key}`;
}
