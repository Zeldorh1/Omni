import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import HomeStyled_BW from '../screens/HomeStyled_BW';
import Favorites from '../screens/Favorites';
import Premium from '../screens/Premium';
import Menu from '../screens/Menu';

const Tabs = createBottomTabNavigator();

export default function TabsRoot() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen 
        name="Home" 
        component={HomeStyled_BW} 
        options={{ title: 'Home' }} 
      />
      <Tabs.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{ title: 'Favorites' }} 
      />
      <Tabs.Screen 
        name="Premium" 
        component={Premium} 
        options={{ title: 'Premium' }} 
      />
      <Tabs.Screen 
        name="Menu" 
        component={Menu} 
        options={{ title: 'Menu' }} 
      />
    </Tabs.Navigator>
  );
}
