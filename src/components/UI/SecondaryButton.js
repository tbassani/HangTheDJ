import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const SecondaryButton = ({onPress, children}) => {
  const {button, text} = styles;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity onPress={onPress} style={button}>
        <Text style={text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  text: {
    alignSelf: 'center',
    color: Colors.textDefault,
    fontSize: Sizes.medium,
    fontWeight: '700',
    padding: Sizes.small,
  },
  button: {
    flex: 1,
    backgroundColor: Colors.shadow,
    borderRadius: Sizes.large,
    margin: Sizes.tiny,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 5,
  },
};

export default SecondaryButton;
