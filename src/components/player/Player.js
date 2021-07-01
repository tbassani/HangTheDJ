import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const Player = props => {
  let playerButton = null;
  if (!props.isPlaying && props.currTrack) {
    playerButton = (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={props.onPressPlay}>
        <Icon name="play" color="#FFF" size={Sizes.max * 1.5} />
      </TouchableOpacity>
    );
  } else if (props.isPlaying && props.currTrack) {
    playerButton = (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={props.onPressPause}>
        <Icon name="pause" color="#FFF" size={Sizes.max * 1.5} />
      </TouchableOpacity>
    );
  } else {
    playerButton = (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={props.onPressPlay}>
        <Icon name="refresh" color="#FFF" size={Sizes.max * 1.5} />
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonsContainer}>{playerButton}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    borderRadius: Sizes.huge,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Player;
