import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomModal from '../../components/UI/CustomModal';
import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';
import CurrentTrack from '../../components/ranking/CurrentTrack';
import TrackRanking from '../../components/ranking/TrackRanking';
import Player from '../../components/player/Player';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const RankingScreen = props => {
  const [shareModal, setShareModal] = useState(false);

  const mixId = useSelector(currState => currState.ranking.mixId);
  const ownerId = useSelector(currState => currState.ranking.ownerId);
  const mixTitle = useSelector(currState => currState.ranking.mixTitle);
  const tracks = useSelector(currState => currState.ranking.tracks);
  const topTracks = useSelector(currState => currState.ranking.topTracks);
  const loading = useSelector(currState => currState.ranking.loading);

  const userId = useSelector(currState => currState.auth.userId);

  //Show Mix Title on screen header
  //Add dhare button to top right corner
  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: mixTitle.length > 0 ? mixTitle : 'Tocando',
      headerTitleStyle: {alignSelf: 'center'},
      headerRight: () => {
        return (
          <TouchableOpacity
            style={styles.shareButtonContainer}
            onPress={shareMixHandler}>
            <Icon name="share-variant" color={Colors.light} size={Sizes.huge} />
          </TouchableOpacity>
        );
      },
      headerLeft: () => {
        return <View style={styles.shareButtonContainer}></View>;
      },
    });
  }, [navigation, mixTitle]);

  const shareMixHandler = () => {
    setShareModal(true);
  };
  const copyMixCode = () => {
    setShareModal(false);
    Alert.alert('Código copiado!');
  };

  let playerContent = null;
  if (ownerId === userId) {
    //playerContent = <Player />;
  }

  let rankingContent = (
    <View style={styles.mainContainer}>
      <Text>Escolha ou crie um Mix!</Text>
    </View>
  );

  if (mixId && mixId > 0) {
    rankingContent = (
      <View style={styles.rankingContainer}>
        <TrackRanking />
      </View>
    );
  }

  let buttonsContent = (
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonContainer}>
        <SecondaryButton>
          <Icon name="lightbulb-on" color="#FFF" size={Sizes.huge} />
        </SecondaryButton>
      </View>
      <View style={styles.buttonContainer}>
        <PrimaryButton>
          <Icon name="vote" color="#FFF" size={Sizes.huge} />
        </PrimaryButton>
      </View>
      <View style={styles.buttonContainer}>
        <SecondaryButton>
          <Icon name="music-note-plus" color="#FFF" size={Sizes.huge} />
        </SecondaryButton>
      </View>
    </View>
  );

  let topContent = (
    <View style={styles.topContainer}>
      <View style={styles.currTrackContainer}>
        <CurrentTrack />
      </View>
      <View style={styles.playerContainer}>
        <Player />
      </View>
    </View>
  );

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
      {topContent}
      {rankingContent}
      <View style={styles.bottomContainer}>{buttonsContent}</View>

      {/* 

        //If there is no Mix, direct the user to se main screen
        
        //Check if it is owner to display player controls
        //Ranking
          //Search input
          //Tracks

        //Suggestion, Vote and Add tracks Buttons
      */}
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  topContainer: {
    flex: 0.3,
  },
  rankingContainer: {
    flex: 0.55,
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
    flex: 0.3,
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
    flex: 0.75,
  },
  playerContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default RankingScreen;
