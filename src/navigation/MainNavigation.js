import React, {useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions';

import {getDataFromStorage} from '../services/storage';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './AuthNavigation';
import AppNavigator from './AppNavigation';

import AuthScreen from '../screens/auth/AuthScreen';

const MainNavigator = () => {
  const appState = useRef(AppState.currentState);

  const isLoggedIn = useSelector(currState => {
    return currState.auth.isLoggedIn;
  });

  const dispach = useDispatch();

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      getDataFromStorage('mixId').then(mixId => {
        getDataFromStorage('mixTitle').then(mixTitle => {
          getDataFromStorage('ownerId').then(ownerId => {
            if (mixId && mixTitle && ownerId) {
              dispach(
                actions.initGetMix(
                  parseInt(mixId),
                  mixTitle,
                  parseInt(ownerId),
                ),
              );
            }
          });
        });
      });
    }

    appState.current = nextAppState;
    console.log('AppState', appState.current);
  };

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
