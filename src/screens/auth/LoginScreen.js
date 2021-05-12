import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  Platform,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';

import Input from '../../components/UI/Input';
import PrimaryButton from '../../components/UI/PrimaryButton';

import Colors from '../../constants/Colors';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

const formReducer = (state, action) => {
  if (action.type === INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }
  if (action.type === CLEAR_FORM) {
    return {
      formIsValid: action.formIsValid,
      inputValues: {...action.inputValues},
      inputValidities: {...action.inputValidities},
    };
  }
  return state;
};

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
        <PrimaryButton>Entrar</PrimaryButton>
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
