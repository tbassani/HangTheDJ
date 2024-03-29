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

  const topTracks = useSelector(currState => {
    return currState.mix.topTracks;
  });

  const mixId = useSelector(currState => {
    return currState.mix.mixId;
  });

  const loading = useSelector(currState => currState.mix.loading);

  const [clear, setClear] = useState(false);
  const [data, setData] = useState(tracks);

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
    let topTracksAux = [];
    let tracksAux = [...tracks];
    topTracks.forEach(track => {
      topTracksAux.push(track.id);
    });
    topTracksAux = tracksAux.filter(track => topTracksAux.includes(track.id));
    console.log('TOP TRACKS FOUND: ' + topTracksAux.length);
    if (topTracksAux.length === 0 && topTracks.length > 0) {
      console.log('NO top tracks found in tracks, but there are topTracks');
      if (formState.inputValues.query.length > 0) {
        topTracksAux = topTracks.filter(track => {
          return (
            track.title
              .toUpperCase()
              .includes(formState.inputValues.query.toUpperCase()) ||
            track.artists
              .toUpperCase()
              .includes(formState.inputValues.query.toUpperCase())
          );
        });
      } else {
        topTracksAux = topTracks;
      }
      tracksAux = [...topTracksAux, ...tracks];
      setData(tracksAux);
    } else {
      setData(tracksAux);
    }
  }, [tracks, topTracks, formState.inputValues.query]);

  useEffect(() => {
    console.log(formState.inputValues.query);
    cancelToken.current = axios.CancelToken.source();
    const time = setTimeout(() => {
      dispatch(
        actions.initGetRankingTracks(
          mixId,
          formState.inputValues.query,
          cancelToken,
        ),
      );
    }, 500);
    return () => {
      clearTimeout(time);
    };
  }, [formState.inputValues.query, mixId]);

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
    const topTracksAux = [];
    if (topTracks.length > 0) {
      topTracks.forEach(track => {
        topTracksAux.push(track.id);
      });
      if (topTracksAux.includes(itemData.item.id)) {
        return (
          <RankingTrackItem
            imgSource={itemData.item.artURL}
            title={itemData.item.title}
            artists={itemData.item.artists}
            onSelectTrack={() => {
              selectTrackHandler(itemData.item);
            }}
            score={itemData.item.score}
            topTrack
          />
        );
      }
    }

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
      data={data}
      renderItem={renderTrackItem}
      keyExtractor={item => item.id}
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
