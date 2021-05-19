import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomModal from '../../components/UI/CustomModal';
import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';
import CurrentTrack from '../../components/mix/CurrentTrack';
import Player from '../../components/player/Player';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
//import TextLink from '../../components/UI/TextLink';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const MixScreen = props => {
  const [shareModal, setShareModal] = useState(false);

  const mixId = useSelector(currState => currState.mix.mixId);
  const ownerId = useSelector(currState => currState.mix.ownerId);
  const mixTitle = useSelector(currState => currState.mix.mixTitle);
  const tracks = useSelector(currState => currState.mix.tracks);
  const topTracks = useSelector(currState => currState.mix.topTracks);
  const currTrack = useSelector(currState => currState.mix.currTrack);
  const loading = useSelector(currState => currState.mix.loading);

  const userId = useSelector(currState => currState.auth.userId);

  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: mixTitle.length > 0 ? mixTitle : 'Tocando',
      headerTitleStyle: {alignSelf: 'center'},
      headerRight: mixTitle
        ? () => {
            return (
              <TouchableOpacity
                style={styles.shareButtonContainer}
                onPress={shareMixHandler}>
                <Icon
                  name="share-variant"
                  color={Colors.light}
                  size={Sizes.huge}
                />
              </TouchableOpacity>
            );
          }
        : () => {},
      headerLeft: mixTitle
        ? () => {
            return (
              <TouchableOpacity
                style={styles.shareButtonContainer}
                onPress={() => navigation.navigate('RankingScreen')}>
                <Icon name="podium" color={Colors.light} size={Sizes.huge} />
              </TouchableOpacity>
            );
          }
        : () => {},
    });
  }, [navigation, mixTitle]);

  const shareMixHandler = () => {
    setShareModal(true);
  };
  const copyMixCode = () => {
    setShareModal(false);
    Alert.alert('Código copiado!');
  };

  const onPressPlayHandler = () => {};

  const onPressPauseHandler = () => {};

  let mixContent = (
    <View style={styles.mainContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.message}>Escolha ou crie um Mix!</Text>
      </View>
    </View>
  );
  let buttonsContent = null;
  let playerContent = null;

  if (mixId && mixId > 0) {
    if (userId === ownerId) {
      playerContent = (
        <Player
          onPressPlay={onPressPlayHandler}
          onPressPause={onPressPauseHandler}
        />
      );
    }
    mixContent = (
      <View style={styles.mixContainer}>
        <View style={styles.currTrackContainer}>
          <CurrentTrack track={currTrack} />
        </View>
        <View style={styles.playerContainer}>{playerContent}</View>
      </View>
    );
    buttonsContent = (
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <SecondaryButton>
            <Icon name="lightbulb-on" color="#FFF" size={Sizes.huge} />
          </SecondaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => navigation.navigate('VotingScreen')}>
            <Icon name="vote" color="#FFF" size={Sizes.huge} />
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <SecondaryButton
            onPress={() => navigation.navigate('AddTracksToMixScreen')}>
            <Icon name="music-note-plus" color="#FFF" size={Sizes.huge} />
          </SecondaryButton>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.mainContainer}>
        <LoadingSpinner size="large" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <CustomModal show={shareModal} close={() => setShareModal(false)}>
        <View style={styles.modalContent}>
          <View style={styles.formContainer}>
            <View style={styles.modalDescContainer}>
              <Text style={styles.modalDesc}>
                Compartilhe esse Mix com seus amigos!
              </Text>
            </View>
            <View style={styles.mixCodeContainer}>
              <Text style={styles.mixCode}>{mixId}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={copyMixCode}>Copiar</PrimaryButton>
            </View>
          </View>
        </View>
      </CustomModal>
      {mixContent}
      <View style={styles.bottomContainer}>{buttonsContent}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  mixContainer: {
    flex: 0.85,
  },
  bottomContainer: {
    flex: 0.15,
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
  },
  buttonContainer: {
    flex: 0.5,
  },
  shareButtonContainer: {
    margin: Sizes.tiny,
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '70%',
    flex: 1,
    justifyContent: 'space-around',
  },
  modalDescContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalDesc: {
    textAlign: 'center',
    color: Colors.textDefault,
    fontSize: Sizes.medium,
  },
  mixCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mixCode: {
    fontSize: Sizes.max,
    color: Colors.textDefault,
  },
  currTrackContainer: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: Colors.textDefault,
    fontSize: Sizes.huge,
    textAlign: 'center',
  },
});
export default MixScreen;
