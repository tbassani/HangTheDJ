import React from 'react';
import {View, StyleSheet} from 'react-native';

import LoadingSpinner from '../components/UI/LoadingSpinner';
import Colors from '../constants/Colors';

const LoadingScreen = props => {
  return (
    <View style={styles.mainContainer}>
      <LoadingSpinner size="large" />
    </View>
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
