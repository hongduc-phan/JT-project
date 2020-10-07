import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';

import App from './App';

import i18n, {addLocales} from './i18n';

import {commonLocaleResources, nsCommon} from './locales/common.locale';
import {dateLocaleResources, nsDate} from './locales/date.locale';

import './index.css';
import store from './store';
import './store/refreshToken';
import {Provider} from 'react-redux';
import SnackbarContainer from './containers/SnackbarContainer';
import {formLocaleResources, nsForm} from './locales/form.locale';
import {errorsLocaleResources, nsErrors} from './locales/errors.locale';

addLocales(i18n, nsCommon, commonLocaleResources);
addLocales(i18n, nsDate, dateLocaleResources);
addLocales(i18n, nsForm, formLocaleResources);
addLocales(i18n, nsErrors, errorsLocaleResources);

ReactDOM.render(
  <Provider store={store}>
    <App />
    <SnackbarContainer />
  </Provider>,
  document.getElementById('root'),
);
