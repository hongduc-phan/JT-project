import {Languages} from '../../i18n';

export const ns = 'ModuleSelection';

export const resources = {
  [Languages.EN]: {
    subscribe: 'Subscribed Modules',
  },
};

export type localeKeys = keyof typeof resources[Languages.EN];

export function getLocaleKey(key: localeKeys) {
  return `${ns}:${key}`;
}
