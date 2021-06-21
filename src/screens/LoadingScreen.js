import React from 'react';
import {View, StyleSheet} from 'react-native';

import LoadingSpinner from '../components/UI/LoadingSpinner';
import Colors from '../constants/Colors';

import ScreenWrapper from '../components/hoc/ScreenWrapper';

const LoadingScreen = props => {
  return (
    <ScreenWrapper style={styles.mainContainer} navigation={props.navigation}>
      <LoadingSpinner size="large" />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
