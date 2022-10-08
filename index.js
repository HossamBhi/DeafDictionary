import 'react-native-gesture-handler';
import {I18nManager, AppRegistry} from 'react-native';
import App from './App';
import './src/langs';
// For RTL Support
I18nManager.allowRTL(true);
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
