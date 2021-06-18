import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {SafeAreaView, View, Alert, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Input from '../../components/UI/Input';
import PrimaryButton from '../../components/UI/PrimaryButton';
import ScreenWrapper from '../../components/hoc/ScreenWrapper';

import Colors from '../../constants/Colors';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

import formReducer from '../../shared/formReducer';

const ResetPasswordScreen = props => {
  const [clear, setClear] = useState(false);

  const email = useSelector(currState => currState.auth.email);

  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    inputValidities: {
      oldPassword: false,
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
        oldPassword: '',
        password: '',
        confirmPassword: '',
      },
      inputValidities: {
        oldPassword: false,
        password: false,
        confirmPassword: false,
      },
      formIsValid: false,
    });
    setClear(true);
  }, [formDispatch]);

  const resetHandler = () => {
    const oldPassword = formState.inputValues.oldPassword;
    const password = formState.inputValues.password;
    const confirmPassword = formState.inputValues.confirmPassword;
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não são iguais!');
    } else {
      if (formState.formIsValid) {
        dispatch(actions.initResetPassword(email, oldPassword, password));
        clearInpuHandler();
        props.navigation.pop();
        props.navigation.navigate('UserMixesScreen');
      } else {
        Alert.alert('Erro', 'Senhas inválidas!');
      }
    }
  };

  return (
    <ScreenWrapper style={styles.outterContainer}>
      <View style={styles.mainContainer}>
        <Input
          required
          placeholder="Senha"
          id="oldPassword"
          secureTextEntry
          minLength={5}
          errorText="Por favor, insira a senha atual."
          onInputChange={inputChangeHandler}
          initialValue=""
          clearAfterSubmit={clear}
        />
        <Input
          id="password"
          placeholder="Nova senha"
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
        <PrimaryButton onPress={resetHandler}>Atualizar Senha</PrimaryButton>
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

export default ResetPasswordScreen;
