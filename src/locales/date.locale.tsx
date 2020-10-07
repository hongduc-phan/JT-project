import {Languages} from '../i18n';

export const nsDate = 'date';

export const dateLocaleResources = {
  [Languages.EN]: {
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thur: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
    sun: 'Sunday',
    fullDay: 'Full day',
    halfDay: 'Half day',
  },
};

export type dateLocaleKeys = keyof typeof dateLocaleResources[Languages.EN];

export function getDateLocaleKey(key: dateLocaleKeys) {
  return `${nsDate}:${key}`;
}
