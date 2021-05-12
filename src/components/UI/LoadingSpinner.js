import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

const LoadingSpinner = props => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator {...props} color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark,
  },
});

export default LoadingSpinner;
