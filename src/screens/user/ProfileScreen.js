import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

const ProfileScreen = props => {
  return (
    <View style={styles.mainContainer}>
      <Text>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
});

export default ProfileScreen;
