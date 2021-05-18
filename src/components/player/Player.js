import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const Player = props => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonsContainer}>
        {!props.isPLaying ? (
          <TouchableOpacity style={styles.buttonContainer}>
            <Icon name="play" color="#FFF" size={Sizes.max * 1.2} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.buttonContainer}>
            <Icon name="pause" color="#FFF" size={Sizes.max * 1.2} />
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
