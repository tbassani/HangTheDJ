import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {SafeAreaView, View, Alert, StyleSheet} from 'react-native';

import Input from '../../components/UI/Input';
import PrimaryButton from '../../components/UI/PrimaryButton';
import TextLink from '../../components/UI/TextLink';

import Colors from '../../constants/Colors';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

import formReducer from '../../shared/formReducer';

const RegisterScreen = props => {
  const [clear, setClear] = useState(false);

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    inputValidities: {
      email: false,
      password: false,
      confirmPassword: false,
    },
    formIsValid: false,
  });

  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Cadastro',
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
        confirmPassword: '',
      },
      inputValidities: {
        email: false,
        password: false,
        confirmPassword: false,
      },
      formIsValid: false,
    });
    setClear(true);
  }, [formDispatch]);

  const registerHandler = () => {
    const password = formState.inputValues.password;
    const confirmPassword = formState.inputValues.confirmPassword;
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não são iguais!');
    } else {
      clearInpuHandler();
    }
  };

  return (
    <SafeAreaView style={styles.outterContainer}>
      <View style={styles.mainContainer}>
        <Input
          required
          placeholder="Código"
          id="code"
          keyboardType="numeric"
          autoCapitalize="none"
          errorText="Por favor, insira o código."
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
        <Input
          id="confirmPassword"
          placeholder="Confirmação de senha"
          secureTextEntry
          required
          minLength={5}
          errorText="Por favor, insira uma senha válida."
          onInputChange={inputChangeHandler}
          initialValue=""
          clearAfterSubmit={clear}
        />
        <PrimaryButton onPress={registerHandler}>Cadastrar</PrimaryButton>
        <TextLink
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.textLink}>
          Voltar para Login
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

export default RegisterScreen;
