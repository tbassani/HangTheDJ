import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';
import TrackBallot from '../../components/voting/TrackBallot';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const VotingScreen = props => {
  const mixTitle = useSelector(currState => currState.mix.mixTitle);
  const votingTrack = useSelector(currState => currState.mix.votingTrack);

  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: mixTitle.length > 0 ? mixTitle : 'Votar',
      headerTitleStyle: {alignSelf: 'center'},
      headerRight: mixTitle
        ? () => {
            return <View></View>;
          }
        : () => {},
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.replace('MixScreen')}>
            <Icon name="arrow-left" color={Colors.light} size={Sizes.huge} />
          </TouchableOpacity>
        );
      },
    });
  });

  return (
    <View style={styles.mainContainer}>
      <View style={styles.trackBallotContainer}>
        <TrackBallot track={votingTrack} />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={() => navigation.navigate('VotingScreen')}>
            <Icon name="thumb-up" color="#FFF" size={Sizes.huge} />
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <SecondaryButton
            onPress={() => navigation.navigate('AddTracksToMixScreen')}>
            <Icon name="thumb-down" color="#FFF" size={Sizes.huge} />
          </SecondaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  trackBallotContainer: {
    flex: 0.8,
  },
  buttonsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flex: 0.5,
  },
});

export default VotingScreen;
