import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStyled_BW from '../screens/HomeStyled_BW';
import Favorites from '../screens/Favorites';
import Premium from '../screens/Premium';
import Menu from '../screens/Menu';

const Tab = createBottomTabNavigator();

export default function TabsRoot() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStyled_BW} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Premium" component={Premium} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
}
