import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {View, KeyboardAvoidingView, FlatList, StyleSheet} from 'react-native';

import axios from 'axios';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions';

import Input from '../components/UI/Input';
import PlaylistItem from '../components/playlist/PlaylistItem';
import TrackItem from '../components/track/TrackItem';
import RadioButtons from '../components/UI/RadioButtons';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const INPUT_UPDATE = 'UPDATE';

import formReducer from '../shared/formReducer';

const options = [
  {
    key: 'track',
    text: 'Música',
  },
  {
    key: 'playlist',
    text: 'Playlist',
  },
];

const MakeMix = props => {
  const [selectedType, setSelectedType] = useState(options[0]);

  const cancelToken = useRef();

  const tracks = useSelector(currState => currState.app.tracks);
  const playlists = useSelector(currState => currState.app.playlists);
  const loading = useSelector(currState => currState.app.loading);

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
    if (!formState.inputValues.query.length <= 0)
      dispatch(
        actions.initGetTracksAndPlaylists(
          formState.inputValues.query,
          cancelToken.current,
        ),
      );
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

  const onSelectType = item => {
    if (selectedType && selectedType.key === item.key) {
      setSelectedType(null);
    } else {
      setSelectedType(item);
    }
  };

  const renderTrackItem = itemData => {
    return (
      <TrackItem
        imgSource={itemData.item.artURL}
        title={itemData.item.title}
        artists={itemData.item.artists}
      />
    );
  };
  const renderPlaylistItem = itemData => {
    console.log(itemData.item);
    return (
      <PlaylistItem
        title={itemData.item.title}
        imgSource={itemData.item.artURL}
      />
    );
  };

  let pickList = (
    <View style={styles.listContainer}>
      <FlatList
        data={tracks}
        renderItem={renderTrackItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );

  if (selectedType && selectedType.key === 'playlist') {
    console.log('SÃO PLAYLISTS');
    pickList = (
      <View style={styles.listContainer}>
        <FlatList
          data={playlists}
          renderItem={renderPlaylistItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }

  if (loading) {
    pickList = (
      <View style={styles.listContainer}>
        <LoadingSpinner size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
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
      <View>
        <RadioButtons
          selectedOption={selectedType}
          onSelect={onSelectType}
          options={options}
        />
      </View>
      {pickList}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
    marginVertical: Sizes.tiny,
    flex: 1,
    backgroundColor: Colors.dark,
  },
  queryContainer: {
    width: '70%',
    alignItems: 'center',
    marginVertical: Sizes.tiny,
  },
});

export default MakeMix;
