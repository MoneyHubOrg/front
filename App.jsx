import React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/routes';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { getFirebase } from '@react-native-firebase/app';


AppRegistry.registerComponent(appName, () => App);
getFirebase();

export default function App(){
  return(
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
  );
}