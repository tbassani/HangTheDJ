import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';
import CurrentTrack from '../../components/ranking/CurrentTrack';
import Ranking from '../../components/ranking/Ranking';
import Player from '../../components/player/Player';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const MixScreen = props => {
  const [shareModal, setShareModal] = useState(false);

  const mixId = useSelector(currState => currState.ranking.mixId);
  const ownerId = useSelector(currState => currState.ranking.ownerId);
  const mixTitle = useSelector(currState => currState.ranking.mixTitle);
  const tracks = useSelector(currState => currState.ranking.tracks);
  const topTracks = useSelector(currState => currState.ranking.topTracks);
  const loading = useSelector(currState => currState.ranking.loading);

  const userId = useSelector(currState => currState.auth.userId);

  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: mixTitle.length > 0 ? mixTitle : 'Ranking',
      headerTitleStyle: {alignSelf: 'center'},
      headerRight: mixTitle
        ? () => {
            return <View></View>;
          }
        : () => {},
      headerLeft: mixTitle
        ? () => {
            return (
              <TouchableOpacity
                style={styles.backButtonContainer}
                onPress={() => navigation.replace('MixScreen')}>
                <Icon
                  name="arrow-left"
                  color={Colors.light}
                  size={Sizes.huge}
                />
              </TouchableOpacity>
            );
          }
        : () => {},
    });
  }, [navigation, mixTitle]);

  let rankingContent = null;

  if (mixId && mixId > 0) {
    rankingContent = (
      <View style={styles.rankingContainer}>
        <Ranking />
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

  return <View style={styles.mainContainer}>{rankingContent}</View>;
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  rankingContainer: {
    flex: 1,
  },
});
export default MixScreen;
