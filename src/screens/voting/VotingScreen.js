import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';
import TrackBallot from '../../components/voting/TrackBallot';
import ScreenWrapper from '../../components/hoc/ScreenWrapper';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const VotingScreen = props => {
  const mixTitle = useSelector(currState => currState.mix.mixTitle);
  const votingTrack = useSelector(currState => currState.mix.votingTrack);
  const loading = useSelector(currState => currState.mix.loading);

  const dispatch = useDispatch();

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
  }, [navigation, mixTitle]);

  const upvoteHandler = () => {
    if (votingTrack) {
      dispatch(actions.initUpvote(votingTrack.id));
    }
  };

  const downvoteHandler = () => {
    if (votingTrack) {
      dispatch(actions.initDownvote(votingTrack.id));
    }
  };

  let trackBallotContent = <TrackBallot track={votingTrack} />;

  return (
    <ScreenWrapper style={styles.mainContainer}>
      <View style={styles.trackBallotContainer}>{trackBallotContent}</View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={upvoteHandler}>
            <Icon name="thumb-up" color="#FFF" size={Sizes.huge} />
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <SecondaryButton onPress={downvoteHandler}>
            <Icon name="thumb-down" color="#FFF" size={Sizes.huge} />
          </SecondaryButton>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: 'space-between',
  },
  trackBallotContainer: {
    flex: 0.8,
  },
  buttonsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.5,
  },
});

export default VotingScreen;
