import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import PrimaryButton from '../../components/UI/PrimaryButton';

import Colors from '../../constants/Colors';

const ProfileScreen = props => {
  const dispatch = useDispatch();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={() => dispatch(actions.initLogout())}>
          Logout
        </PrimaryButton>
        <PrimaryButton onPress={() => {}}>Alterar senha</PrimaryButton>
        <PrimaryButton onPress={() => {}}>
          Adicionar Serviço de Streaming
        </PrimaryButton>
      </View>
    </View>
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
