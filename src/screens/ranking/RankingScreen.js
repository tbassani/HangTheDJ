import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Ranking from '../../components/ranking/Ranking';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const MixScreen = props => {
  const mixId = useSelector(currState => currState.mix.mixId);
  const mixTitle = useSelector(currState => currState.mix.mixTitle);

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

  const selectTrackHandler = () => {
    navigation.replace('VotingScreen');
  };

  let rankingContent = null;

  if (mixId && mixId > 0) {
    rankingContent = (
      <View style={styles.rankingContainer}>
        <Ranking onSelectTrack={selectTrackHandler} />
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
