import React from 'react';

import {useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import UserMixesScreen from '../screens/mix/UserMixesScreen';
import CreateMixScreen from '../screens/mix/CreateMixScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import StreamingProfileScreen from '../screens/mix/StreamingProfileScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import LoadingScreen from '../screens/LoadingScreen';

import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
      <Stack.Screen
        options={{
          headerTitle: 'Atualizando',
          headerTitleStyle: {alignSelf: 'center'},
        }}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Atualizar senha',
          headerTitleStyle: {alignSelf: 'center'},
        }}
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};

const CreateMixNavigatior = () => {
  const profile = useSelector(currState => currState.app.profile);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary,
        headerLeft: null,
      }}>
      {profile && profile.length > 0 ? (
        <Stack.Screen
          options={{
            headerTitle: 'Criar Mix',
            headerTitleStyle: {alignSelf: 'center'},
          }}
          name="CreateMixScreen"
          component={CreateMixScreen}
        />
      ) : (
        <Stack.Screen
          options={{
            headerTitle: 'Serviço de Streaming',
            headerTitleStyle: {alignSelf: 'center'},
          }}
          name="StreamingProfileScreen"
          component={StreamingProfileScreen}
        />
      )}
      <Stack.Screen
        options={{
          headerTitle: 'Atualizando',
          headerTitleStyle: {alignSelf: 'center'},
        }}
        name="LoadingScreen"
        component={LoadingScreen}
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
        name="CreateMixNavigatior"
        component={CreateMixNavigatior}
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
