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
import MixScreen from '../screens/mix/MixScreen';
import RankingScreen from '../screens/ranking/RankingScreen';
import AddTracksToMixScreen from '../screens/mix/AddTracksToMixScreen';
import VotingScreen from '../screens/voting/VotingScreen';

import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileNavigator = () => {
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

const UserMixesNavigator = () => {
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

const RankingNavigator = () => {
  const profile = useSelector(currState => currState.app.profile);
  const mixTitle = useSelector(currState => currState.mix.mixTitle);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary,
        headerLeft: null,
      }}>
      {mixTitle ? (
        <Stack.Screen
          options={{
            headerTitle: mixTitle,
            headerTitleStyle: {alignSelf: 'center'},
          }}
          name="MixScreen"
          component={MixScreen}
        />
      ) : (
        <Stack.Screen
          options={{
            headerTitle: 'Tocando',
            headerTitleStyle: {alignSelf: 'center'},
          }}
          name="MixScreen"
          component={MixScreen}
        />
      )}

      {profile && profile.length > 0 ? (
        <Stack.Screen
          options={{
            headerTitle: 'Adicionar ao Mix',
            headerTitleStyle: {alignSelf: 'center'},
          }}
          name="AddTracksToMixScreen"
          component={AddTracksToMixScreen}
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
          headerTitle: 'Ranking',
          headerTitleStyle: {alignSelf: 'center'},
        }}
        name="RankingScreen"
        component={RankingScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Votar',
          headerTitleStyle: {alignSelf: 'center'},
        }}
        name="VotingScreen"
        component={VotingScreen}
      />
    </Stack.Navigator>
  );
};

const CreateMixNavigator = () => {
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
            <Icon name="album" color={color} size={Sizes.huge} />
          ),
          tabBarLabel: 'Meus Mixes',
        }}
        name="UserMixesNavigator"
        component={UserMixesNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="record-player" color={color} size={Sizes.max} />
          ),
          tabBarLabel: 'Mixar',
        }}
        name="CreateMixNavigator"
        component={CreateMixNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="speaker" color={color} size={Sizes.huge} />
          ),
          tabBarLabel: 'Tocando',
        }}
        name="RankingNavigator"
        component={RankingNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={Sizes.max} />
          ),
          tabBarLabel: 'Conta',
        }}
        name="ProfileNavigator"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
