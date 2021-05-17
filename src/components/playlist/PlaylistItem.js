import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Sizes from '../../constants/Sizes';

const PlaylistItem = props => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.playlistContainer}
        onPress={props.onSelectPlaylist}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: props.imgSource}} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {props.onRemovePlaylist ? (
        <TouchableOpacity
          style={styles.removeContainer}
          onPress={props.onRemovePlaylist}>
          <Icon name="delete-circle" color="red" size={Sizes.huge} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
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
  removeContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlaylistItem;
