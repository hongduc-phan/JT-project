import {addLocales} from '../../i18n';
import i18n from '../../i18n';
import {ns, resources} from './SettingGeneralCompany.locale';

export * from './SettingsGeneralCompany';
export {default} from './SettingsGeneralCompany';

addLocales(i18n, ns, resources);
