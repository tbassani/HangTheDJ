import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';

import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';

const TextLink = ({onPress, children}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    color: Colors.textDefault,
    fontSize: Sizes.medium,
    fontWeight: '700',
    textDecorationLine: 'underline',
    paddingVertical: Sizes.small,
  },
  button: {
    marginVertical: Sizes.small,
  },
});

export default TextLink;
