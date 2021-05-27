import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';

import CustomModal from '../../components/UI/CustomModal';
import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';
import CurrentTrack from '../../components/mix/CurrentTrack';
import Player from '../../components/player/Player';

import LoadingSpinner from '../../components/UI/LoadingSpinner';

import BackgroundFetch from 'react-native-background-fetch';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import MinMixDuration from '../../constants/MinMixDuration';

const MixScreen = props => {
  const [shareModal, setShareModal] = useState(false);
  //const [loadingTrack, setLoadingTrack] = useState(true);
  const trackInterval = useRef();
  const pressedPlay = useRef();

  const mixId = useSelector(currState => currState.mix.mixId);
  const ownerId = useSelector(currState => currState.mix.ownerId);
  const mixTitle = useSelector(currState => currState.mix.mixTitle);
  const currTrack = useSelector(currState => currState.mix.currentTrack);
  const loading = useSelector(currState => currState.mix.loading);
  const isPlaying = useSelector(currState => currState.mix.isPlaying);
  const tracks = useSelector(currState => currState.mix.tracks);

  const userId = useSelector(currState => currState.auth.userId);

  const profile = useSelector(currState => currState.app.profile);
  const profileURL = useSelector(currState => currState.app.profileURL);

  const dispatch = useDispatch();

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
    const unsubscribeFocus = navigation.addListener('focus', () => {
      dispatch(actions.initGetCurrentTrack(mixId));
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      clearInterval(trackInterval.current);
    });
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation, mixTitle]);

  useEffect(() => {
    if (!isPlaying) {
      BackgroundFetch.stop();
    }
  }, [isPlaying]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      dispatch(actions.initGetCurrentTrack(mixId));
    }, 5000);
    trackInterval.current = timeInterval;
    return () => {
      clearInterval(timeInterval);
    };
  }, [mixId]);

  useEffect(() => {
    if (!isPlaying) {
      clearInterval(trackInterval.current);
    }
  }, [isPlaying]);

  const initBackgroundFetch = async () => {
    // BackgroundFetch event handler.
    console.log('PRESSED PLAY: ' + pressedPlay.current);
    const onEvent = async taskId => {
      console.log('[BackgroundFetch] task: ', taskId);
      // Do your background work...
      dispatch(actions.initBeginPlayback(pressedPlay.current));
      pressedPlay.current = false;

      BackgroundFetch.finish(taskId);
    };

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgorundFetch.finish(taskId)
    const onTimeout = async taskId => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    // Initialize BackgroundFetch only once when component mounts.
    let status = await BackgroundFetch.configure(
      {minimumFetchInterval: 15},
      onEvent,
      onTimeout,
    );

    console.log('[BackgroundFetch] configure status: ', status);
  };

  const shareMixHandler = () => {
    setShareModal(true);
  };
  const copyMixCode = () => {
    setShareModal(false);
    Clipboard.setString(mixId + '');
    Alert.alert('Código copiado!');
  };

  const checkMixDuration = () => {
    let mixDuration = 0;
    tracks.forEach(track => {
      mixDuration = mixDuration + track.duration;
      if (mixDuration > MinMixDuration.duration) {
        return true;
      }
    });
    return false;
  };

  const onPressPlayHandler = () => {
    pressedPlay.current = true;
    if (checkMixDuration) {
      initBackgroundFetch();
    } else {
      Alert.alert(
        'Mix muito curta!',
        'Por favor, adicione ao menos 20 minutos de música.',
      );
    }
  };

  const onPressPauseHandler = () => {
    dispatch(actions.initStopPlayback());
    clearInterval(trackInterval.current);
    BackgroundFetch.stop();
  };

  const votingHandler = () => {
    dispatch(actions.initGetVotingTrack());
    navigation.navigate('VotingScreen');
  };
  let mixContent = null;
  if (!mixTitle || mixTitle.length <= 0) {
    mixContent = (
      <View style={styles.mainContainer}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.message}>Escolha ou crie um Mix!</Text>
        </View>
      </View>
    );
  }

  let buttonsContent = null;
  let playerContent = null;

  if (loading) {
    playerContent = <LoadingSpinner size="large" />;
  } else {
    if (mixId && mixId > 0) {
      if (userId === ownerId) {
        playerContent = (
          <Player
            onPressPlay={onPressPlayHandler}
            onPressPause={onPressPauseHandler}
            isPlaying={isPlaying}
          />
        );
      }
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
          <PrimaryButton onPress={votingHandler}>
            <Icon name="thumbs-up-down" color="#FFF" size={Sizes.huge} />
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <SecondaryButton
            onPress={() => {
              if (!profile || profile.length <= 0) {
                navigation.navigate('StreamingProfileScreen');
              } else {
                navigation.navigate('AddTracksToMixScreen');
              }
            }}>
            <Icon name="music-note-plus" color="#FFF" size={Sizes.huge} />
          </SecondaryButton>
        </View>
      </View>
    );
  }

  const openLink = async () => {
    if (profileURL && profileURL.length > 0) {
      const supported = await Linking.canOpenURL(profileURL);
      if (supported) {
        await Linking.openURL(profileURL);
      } else {
        Alert.alert(`Don't know how to open this URL: ${profileURL}`);
      }
    }
  };

  const handleNewProfile = () => {
    //dispatch(actions.initGetProfile());
    try {
      openLink();
    } catch (error) {
      Alert('Erro', 'Erro ao abrir link');
    }
  };

  if ((!profile || profile.length <= 0) && ownerId === userId) {
    return (
      <View style={styles.mainContainer}>
        <PrimaryButton onPress={() => handleNewProfile()}>
          Adicionar Serviço de Streaming
        </PrimaryButton>
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
