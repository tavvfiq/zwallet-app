/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import {INIT_PUSH_NOTIFICATION} from './app/services/NotificationService';

INIT_PUSH_NOTIFICATION();

if (Platform.OS === 'android') {
  // only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/id-ID'); // load the required locale details
}

AppRegistry.registerComponent(appName, () => App);
