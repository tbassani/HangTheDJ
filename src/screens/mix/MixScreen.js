import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';

import Heartbeat from '../../Heartbeat';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import IdleTimerManager from 'react-native-idle-timer';
import MusicControl from 'react-native-music-control';

import CustomModal from '../../components/UI/CustomModal';
import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';
import CurrentTrack from '../../components/mix/CurrentTrack';
import Player from '../../components/player/Player';

import LoadingSpinner from '../../components/UI/LoadingSpinner';
import ScreenWrapper from '../../components/hoc/ScreenWrapper';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';
import MinMixDuration from '../../constants/MinMixDuration';
import {updateQueueService} from '../../services/mix';

const icon = require('../../assets/icon.png');

const MixScreen = props => {
  const [shareModal, setShareModal] = useState(false);
  //const [loadingTrack, setLoadingTrack] = useState(true);
  const trackInterval = useRef();
  const playbackInterval = useRef();
  const pressedPlay = useRef(false);
  const playbackCounter = useRef(0);
  const initialCurrTrack = useRef(false);

  const mixId = useSelector(currState => currState.mix.mixId);
  const ownerId = useSelector(currState => currState.mix.ownerId);
  const mixTitle = useSelector(currState => currState.mix.mixTitle);
  const currTrack = useSelector(currState => currState.mix.currentTrack);
  const loading = useSelector(currState => currState.mix.loading);
  const isPlaying = useSelector(currState => currState.mix.isPlaying);
  const tracks = useSelector(currState => currState.mix.tracks);
  const topTracks = useSelector(currState => currState.mix.topTracks);

  const userId = useSelector(currState => currState.auth.userId);

  const profile = useSelector(currState => currState.app.profile);
  const profileURL = useSelector(currState => currState.app.profileURL);

  const dispatch = useDispatch();

  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: mixTitle && mixTitle.length > 0 ? mixTitle : 'Tocando',
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
      if (mixId) {
        console.log('[FOCUS]: GET TOP TRACKS');
        dispatch(actions.initGetTopTracks(mixId));
      }
    });

    return () => {
      console.log('UNSUB FOCUS');
      unsubscribeFocus();
    };
  }, [navigation, mixTitle, mixId]);

  useEffect(() => {
    if (mixId) {
      console.log('[USE-EFFECT]: INITIAL GET TOP TRACKS');
      dispatch(actions.initGetTopTracks(mixId));
      dispatch(actions.initGetCurrentTrack(mixId));
    }
  }, [mixId]);

  useEffect(() => {
    if (!pressedPlay.current && !initialCurrTrack.current) {
      console.log('[USE-EFFECT]: GET CURR TRACK');
      dispatch(actions.initGetCurrentTrack(mixId));
      initialCurrTrack.current = true;
    }
  }, [topTracks, mixId]);

  useEffect(() => {
    if (isPlaying && !trackInterval.current) {
      console.log('SET TOP TRACKS INTERVAL');
      const timeInterval = setInterval(() => {
        initialCurrTrack.current = false;
        dispatch(actions.initGetTopTracks(mixId));
      }, 5000);
      trackInterval.current = timeInterval;
    } else if (!isPlaying) {
      clearInterval(trackInterval.current);
      trackInterval.current = undefined;
    }
    return () => {
      clearInterval(trackInterval.current);
      trackInterval.current = undefined;
    };
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && !playbackInterval.current && userId === ownerId) {
      const newInterval = setInterval(() => {
        playbackCounter.current = playbackCounter.current + 5;
        if (playbackCounter.current >= 900) {
          console.log('UPDATE QUEUE INTERVAL');
          updateQueueService(mixId);
          playbackCounter.current = 0;
          MusicControl.setNowPlaying({
            title: 'Hang the DJ',
            artwork: icon, // URL or RN's image require()
          });
        }
      }, 5000);
      playbackInterval.current = newInterval;
    } else if (!isPlaying) {
      clearInterval(playbackInterval.current);
      playbackInterval.current = undefined;
    }
    return () => {
      clearInterval(playbackInterval.current);
      playbackInterval.current = undefined;
    };
  }, [isPlaying, userId, ownerId]);

  useEffect(() => {
    if (isPlaying && pressedPlay.current === true) {
      updateQueueService(mixId).then(resp => {
        console.log('UPDATE QUEUE FROM PLAYING');
        dispatch(actions.initGetTopTracks(mixId));
        dispatch(actions.initGetCurrentTrack(mixId));
      });
      pressedPlay.current = false;
    }
  }, [isPlaying]);

  const shareMixHandler = () => {
    if (mixId && mixId > 0) {
      setShareModal(true);
    }
  };
  const copyMixCode = () => {
    if (mixId && mixId > 0) {
      setShareModal(false);
      Clipboard.setString(mixId + '');
      Alert.alert('Código copiado!');
    }
  };

  const checkMixDuration = () => {
    let mixDuration = 0;
    tracks.forEach(track => {
      mixDuration = mixDuration + track.duration;
    });
    if (mixDuration > MinMixDuration.duration) {
      return true;
    }
    return false;
  };

  const onPressPlayHandler = () => {
    if (currTrack) {
      pressedPlay.current = true;
      IdleTimerManager.setIdleTimerDisabled(true);
      if (checkMixDuration()) {
        dispatch(actions.initPlayTrack(mixId, currTrack.externalId));
      } else {
        Alert.alert(
          'Mix muito curta!',
          'Por favor, adicione ao menos 30 minutos de música.',
        );
      }
    } else {
      dispatch(actions.initGetMix(mixId, mixTitle, ownerId));
      dispatch(actions.initGetTopTracks(mixId));
      dispatch(actions.initGetCurrentTrack(mixId));
    }
  };

  const onPressPauseHandler = () => {
    IdleTimerManager.setIdleTimerDisabled(false);
    dispatch(actions.initStopPlayback());
  };

  const votingHandler = () => {
    if (mixId) {
      dispatch(actions.initGetVotingTrack());
      navigation.navigate('VotingScreen');
    } else {
      Alert.alert(
        'Não há nada aqui!',
        'Escolha um Mix ou crie o seu para votar!',
      );
    }
  };

  const handleAddTracks = () => {
    if (!profile || profile.length <= 0) {
      navigation.navigate('StreamingProfileScreen');
    } else {
      if (mixId && mixId > 0) {
        navigation.navigate('AddTracksToMixScreen');
      } else {
        Alert.alert(
          'Não há nada aqui!',
          'Escolha um Mix ou crie o seu para adicionar músicas!',
        );
      }
    }
  };

  let mixContent = null;

  let playerContent = null;
  let buttonsContent = null;

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
            currTrack={currTrack}
          />
        );
      }
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
        <SecondaryButton
          onPress={() => {
            Alert.alert(
              'Sugestões',
              'Adquira o PREMIUM para sugerir gêneros musicais!',
            );
          }}>
          <Icon name="lightbulb-on" color="#FFF" size={Sizes.huge} />
        </SecondaryButton>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={votingHandler}>
          <Icon name="thumbs-up-down" color="#FFF" size={Sizes.huge} />
        </PrimaryButton>
      </View>
      <View style={styles.buttonContainer}>
        <SecondaryButton onPress={handleAddTracks}>
          <Icon name="music-note-plus" color="#FFF" size={Sizes.huge} />
        </SecondaryButton>
      </View>
    </View>
  );

  if (!mixTitle) {
    mixContent = (
      <View style={styles.mainContainer}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.message}>Escolha ou crie um Mix!</Text>
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
    <ScreenWrapper style={styles.mainContainer} navigation={navigation}>
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
    </ScreenWrapper>
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
