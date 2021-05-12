import React from 'react';

import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../constants/Colors';

import LoginScreen from '../screens/auth/LoginScreen';

function AuthNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
