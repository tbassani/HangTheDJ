import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '../UI/Card';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const TrackBallot = props => {
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
        <View style={styles.trackContainer}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: props.track.artURL}} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{props.track.title}</Text>
            </View>
            <View style={styles.artistsContainer}>
              <Text style={styles.artists}>{props.track.artists}</Text>
            </View>
            <View style={styles.genreContainer}>
              <Text style={styles.genre}>{props.track.genre}</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  }
  return <View style={styles.mainCointainer}>{trackContent}</View>;
};

const styles = StyleSheet.create({
  mainCointainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: Sizes.medium,
  },
  trackContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    padding: Sizes.medium,
  },
  infoContainer: {
    flex: 0.25,
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
  genreContainer: {
    flex: 1,
  },
  genre: {
    color: Colors.textDefault,
    textAlign: 'center',
    fontSize: Sizes.small,
  },
  imageContainer: {
    flex: 0.75,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Sizes.max * 7,
    width: Sizes.max * 7,
    borderRadius: Sizes.max * 7,
  },
});

export default TrackBallot;
