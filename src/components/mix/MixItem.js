import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Sizes from '../../constants/Sizes';

const PlaylistItem = props => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.mixContainer} onPress={props.onSelectMix}>
        <Icon name="music-box-multiple" size={Sizes.max * 2} color={'#FFF'} />
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {props.isOwner ? (
        <TouchableOpacity
          style={styles.removeContainer}
          onPress={props.onRemoveMix}>
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
  mixContainer: {
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
