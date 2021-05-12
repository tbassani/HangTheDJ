import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../constants/Colors';

import UserMixesScreen from '../screens/mix/UserMixesScreen';

function AppNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary,
      }}>
      <Stack.Screen name="UserMixesScreen" component={UserMixesScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
