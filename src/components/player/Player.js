import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const Player = props => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonsContainer}>
        {!props.isPlaying ? (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={props.onPressPlay}>
            <Icon name="play" color="#FFF" size={Sizes.max * 1.5} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={props.onPressPause}>
            <Icon name="pause" color="#FFF" size={Sizes.max * 1.5} />
          </TouchableOpacity>
        )}
      </View>
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
