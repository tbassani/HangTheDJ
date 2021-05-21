import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';

const RankingTrackItem = props => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.trackContainer}
        onPress={props.onSelectTrack}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: props.imgSource}} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <View style={styles.artistsContainer}>
            <Text style={styles.artists}>{props.artists}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {props.topTrack ? (
        <View style={styles.scoreContainer}>
          <Icon name="star" color={Colors.alternative} size={Sizes.medium} />
        </View>
      ) : (
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{props.score}</Text>
        </View>
      )}
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
    fontSize: Sizes.medium,
    color: Colors.textDefault,
  },
  artists: {
    fontSize: Sizes.small,
    color: Colors.textDefault,
  },
  imageContainer: {
    margin: Sizes.min,
  },
  image: {
    width: Sizes.max * 1.5,
    height: Sizes.max * 1.5,
  },
  scoreContainer: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    color: Colors.textDefault,
  },
});

export default RankingTrackItem;
