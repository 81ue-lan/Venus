import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import ListScreen from '../screen/list';
import ScanScreen from '../screen/scan';
import SettingScreen from '../screen/setting';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
                      backgroundColor:'#947EBE',
                      borderColor: '#947EBE', 
                      height: '8%',          
                      borderRadius:100,
                      margin:10,
                      shadowColor: '#999',
                      shadowOffset: { width: 0, height: 5 },
                      shadowOpacity: 1,
                      shadowRadius: 6,
                    },
        tabBarInactiveTintColor: '#000',
        tabBarActiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name="清單"
        component={ListScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="掃描"
        component={ScanScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="scan-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="設定"
        component={SettingScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if( routeName == 'GameDetails' ) {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;