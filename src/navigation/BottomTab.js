import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';
import CreateNote from '../screens/CreateNote';
import AllNotes from '../screens/AllNotes';
import ChecklistScreen from '../screens/ChecklistScreen';
import NoteDetail from '../screens/NoteDetail';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-analytics';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'sort-reverse-variant' : 'sort-reverse-variant';
            } else if (route.name === 'Notes') {
              iconName = focused ? 'newspaper' : 'newspaper-variant';
            } else if (route.name === 'Schedule') {
              iconName = focused ? 'calendar' : 'calendar-blank';
            } else if (route.name === 'CreateNote') {
              iconName = focused ? 'newspaper-variant-multiple' : 'newspaper-plus';
            } else if (route.name === 'Checklist') {
              iconName = focused ? 'list-status' : 'playlist-check';
            }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#303f9f',
          tabBarInactiveTintColor: 'gray',
          // tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 60,
            padding: 5
          },
          headerShown: false
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Notes' component={AllNotes} />
        <Tab.Screen name='CreateNote' component={CreateNote} />
        <Tab.Screen name='Checklist' component={ChecklistScreen} />
        <Tab.Screen name='Settings' component={SettingScreen} />
      </Tab.Navigator>
  )
}

export default BottomTab
