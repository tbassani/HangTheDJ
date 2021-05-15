import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const PlaylistItem = props => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={props.selectPlaylist}>
        <View style={styles.infoContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri: props.imgSource}} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {props.isOwner ? (
        <TouchableOpacity onPress={props.deleteMix}>
          <Icon name="delete" size={Sizes.small} color={Colors.primary} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: Sizes.tiny,
  },
  title: {
    fontSize: Sizes.large,
    color: '#FFF',
  },
  imageContainer: {},
});

export default PlaylistItem;
