import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    borderRadius: Dimensions.get('window').width * 0.05,
    elevation: 5,
    backgroundColor: Colors.shadow,
  },
});

export default Card;
