import React, {useEffect, useRef} from 'react';
import {
  View,
  AppState,
  Linking,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import PrimaryButton from '../../components/UI/PrimaryButton';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ScreenWrapper from '../../components/hoc/ScreenWrapper';

import Colors from '../../constants/Colors';

const ProfileScreen = props => {
  const leftApp = useRef(false);
  const profile = useSelector(currState => currState.app.profile);
  const profileURL = useSelector(currState => currState.app.profileURL);
  const loading = useSelector(currState => currState.app.loading);
  const isLoggedIn = useSelector(currState => {
    return currState.auth.isLoggedIn;
  });

  const appState = useRef(AppState.currentState);

  const dispatch = useDispatch();

  const navigation = props.navigation;

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('Auth');
    }
  }, [isLoggedIn, navigation]);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      if (!profile || profile.length <= 0) {
        dispatch(actions.initGetProfile());
      }
    });
    return () => {
      unsubscribeFocus();
    };
  }, [navigation, profile]);

  useEffect(() => {
    if (profile && profile.length > 0 && leftApp.current) {
      props.navigation.navigate('UserMixesNavigator', {
        screen: 'UserMixesScreen',
      });
    }
  }, [profile, leftApp]);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    if (Platform.OS === 'android') {
      AppState.addEventListener('focus', _handleAppStateChange);

      return () => {
        AppState.removeEventListener('change', _handleAppStateChange);
        if (Platform.OS === 'android') {
          AppState.removeEventListener('focus', _handleAppStateChange);
        }
      };
    }
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      (appState.current.match(/inactive|background/) &&
        nextAppState === 'active') ||
      !nextAppState
    ) {
      AppState.removeEventListener('change', _handleAppStateChange);
      if (Platform.OS === 'android') {
        AppState.removeEventListener('focus', _handleAppStateChange);
      }
      dispatch(actions.initGetProfile());
      leftApp.current = true;
    }
  };

  const openLink = async () => {
    if (profileURL && profileURL.length > 0) {
      //const supported = await Linking.canOpenURL(profileURL);
      //if (supported) {
      try {
        await Linking.openURL(profileURL);
      } catch (error) {
        Alert.alert(
          'Erro',
          'Copie e cole este link no seu navegador para prosseguir \n' +
            profileURL,
          [
            {
              text: 'Cancelar',
              onPress: () => console.log('Cancel Pressed'),
            },
            {
              text: 'Copiar',
              onPress: () => {
                Clipboard.setString(profileURL);
                Alert.alert('Copiado!');
              },
            },
          ],
        );
      }

      //} else {

      //}
    }
  };

  const handleNewProfile = () => {
    //dispatch(actions.initGetProfile());
    try {
      openLink();
    } catch (error) {
      Alert('Erro', 'Erro ao abrir link');
    }
  };

  const handleLogout = () => {
    dispatch(actions.initLogout());
  };

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <LoadingSpinner size="large" />
      </View>
    );
  }

  return (
    <ScreenWrapper style={styles.mainContainer} navigation={props.navigation}>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={handleLogout}>Logout</PrimaryButton>
        <PrimaryButton
          onPress={() => {
            AppState.removeEventListener('change', _handleAppStateChange);
            AppState.removeEventListener('focus', _handleAppStateChange);
            props.navigation.navigate('ResetPasswordScreen');
          }}>
          Alterar senha
        </PrimaryButton>
        {profile.length <= 0 ? (
          <PrimaryButton
            onPress={() => {
              handleNewProfile();
            }}>
            Adicionar Serviço de Streaming
          </PrimaryButton>
        ) : null}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
});

export default ProfileScreen;
