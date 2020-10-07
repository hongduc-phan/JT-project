import {addLocales} from '../../i18n';
import i18n from '../../i18n';
import {ns, resources} from './SettingsGeneralGradings.locale';

export * from './SettingsGeneralGradings';
export {default} from './SettingsGeneralGradings';

addLocales(i18n, ns, resources);
