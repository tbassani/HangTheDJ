import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomModal from '../../components/UI/CustomModal';
import PrimaryButton from '../../components/UI/PrimaryButton';
import CurrentTrack from '../../components/ranking/CurrentTrack';
import TrackRanking from '../../components/ranking/TrackRanking';
//import Player from '../../components/player/Player';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const RankingScreen = props => {
  const [shareModal, setShareModal] = useState(false);

  const mixId = useSelector(currState => currState.ranking.mixId);
  const ownerId = useSelector(currState => currState.ranking.ownerId);
  const mixTitle = useSelector(currState => currState.ranking.mixTitle);
  const tracks = useSelector(currState => currState.ranking.tracks);
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
  }, [navigation]);

  const shareMixHandler = () => {
    setShareModal(true);
  };
  const copyMixCode = () => {
    setShareModal(false);
    Alert.alert('Código copiado!');
  };

  let rankingContent = <Text>Escolha ou crie um Mix!</Text>;
  if (mixId && mixId.length > 0) {
    rankingContent = <TrackRanking />;
  }
  let playerContent = null;
  if (ownerId === userId) {
    //playerContent = <Player />;
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
      <Text>RANKING</Text>
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
});
export default RankingScreen;
