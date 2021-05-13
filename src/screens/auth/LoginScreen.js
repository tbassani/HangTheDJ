import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {SafeAreaView, View, StyleSheet, Alert} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Input from '../../components/UI/Input';
import PrimaryButton from '../../components/UI/PrimaryButton';
import TextLink from '../../components/UI/TextLink';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

import Colors from '../../constants/Colors';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

import formReducer from '../../shared/formReducer';

const LoginScreen = props => {
  const loading = useSelector(currState => {
    return currState.auth.loading;
  });
  // const error = useSelector(currState => {
  //   return currState.auth.error;
  // });

  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    isValid: false,
  });

  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Login',
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

  const loginHandler = () => {
    if (formState.formIsValid) {
      dispatch(
        actions.initLogin(
          formState.inputValues.email,
          formState.inputValues.password,
        ),
      );
      //navigation.navigate('App');
    } else {
      Alert.alert('Erro', 'Por favor, revise seus dados.');
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" />;
  }
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
        <Input
          id="password"
          placeholder="Senha"
          secureTextEntry
          required
          minLength={5}
          errorText="Por favor, insira uma senha válida."
          onInputChange={inputChangeHandler}
          initialValue=""
        />
        <PrimaryButton onPress={loginHandler}>Entrar</PrimaryButton>
        <TextLink onPress={() => navigation.navigate('SignUpScreen')}>
          Não é um DJ? Cadastre-se!
        </TextLink>
        <TextLink onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          Esqueci minha senha
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

export default LoginScreen;
