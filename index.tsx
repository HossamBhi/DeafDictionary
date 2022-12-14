import 'react-native-gesture-handler';
import {I18nManager, AppRegistry} from 'react-native';
import App from './App';
import './src/langs';
import {name as appName} from './app.json';
// import {registerRootComponent} from 'expo';

// For RTL Support
I18nManager.allowRTL(true);
AppRegistry.registerComponent(appName, () => App);

// registerRootComponent(() => <App />);
