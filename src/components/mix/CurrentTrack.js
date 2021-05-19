import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '../UI/Card';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const CurrentTrack = props => {
  let trackContent = (
    <Card>
      <Icon
        name="music-circle-outline"
        color={Colors.light}
        size={Sizes.max * 7}
      />
    </Card>
  );

  if (props.track) {
    trackContent = (
      <Card>
        <View style={styles.imageContainer}>
          <Image style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Title style={styles.title}></Title>
          </View>
          <View style={styles.artistsContainer}>
            <Title style={styles.artists}></Title>
          </View>
        </View>
      </Card>
    );
  }
  return (
    <View style={styles.mainCointainer}>
      <View style={styles.trackContainer}>{trackContent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCointainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  infoContainer: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: Colors.textDefault,
    textAlign: 'center',
    fontSize: Sizes.large,
  },
  artistsContainer: {
    flex: 1,
  },
  artists: {
    color: Colors.textDefault,
    textAlign: 'center',
    fontSize: Sizes.medium,
  },
  imageContainer: {
    flex: 1,
    borderRadius: Sizes.max * 7,
    overflow: 'hidden',
  },
  image: {
    height: Sizes.max * 7,
    width: Sizes.max * 7,
  },
});

export default CurrentTrack;
