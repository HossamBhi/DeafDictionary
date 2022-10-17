import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';

import {MaterialCommunityIcons, Octicons} from '@expo/vector-icons';
import Letters from '../pages/Letters';
import More from '../pages/More';
import Numbers from '../pages/Numbers';
import Phrases from '../pages/Phrases';
import Words from '../pages/Words';
import CustomeIcon from '../components/common/CustomeIcon';
import {useTheme} from 'react-native-paper';

const TabArr = [
  {
    route: 'Letters',
    label: 'Letters',
    type: MaterialCommunityIcons,
    activeIcon: 'format-letter-case',
    inActiveIcon: 'format-letter-case',
    component: Letters,
  },
  {
    route: 'Numbers',
    label: 'Numbers',
    type: Octicons,
    activeIcon: 'number',
    inActiveIcon: 'number',
    component: Numbers,
  },
  {
    route: 'Phrases',
    label: 'Phrases',
    type: MaterialCommunityIcons,
    activeIcon: 'timeline-text',
    inActiveIcon: 'timeline-text-outline',
    component: Phrases,
  },
  {
    route: 'Words',
    label: 'Words',
    type: MaterialCommunityIcons,
    activeIcon: 'tooltip-text',
    inActiveIcon: 'tooltip-text-outline',
    component: Words,
  },
  //   route: 'Phrases',
  //   label: 'Phrases',
  //   type: MaterialCommunityIcons,
  //   activeIcon: 'script-text',
  //   inActiveIcon: 'script-text-outline',
  //   component: Phrases,
  // },
  {
    route: 'Mores',
    label: 'More',
    type: MaterialCommunityIcons,
    activeIcon: 'menu',
    inActiveIcon: 'menu',
    component: More,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = (props: any) => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);
  const {colors}: any = useTheme();

  useEffect(() => {
    if (focused) {
      viewRef?.current?.animate({
        0: {scale: 0.5, rotate: '0deg'},
        1: {scale: 1.5, rotate: '360deg'},
      });
    } else {
      viewRef?.current?.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <CustomeIcon
          Tag={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? colors.primary : colors.primaryLite}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function AnimatedTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          borderWidth: 0,
        },
      }}>
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
