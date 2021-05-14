import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import UserMixesScreen from '../screens/mix/UserMixesScreen';
import CreateMixScreen from '../screens/mix/CreateMixScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MixNavigatior = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary,
        headerLeft: null,
      }}>
      <Stack.Screen name="UserMixesScreen" component={UserMixesScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        style: {
          backgroundColor: Colors.light,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="speaker" color={color} size={Sizes.huge} />
          ),
          tabBarLabel: 'Tocar',
        }}
        name="MixNavigatior"
        component={MixNavigatior}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="record-player" color={color} size={Sizes.max} />
          ),
          tabBarLabel: 'Mixar',
        }}
        name="CreateMixScreen"
        component={CreateMixScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={Sizes.max} />
          ),
          tabBarLabel: 'Mixar',
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
