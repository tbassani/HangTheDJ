import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '../UI/Card';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const CurrentTrack = props => {
  let trackContent = (
    <Card>
      <View style={styles.trackContainer}>
        <View style={styles.imageContainer}>
          <Icon
            name="music-circle-outline"
            color={Colors.light}
            size={Sizes.max * 5.5}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Aguarde</Text>
          </View>
          <View style={styles.artistsContainer}>
            <Text style={styles.artists}>Estamos buscando a música certa!</Text>
          </View>
          <View style={styles.genreContainer}>
            <Text style={styles.genre}>
              Certifique-se que seu serviço de streaming está online e
              funcionando!
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );

  if (props.track && props.track.title) {
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
    alignItems: 'flex-start',
    marginTop: Sizes.small,
  },
  trackContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    padding: Sizes.medium,
  },
  infoContainer: {
    flex: 0.3,
    justifyContent: 'space-evenly',
  },
  titleContainer: {
    flex: 0.35,
  },
  title: {
    color: Colors.textDefault,
    textAlign: 'center',
    fontSize: Sizes.medium,
  },
  artistsContainer: {
    flex: 0.35,
  },
  artists: {
    color: Colors.textDefault,
    textAlign: 'center',
    fontSize: Sizes.medium,
  },
  genreContainer: {
    flex: 0.3,
  },
  genre: {
    color: Colors.textDefault,
    textAlign: 'center',
    fontSize: Sizes.small,
  },
  imageContainer: {
    flex: 0.7,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Sizes.max * 5.5,
    width: Sizes.max * 5.5,
    borderRadius: Sizes.max * 5.5,
  },
});

export default CurrentTrack;
