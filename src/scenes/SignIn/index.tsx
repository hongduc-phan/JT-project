import {ns, resources} from './SignIn.locale';
import i18n, {addLocales} from '../../i18n';

export * from './SignIn.locale';
export {default} from './containers/SiginContainer';

addLocales(i18n, ns, resources);
