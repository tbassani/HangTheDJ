import React from 'react';

import {useSelector} from 'react-redux';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './AuthNavigation';
import AppNavigator from './AppNavigation';

import AuthScreen from '../screens/auth/AuthScreen';

const MainNavigator = props => {
  const isLoggedIn = useSelector(currState => {
    return currState.auth.isLoggedIn;
  });

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarLabel: () => {
            return null;
          },
        }}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
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
