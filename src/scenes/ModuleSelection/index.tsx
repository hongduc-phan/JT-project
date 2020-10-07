import {addLocales} from '../../i18n';
import i18n from '../../i18n';
import {ns, resources} from './ModuleSelection.locale';

export * from './ModuleSelection';
export {default} from './ModuleSelection';

addLocales(i18n, ns, resources);
