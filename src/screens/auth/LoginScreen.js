import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

import Input from '../../components/UI/Input';
import PrimaryButton from '../../components/UI/PrimaryButton';
import TextLink from '../../components/UI/TextLink';

import Colors from '../../constants/Colors';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

import formReducer from '../../shared/formReducer';

const LoginScreen = props => {
  const [clear, setClear] = useState(false);

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
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
      setClear(false);
      formDispatch({
        type: INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputId,
      });
    },
    [formDispatch],
  );

  const clearInpuHandler = useCallback(() => {
    formDispatch({
      type: CLEAR_FORM,
      inputValues: {
        email: '',
        password: '',
      },
      inputValidities: {
        email: false,
        password: false,
      },
      formIsValid: false,
    });
    setClear(true);
  }, [formDispatch]);

  const loginHandler = () => {
    clearInpuHandler();
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
          clearAfterSubmit={clear}
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
          clearAfterSubmit={clear}
        />
        <PrimaryButton onPress={loginHandler}>Entrar</PrimaryButton>
        <TextLink
          onPress={() => navigation.navigate('SignUpScreen')}
          style={styles.textLink}>
          Não é um DJ? Cadastre-se!
        </TextLink>
        <TextLink
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
          style={styles.textLink}>
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
