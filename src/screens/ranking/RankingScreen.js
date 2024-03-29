import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Ranking from '../../components/ranking/Ranking';
import ScreenWrapper from '../../components/hoc/ScreenWrapper';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const MixScreen = props => {
  const mixId = useSelector(currState => currState.mix.mixId);
  const mixTitle = useSelector(currState => currState.mix.mixTitle);
  const ownerId = useSelector(currState => currState.mix.ownerId);

  const dispatch = useDispatch();

  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: mixTitle && mixTitle.length > 0 ? mixTitle : 'Ranking',
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
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(actions.initGetMix(mixId, mixTitle, ownerId));
    });

    return unsubscribe;
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

  return (
    <ScreenWrapper style={styles.mainContainer} navigation={props.navigation}>
      {rankingContent}
    </ScreenWrapper>
  );
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
