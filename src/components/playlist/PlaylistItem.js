import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';

import Sizes from '../../constants/Sizes';

const PlaylistItem = props => {
  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={props.selectPlaylist}>
      <View style={styles.playlistContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: props.imgSource}} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: Sizes.min,
  },
  playlistContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    flex: 1,
    fontSize: Sizes.large,
    color: '#FFF',
  },
  imageContainer: {
    margin: Sizes.tiny,
  },
  image: {
    width: Sizes.max * 2,
    height: Sizes.max * 2,
  },
});

export default PlaylistItem;
