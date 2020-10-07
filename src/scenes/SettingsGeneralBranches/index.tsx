import {addLocales} from '../../i18n';
import i18n from '../../i18n';
import {ns, resources} from './SettingsGeneralBranches.locale';

export * from './SettingsGeneralBranches';
export {default} from './SettingsGeneralBranches';

addLocales(i18n, ns, resources);
