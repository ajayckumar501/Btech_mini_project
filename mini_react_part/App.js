import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation'; // Assuming navigation.js is in the same folder
import { UserProvider } from './context/userdataContext';

export default function App() {
  return (
    <UserProvider>
       <NavigationContainer>
         <AppNavigator />
       </NavigationContainer>
    </UserProvider>
  );
}
