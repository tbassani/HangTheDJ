import React, {useEffect, useRef, useCallback} from 'react';
import {AppState} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions';

import {getDataFromStorage, saveDataToStorage} from '../services/storage';
import {updateQueueService} from '../services/mix';
import BackgroundFetch from 'react-native-background-fetch';

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
