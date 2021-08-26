import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const ScreenWrapper = props => {
  return (
    <SafeAreaView style={{...styles.wrapperContainer, ...props.style}}>
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
  },
});

export default ScreenWrapper;
