import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Card from '../UI/Card';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const CurrentTrack = props => {
  let trackContent = (
    <View>
      <Icon name="music-circle-outline" color="#FFF" size={Sizes.max * 7} />
    </View>
  );

  if (props.track) {
    trackContent = (
      <View>
        <Text>TRACK</Text>
      </View>
    );
  }
  return <Card>{trackContent}</Card>;
};

export default CurrentTrack;
