import React, {useEffect, useState} from 'react';
import {
  View,
  Linking,
  Alert,
  AppState,
  DevSettings,
  StyleSheet,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import PrimaryButton from '../../components/UI/PrimaryButton';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ScreenWrapper from '../../components/hoc/ScreenWrapper';

import Colors from '../../constants/Colors';

const StreamingProfileScreen = props => {
  const profileURL = useSelector(currState => currState.app.profileURL);
  const loading = useSelector(currState => currState.app.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    AppState.addEventListener('focus', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
      AppState.removeEventListener('focus', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      (AppState.current.match(/inactive|background/) &&
        nextAppState === 'active') ||
      !nextAppState
    ) {
      dispatch(actions.initGetProfile());
      props.navigation.navigate('LoadingScreen');
      DevSettings.reload();
    }
  };

  const openLink = async () => {
    if (profileURL && profileURL.length > 0) {
      const supported = await Linking.canOpenURL(profileURL);
      if (supported) {
        await Linking.openURL(profileURL);
      } else {
        Alert.alert(`Don't know how to open this URL: ${profileURL}`);
      }
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

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <LoadingSpinner size="large" />
      </View>
    );
  }

  return (
    <ScreenWrapper style={styles.mainContainer} navigations={props.navigation}>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={() => handleNewProfile()}>
          Adicionar Serviço de Streaming
        </PrimaryButton>
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

export default StreamingProfileScreen;
