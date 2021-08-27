import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../constants/Colors';
import * as actions from '../../store/actions';

import {getDataFromStorage} from '../../services/storage';

const AuthScreen = props => {
  const dispach = useDispatch();

  const isLoggedIn = useSelector(state => {
    return state.auth.isLoggedIn;
  });

  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Autenticando',
      headerTitleStyle: {alignSelf: 'center'},
    });
  }, [navigation]);

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userId = await getDataFromStorage('userId');
        const email = await getDataFromStorage('email');
        const token = await getDataFromStorage('token');
        if ((!userId || !email || !token) && !isLoggedIn) {
          navigation.navigate('Auth');
          return;
        }
        dispach(actions.authenticate(parseInt(userId), token, email));
        navigation.navigate('App');
      } catch (error) {
        console.log(error);
        return;
      }
    };
    tryLogin();
  }, [dispach, isLoggedIn]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
