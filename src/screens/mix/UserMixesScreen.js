import React, {useEffect, useState, useCallback, useReducer} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';

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

import ScreenWrapper from '../../components/hoc/ScreenWrapper';
import Sizes from '../../constants/Sizes';

const UserMixesScreen = props => {
  const [clear, setClear] = useState(false);

  const dispatch = useDispatch();

  const mixes = useSelector(currState => {
    return currState.app.mixes;
  });

  const loading = useSelector(currState => {
    return currState.app.loading;
  });

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      code: '',
    },
    inputValidities: {
      code: false,
    },
    isValid: false,
  });

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
        code: '',
      },
      inputValidities: {
        code: false,
      },
      formIsValid: false,
    });
    setClear(true);
  }, [formDispatch]);

  const addToGroupHandler = () => {
    if (formState.inputValues.code && formState.formIsValid) {
      dispatch(actions.initSignUp(formState.inputValues.email));
      clearInpuHandler();
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  if (mixes.length <= 0) {
    return (
      <ScreenWrapper>
        <View style={styles.mainContainer}>
          <View style={styles.centered}>
            <Text style={styles.text}>Você não possui nenhum Mix.</Text>
            <Text style={styles.text}>
              Insiria um código de convidado para participar!
            </Text>
            <TextLink>Ou crie seu próprio Mix!</TextLink>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.formContainer}>
            <Input
              id="code"
              placeholder="Código de convidado"
              required
              errorText="Por favor, insira um Código válido."
              onInputChange={inputChangeHandler}
              initialValue=""
              clearAfterSubmit={clear}
            />
            <PrimaryButton onPress={addToGroupHandler}>
              Participar!
            </PrimaryButton>
          </View>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.listContainer}>
        <Text style={styles.description}>
          Selecione uma Playlist HDJ ou insira o código de convidado para
          participar de uma nova!
        </Text>
        <View style={styles.middleContainer}>
          <FlatList
            data={listData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.formContainer}>
            <Input
              id="code"
              placeholder="Código de convidado"
              required
              errorText="Por favor, insira um Código válido."
              onInputChange={inputChangeHandler}
              initialValue=""
              clearAfterSubmit={clear}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  bottomContainer: {
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.light,
    fontSize: Sizes.medium,
  },
});

export default UserMixesScreen;
