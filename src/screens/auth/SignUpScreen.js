import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

import Input from '../../components/UI/Input';
import PrimaryButton from '../../components/UI/PrimaryButton';
import TextLink from '../../components/UI/TextLink';

import formReducer from '../../shared/formReducer';

import Colors from '../../constants/Colors';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

const SignUpScreen = props => {
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
      headerTitle: 'Sign Up',
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

  const signUpHandler = () => {
    navigation.navigate('RegisterScreen');
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
        <PrimaryButton onPress={signUpHandler}>Enviar Código</PrimaryButton>
        <TextLink
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.textLink}>
          Já possui uma conta?
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

export default SignUpScreen;
