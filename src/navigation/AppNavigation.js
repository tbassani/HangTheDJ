import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import UserMixesScreen from '../screens/mix/UserMixesScreen';
import CreateMixScreen from '../screens/mix/CreateMixScreen';

import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

function AppNavigator() {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const PlayerNavigator = () => {
    <Stack.Navigator>
      <Stack.Screen name="UserProductsScreen" component={UserProductsScreen} />
    </Stack.Navigator>;
  };

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
        name="UserMixesScreen"
        component={UserMixesScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="record-player" color={color} size={Sizes.max} />
          ),
          tabBarLabel: 'Mix',
        }}
        name="CreateMixScreen"
        component={CreateMixScreen}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
