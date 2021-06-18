import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Input from '../../components/UI/Input';
import PrimaryButton from '../../components/UI/PrimaryButton';
import TextLink from '../../components/UI/TextLink';
import ScreenWrapper from '../../components/hoc/ScreenWrapper';

import formReducer from '../../shared/formReducer';

import Colors from '../../constants/Colors';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

const SignUpScreen = props => {
  const [clear, setClear] = useState(false);

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
      headerTitle: 'Sign Up',
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

  const clearInpuHandler = useCallback(() => {
    formDispatch({
      type: CLEAR_FORM,
      inputValues: {
        email: '',
      },
      inputValidities: {
        email: false,
      },
      formIsValid: false,
    });
    setClear(true);
  }, [formDispatch]);

  const signUpHandler = () => {
    if (formState.inputValues.email && formState.formIsValid) {
      dispatch(actions.initSignUp(formState.inputValues.email));
      navigation.navigate('RegisterScreen');
      clearInpuHandler();
    }
  };
  return (
    <ScreenWrapper style={styles.outterContainer}>
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
        <TextLink onPress={() => navigation.navigate('LoginScreen')}>
          Já possui uma conta?
        </TextLink>
      </View>
    </ScreenWrapper>
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
