import React from 'react';
import {View, StyleSheet} from 'react-native';

import ScreenWrapper from '../../components/hoc/ScreenWrapper';
import MixMaker from '../../components/mix/MixMaker';

import Colors from '../../constants/Colors';

const CreateMixScreen = props => {
  return (
    <ScreenWrapper style={styles.mainContainer} navigation={props.navigation}>
      <MixMaker
        firstTabTitle="Portifólio"
        secondTabTitle="Seu Mix"
        onCreateMix={() => props.navigation.navigate('RankingNavigator')}
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
});

export default CreateMixScreen;
