import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import UserMixesScreen from '../screens/mix/UserMixesScreen';
import CreateMixScreen from '../screens/mix/CreateMixScreen';
import ProfileScreen from '../screens/user/ProfileScreen';

import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const ProfileNavigatior = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary,
        headerLeft: null,
      }}>
      <Stack.Screen
        options={{
          headerTitle: 'Minha conta',
          headerTitleStyle: {alignSelf: 'center'},
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

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
      <Stack.Screen
        options={{
          headerTitle: 'Criar Mix',
          headerTitleStyle: {alignSelf: 'center'},
        }}
        name="CreateMixScreen"
        component={CreateMixScreen}
      />
    </Stack.Navigator>
  );
};

const UserMixesNavigatior = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary,
        headerLeft: null,
      }}>
      <Stack.Screen
        options={{
          headerTitle: 'Meus Mixes',
          headerTitleStyle: {alignSelf: 'center'},
        }}
        name="UserMixesScreen"
        component={UserMixesScreen}
      />
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
        name="UserMixesNavigatior"
        component={UserMixesNavigatior}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="record-player" color={color} size={Sizes.max} />
          ),
          tabBarLabel: 'Mixar',
        }}
        name="MixNavigatior"
        component={MixNavigatior}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={Sizes.max} />
          ),
          tabBarLabel: 'Conta',
        }}
        name="ProfileNavigatior"
        component={ProfileNavigatior}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
