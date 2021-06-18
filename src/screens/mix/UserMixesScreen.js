import React, {useEffect, useState, useCallback, useReducer} from 'react';
import {View, FlatList, Text, StyleSheet, Alert} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Input from '../../components/UI/Input';
import PrimaryButton from '../../components/UI/PrimaryButton';
import TextLink from '../../components/UI/TextLink';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import MixItem from '../../components/mix/MixItem';
import ScreenWrapper from '../../components/hoc/ScreenWrapper';

import Colors from '../../constants/Colors';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

import formReducer from '../../shared/formReducer';

import Sizes from '../../constants/Sizes';

const UserMixesScreen = props => {
  const [clear, setClear] = useState(false);

  const dispatch = useDispatch();

  const mixes = useSelector(currState => {
    return currState.app.mixes;
  });

  const userId = useSelector(currState => {
    return currState.auth.userId;
  });

  const loading = useSelector(currState => {
    return currState.app.loading;
  });

  const mixOwnerId = useSelector(currState => currState.mix.ownerId);

  useEffect(() => {
    dispatch(actions.initGetMixes());
    dispatch(actions.initGetProfileURL());
    dispatch(actions.initGetProfile());
  }, []);

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
      dispatch(actions.initAddToGroup(formState.inputValues.code));
      clearInpuHandler();
    } else {
      Alert.alert('Erro', 'Código de Mix incorreto!');
    }
  };

  const removeMixHandler = (mixId, mixTitle) => {
    Alert.alert('Remover Mix', `Deseja mesmo remove o mix '${mixTitle}'?`, [
      {text: 'Cancelar', style: 'cancel', onPress: () => {}},
      {
        text: 'Remover',
        style: 'destructive',
        // If the user confirmed, then we dispatch the action we blocked earlier
        // This will continue the action that had triggered the removal of the screen
        onPress: () => {
          dispatch(actions.initRemoveMix(mixId));
        },
      },
    ]);
  };

  const selectMixHandler = (mixId, mixTitle, ownerId) => {
    dispatch(actions.initGetMix(mixId, mixTitle, ownerId));
    dispatch(actions.initRemoveTopTracks(userId, ownerId));
    dispatch(actions.initGetTopTracks(mixId));

    //dispatch(actions.initGetCurrentTrack(mixId));
    props.navigation.navigate('RankingNavigator', {screen: 'MixScreen'});
  };

  if (!loading && mixes && mixes.length <= 0) {
    return (
      <ScreenWrapper>
        <View style={styles.mainContainer}>
          <View style={styles.centered}>
            <Text style={styles.text}>Você não possui nenhum Mix.</Text>
            <Text style={styles.text}>
              Insiria um código de convidado para participar!
            </Text>
            <TextLink
              onPress={() => props.navigation.navigate('CreateMixNavigator')}>
              Ou crie seu próprio Mix!
            </TextLink>
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
              keyboardType="numeric"
            />
            <PrimaryButton onPress={() => addToGroupHandler()}>
              Participar!
            </PrimaryButton>
          </View>
        </View>
      </ScreenWrapper>
    );
  }

  if (loading || !mixes) {
    return (
      <ScreenWrapper>
        <View style={styles.mainContainer}>
          <View style={styles.top}>
            <Text style={styles.text}>
              Selecione um Mix ou insira o código de convidado para participar!
            </Text>
          </View>
          <LoadingSpinner size="large" />
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
                keyboardType="numeric"
              />
              <PrimaryButton onPress={() => addToGroupHandler()}>
                Participar!
              </PrimaryButton>
            </View>
          </View>
        </View>
      </ScreenWrapper>
    );
  }

  const renderMixItem = itemData => {
    return (
      <MixItem
        title={itemData.item.title}
        isOwner={itemData.item.ownerId === userId}
        onRemoveMix={() =>
          removeMixHandler(itemData.item.id, itemData.item.title)
        }
        onSelectMix={() =>
          selectMixHandler(
            itemData.item.id,
            itemData.item.title,
            itemData.item.ownerId,
          )
        }
      />
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.mainContainer}>
        <View style={styles.top}>
          <Text style={styles.text}>
            Selecione um Mix ou insira o código de convidado para participar!
          </Text>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={mixes}
            renderItem={renderMixItem}
            keyExtractor={item => item.id}
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
              keyboardType="numeric"
            />
            <PrimaryButton onPress={() => addToGroupHandler()}>
              Participar!
            </PrimaryButton>
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
  listContainer: {
    flex: 0.8,
    backgroundColor: Colors.light,
  },
  formContainer: {
    width: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Sizes.small,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 0.2,
    margin: Sizes.tiny,
  },
  text: {
    color: Colors.light,
    fontSize: Sizes.medium * 1.2,
    textAlign: 'center',
  },
});

export default UserMixesScreen;
