import React, {useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const VotingScreen = props => {
  const mixTitle = useSelector(currState => currState.ranking.mixTitle);
  const votingTrack = useSelector(currState => currState.ranking.votingTrack);

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
    const unsubscribe = navigation.addListener('blur', () => {
      navigation.replace('MixScreen');
    });

    return unsubscribe;
  });

  return (
    <View style={styles.mainContainer}>
      <Text>Voting Screen</Text>
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
  bottomContainer: {
    flex: 0.2,
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
});

export default VotingScreen;
