import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const CurrentTrack = props => {
  return (
    <View style={styles.trackContainer}>
      {props.artURL ? (
        <Image
          style={styles.thumbnail}
          source={{
            uri: props.artURL,
          }}
        />
      ) : (
        <View />
      )}

      <View style={styles.trackInfo}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.artists}>{props.artists}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trackContainer: {
    flex: 1,
    margin: Sizes.min,
  },
  trackInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: Sizes.large,
    color: Colors.textDefault,
    flexWrap: 'wrap',
  },
  artists: {
    fontSize: Sizes.medium,
    color: Colors.textDefault,
    flexWrap: 'wrap',
  },
});

export default CurrentTrack;
