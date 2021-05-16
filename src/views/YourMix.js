import React, {useState, useReducer, useCallback} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions';

import Input from '../components/UI/Input';
import CustomModal from '../components/UI/CustomModal';
import PrimaryButton from '../components/UI/PrimaryButton';
import PlaylistItem from '../components/playlist/PlaylistItem';
import TrackItem from '../components/track/TrackItem';

import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

import formReducer from '../shared/formReducer';

const YourMix = props => {
  const [showModal, setShowModal] = useState(false);
  const [clear, setClear] = useState(false);

  const newMix = useSelector(currState => currState.app.newMix);

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      mixTitle: '',
    },
    inputValidities: {
      mixTitle: false,
    },
    isValid: false,
  });

  const dispatch = useDispatch();

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
        mixTitle: '',
      },
      inputValidities: {
        mixTitle: false,
      },
      formIsValid: false,
    });
    setClear(true);
  }, [formDispatch]);

  const removeTrackHandler = track => {
    dispatch(actions.removeTrackFromMix(track));
  };

  const removePlaylistHandler = playlist => {
    dispatch(actions.removePlaylistFromMix(playlist));
  };

  const createMixHandler = () => {
    setShowModal(true);
  };

  const createMix = () => {
    dispatch(actions.initCreateMix(formState.inputValues.mixTitle));
    setShowModal(false);
  };

  return (
    <View style={styles.mainContainer}>
      <CustomModal show={showModal} close={() => setShowModal(false)}>
        <View style={styles.modalContent}>
          <View style={styles.formContainer}>
            <View style={styles.modalDescContainer}>
              <Text style={styles.modalDesc}>Dê um nome para seu Mix!</Text>
            </View>
            <View style={styles.inputContainer}>
              <Input
                minLength={5}
                required
                placeholder="MEU MIX"
                id="mixTitle"
                autoCapitalize="none"
                errorText="Insira um nome válido."
                onInputChange={inputChangeHandler}
                initialValue=""
                clearAfterSubmit={clear}
              />
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={createMix}>Mixar!</PrimaryButton>
            </View>
          </View>
        </View>
      </CustomModal>
      <View style={styles.listContainer}>
        <ScrollView>
          {newMix.tracks.length > 0 ? (
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>- MÚSICAS -</Text>
            </View>
          ) : null}
          {newMix.tracks.map(item => {
            return (
              <TrackItem
                key={item.id}
                imgSource={item.artURL}
                title={item.title}
                artists={item.artists}
                onSelectTrack={() => {}}
                onRemoveTrack={() => removeTrackHandler(item)}
              />
            );
          })}
          {newMix.playlists.length > 0 ? (
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>- PLAYLISTS -</Text>
            </View>
          ) : null}

          {newMix.playlists.map(item => {
            return (
              <PlaylistItem
                key={item.id}
                imgSource={item.artURL}
                title={item.title}
                onSelectPlaylist={() => {}}
                onRemovePLaylist={() => removePlaylistHandler(item)}
              />
            );
          })}
        </ScrollView>
        <PrimaryButton onPress={createMixHandler}>Criar!</PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: Sizes.min,
  },
  listContainer: {
    flex: 1,
  },
  sectionTitle: {
    color: Colors.textDefault,
    fontSize: Sizes.huge,
  },
  sectionTitleContainer: {
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '70%',
    flex: 1,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  modalDescContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDesc: {
    color: Colors.textDefault,
    fontSize: Sizes.medium,
  },
});
export default YourMix;
