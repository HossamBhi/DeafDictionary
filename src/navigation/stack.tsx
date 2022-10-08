import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import More from '../pages/More';
import VideoPopup from '../pages/VideoPopup';
import Favorites from '../pages/Favorites';
import ContactUs from '../pages/ContactUs';
import AboutUs from '../pages/AboutUs';
import AboutProject from '../pages/AboutProject';
import Letters from '../pages/Letters';
import AnimatedTabs from './AnimatedTabs';
import Profile from '../pages/Profile';
import ImagesViewer from '../pages/ImagesViewer';

const Stack = createStackNavigator();

export const MainStack = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    // initialRouteName="RatingAndReviews"
  >
    <Stack.Group>
      <Stack.Screen name="TabNavigator" component={AnimatedTabs} />
      <Stack.Screen name="Letters" component={Letters} />
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="AboutProject" component={AboutProject} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Group>

    <Stack.Group screenOptions={{presentation: 'modal'}}>
      <Stack.Screen name="VideoPopup" component={VideoPopup} />
      <Stack.Screen name="ImagesViewer" component={ImagesViewer} />
    </Stack.Group>
  </Stack.Navigator>
);
