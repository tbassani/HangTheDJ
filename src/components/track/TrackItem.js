import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Sizes from '../../constants/Sizes';

const TrackItem = props => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.trackContainer}
        onPress={props.onSelectTrack}>
        <View
          style={
            !props.small ? styles.imageContainer : styles.imageContainerSmall
          }>
          <Image
            style={!props.small ? styles.image : styles.imageSmall}
            source={{uri: props.imgSource}}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={!props.small ? styles.title : styles.titleSmall}>
              {props.title}
            </Text>
          </View>
          <View style={styles.artistsContainer}>
            <Text style={!props.small ? styles.artists : styles.artistsSmall}>
              {props.artists}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {props.onRemoveTrack ? (
        <TouchableOpacity
          style={styles.removeContainer}
          onPress={props.onRemoveTrack}>
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
  trackContainer: {
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
  artists: {
    fontSize: Sizes.medium,
    color: '#FFF',
  },
  imageContainer: {
    margin: Sizes.tiny,
  },
  image: {
    width: Sizes.max * 2,
    height: Sizes.max * 2,
  },
  titleSmall: {
    flex: 1,
    fontSize: Sizes.medium,
    color: '#FFF',
  },
  artistsSmall: {
    fontSize: Sizes.small,
    color: '#FFF',
  },
  imageContainerSmall: {
    margin: Sizes.min,
  },
  imageSmall: {
    width: Sizes.max * 1.5,
    height: Sizes.max * 1.5,
  },
  removeContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TrackItem;
