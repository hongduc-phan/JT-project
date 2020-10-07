import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import config from './config';

export enum Languages {
  EN = 'en',
}

export const addLocales = (
  i: i18n.i18n,
  ns: string,
  resources: {
    [lang: string]: {
      [key: string]: string | any;
    };
  },
) => {
  for (const lang in resources) {
    if (resources.hasOwnProperty(lang)) {
      const k = lang as keyof typeof resources;
      i.addResourceBundle(lang, ns, resources[k]);
    }
  }
};

i18n.use(initReactI18next).init({
  fallbackLng: Languages.EN,
  debug: config.env !== 'production' && config.env !== 'test',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
