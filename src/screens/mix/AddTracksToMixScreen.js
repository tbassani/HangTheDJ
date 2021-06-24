import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ScreenWrapper from '../../components/hoc/ScreenWrapper';
import MixMaker from '../../components/mix/MixMaker';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const AddTracksToMixScreen = props => {
  const ownerId = useSelector(currState => currState.mix.ownerId);
  const mixId = useSelector(currState => currState.mix.mixId);
  const mixTitle = useSelector(currState => currState.mix.mixTitle);

  const dispatch = useDispatch();

  const navigation = props.navigation;
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.replace('MixScreen')}>
            <Icon name="arrow-left" color={Colors.light} size={Sizes.huge} />
          </TouchableOpacity>
        );
      },
      headerRight: () => {
        return <View style={styles.backButtonContainer}></View>;
      },
    });
  }, [navigation]);

  return (
    <ScreenWrapper style={styles.mainContainer}>
      <MixMaker
        firstTabTitle="Escolha"
        secondTabTitle="Seu Mix"
        addTracks
        onAddTracksToMix={() => {
          props.navigation.goBack();
          dispatch(actions.initGetMix(mixId, mixTitle, ownerId));
        }}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.dark,
  },
  backButtonContainer: {
    margin: Sizes.tiny,
  },
});

export default AddTracksToMixScreen;
