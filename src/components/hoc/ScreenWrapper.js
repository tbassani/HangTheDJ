import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

const ScreenWrapper = props => {
  return (
    <SafeAreaView style={styles.wrapperContainer}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
});

export default ScreenWrapper;
