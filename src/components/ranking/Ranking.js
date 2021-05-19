import React, {useState, useReducer, useCallback} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

import RankingTrackItem from '../ranking/RankingTrackItem';
import Input from '../UI/Input';

import formReducer from '../../shared/formReducer';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

const Ranking = props => {
  const [clear, setClear] = useState(false);

  const tracks = useSelector(currState => {
    return currState.ranking.tracks;
  });

  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      query: '',
    },
    inputValidities: {
      query: false,
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
        query: '',
      },
      inputValidities: {
        query: false,
      },
      formIsValid: false,
    });
    setClear(true);
  }, [formDispatch]);

  const selectTrackHandler = track => {
    //TO-DO: Send user to voting screen for this track
    clearInpuHandler();
  };

  const renderTrackItem = itemData => {
    return (
      <RankingTrackItem
        imgSource={itemData.item.artURL}
        title={itemData.item.title}
        artists={itemData.item.artists}
        onSelectTrack={() => {
          selectTrackHandler(itemData.item);
        }}
        score={itemData.item.score}
      />
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.queryContainer}>
          <Input
            required
            placeholder="Busca"
            id="query"
            autoCapitalize="none"
            errorText="Busque por algo."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 0.9,
  },
  topContainer: {
    flex: 0.1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Sizes.tiny,
  },
  queryContainer: {
    flex: 1,
    width: '70%',
  },
});

export default Ranking;
