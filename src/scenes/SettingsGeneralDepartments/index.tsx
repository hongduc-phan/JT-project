import {addLocales} from '../../i18n';
import i18n from '../../i18n';
import {ns, resources} from './SettingsGeneralDepartments.locale';

export * from './SettingsGeneralDepartments';
export {default} from './SettingsGeneralDepartments';

addLocales(i18n, ns, resources);
