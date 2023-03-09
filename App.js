import React, { useState, useEffect, } from 'react';
import { NavigationContainer,DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen'
import RegistrationScreen from './src/screens/RegistrationScreen'
import Loader from './src/components/Loader';
import BottomTab from './src/navigation/BottomTab';
import AllNotes from './src/screens/AllNotes';
import Note from './src/screens/Note';

import { DefaultTheme } from 'react-native-paper';
import { EventRegister } from 'react-native-event-listeners';
import theme from './src/theam/theme';
import themeContext from './src/theam/themeContext';

const Stack = createNativeStackNavigator();


export default function App() {
  const [initialRouteName, setInitialRouteName] = useState('');
  useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  },[]);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('HomeScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  };

  const [darkMode, setDarkMode] = useState(false)
  useEffect(() => {
    const listener = EventRegister.addEventListener('ChangeTheme', (data) => {
      setDarkMode(data)
    })
    return () => {
      EventRegister.removeAllListeners(listener)
    }
  }, [darkMode])
  
  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
    <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}> 
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={initialRouteName}
          >
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='RegistrationScreen' component={RegistrationScreen} />
            <Stack.Screen name='BottomTab' component={BottomTab} />
            <Stack.Screen name='AllNotes' component={AllNotes} />
            <Stack.Screen name='Note' component={Note} />
          </Stack.Navigator>
         
        </>
      )}
    </NavigationContainer>
    </themeContext.Provider>
  );
}
