import React from 'react';
import {View, StyleSheet} from 'react-native';

import ScreenWrapper from '../../components/hoc/ScreenWrapper';
import MixMaker from '../../components/mix/MixMaker';

const CreateMixScreen = props => {
  return (
    <ScreenWrapper>
      <View style={styles.mainContainer}>
        <MixMaker
          firstTabTitle="Portifólio"
          secondTabTitle="Seu Mix"
          onCreateMix={() => props.navigation.navigate('RankingNavigator')}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default CreateMixScreen;
