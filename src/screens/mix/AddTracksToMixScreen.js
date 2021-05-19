import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ScreenWrapper from '../../components/hoc/ScreenWrapper';
import MixMaker from '../../components/mix/MixMaker';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const AddTracksToMixScreen = props => {
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
    const unsubscribe = navigation.addListener('blur', () => {
      navigation.replace('MixScreen');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScreenWrapper>
      <View style={styles.mainContainer}>
        <MixMaker firstTabTitle="Escolha" secondTabTitle="Seu Mix" addTracks />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  backButtonContainer: {
    margin: Sizes.tiny,
  },
});

export default AddTracksToMixScreen;
