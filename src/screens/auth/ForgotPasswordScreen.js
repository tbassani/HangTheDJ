import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

import Input from '../../components/UI/Input';
import PrimaryButton from '../../components/UI/PrimaryButton';
import TextLink from '../../components/UI/TextLink';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import formReducer from '../../shared/formReducer';

import Colors from '../../constants/Colors';

const INPUT_UPDATE = 'UPDATE';

const ForgotPasswordScreen = props => {
  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: '',
    },
    inputValidities: {
      email: false,
    },
    formIsValid: false,
  });

  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Recuperar senha',
      headerTitleStyle: {alignSelf: 'center'},
    });
  }, [navigation]);

  const inputChangeHandler = useCallback(
    (inputId, inputValue, inputValidity) => {
      formDispatch({
        type: INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputId,
      });
    },
    [formDispatch],
  );

  const forgotPasswordHandler = () => {
    if (formState.inputValues.email && formState.formIsValid) {
      dispatch(actions.initForgotPassword(formState.inputValues.email));
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <SafeAreaView style={styles.outterContainer}>
      <View style={styles.mainContainer}>
        <Input
          required
          email
          placeholder="Email"
          id="email"
          keyboardType="email-address"
          autoCapitalize="none"
          errorText="Por favor, insira uma Email válido."
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <PrimaryButton onPress={forgotPasswordHandler}>
          Enviar Email
        </PrimaryButton>
        <TextLink onPress={() => navigation.navigate('LoginScreen')}>
          Voltar
        </TextLink>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.8,
    width: '70%',
  },
});

export default ForgotPasswordScreen;
