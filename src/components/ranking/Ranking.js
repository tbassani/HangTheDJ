import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';

import LoadingSpinner from '../../components/UI/LoadingSpinner';

import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Sizes from '../../constants/Sizes';

import RankingTrackItem from '../ranking/RankingTrackItem';
import Input from '../UI/Input';

import formReducer from '../../shared/formReducer';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

const Ranking = props => {
  const tracks = useSelector(currState => {
    return currState.mix.tracks;
  });
  const mixId = useSelector(currState => {
    return currState.mix.mixId;
  });

  const loading = useSelector(currState => currState.mix.loading);

  const [clear, setClear] = useState(false);

  const cancelToken = useRef();

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

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    setTimeout(() => {
      dispatch(
        actions.initGetRankingTracks(
          mixId,
          formState.inputValues.query,
          cancelToken,
        ),
      );
    }, 500);
  }, [formState.inputValues.query]);

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
    dispatch(actions.initGetVotingTrack(track.id));
    props.onSelectTrack();
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

  let listContent = (
    <FlatList
      data={tracks}
      renderItem={renderTrackItem}
      keyExtractor={item => item.id.toString()}
    />
  );

  if (loading) {
    listContent = (
      <View style={styles.mainContainer}>
        <LoadingSpinner size="large" />
      </View>
    );
  }

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
            clearAfterSubmit={clear}
          />
        </View>
      </View>
      <View style={styles.listContainer}>{listContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 0.85,
  },
  topContainer: {
    flex: 0.15,
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
