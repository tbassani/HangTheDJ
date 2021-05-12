import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

//import {Platform, SafeAreaView, View, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './AuthNavigation';
import AppNavigator from './AppNavigation';

import LoginScreen from '../screens/auth/LoginScreen';

const MainNavigator = () => {
  const Stack = createStackNavigator();

  const isLoggedIn = false;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name="Start" component={StartScreen} /> */}
        {isLoggedIn ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
