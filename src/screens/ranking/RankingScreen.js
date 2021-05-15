import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const RankingScreen = props => {
  return (
    <View style={styles.mainContainer}>
      <Text>RANKING</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
});
export default RankingScreen;
