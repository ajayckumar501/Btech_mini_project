import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation'; // Assuming navigation.js is in the same folder
import { UserProvider } from './context/userdataContext';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
enableScreens();


export default function App() {
  return (
    <>
      {/* Hide the status bar */}
      <StatusBar hidden={true} />
      <UserProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </UserProvider>
    </>
  );
}