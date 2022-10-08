import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  useColorScheme,
  StatusBar,
  View,
  SafeAreaView,
  StatusBarStyle,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {DarkTheme, DefaultTheme} from './utils/schema';
import {useSelector} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './navigation';
const persistor = persistStore(store);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const MyStatusBar = ({
  backgroundColor,
  barStyle,
}: {
  backgroundColor: any;
  barStyle: StatusBarStyle | null | undefined;
}) => (
  <View style={[{height: STATUSBAR_HEIGHT}, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent {...{barStyle, backgroundColor}} />
    </SafeAreaView>
  </View>
);

const AppContainer = () => {
  const {activeTheme} = useSelector(
    (state: {appSettings: any}) => state.appSettings,
  );
  const scheme = useColorScheme();

  const isDark =
    activeTheme.value === 1
      ? scheme === 'dark'
      : activeTheme.value === 2
      ? true
      : false;
  const theme = isDark ? DarkTheme : DefaultTheme;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <MyStatusBar
                backgroundColor={theme.colors.surface}
                barStyle={isDark ? 'light-content' : 'dark-content'}
              />
              <MainStack />
            </NavigationContainer>
          </PaperProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

export default AppContainer;
