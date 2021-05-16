import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const RadioButtons = props => {
  const renderButton = () => {};

  return (
    <View style={styles.mainContainer}>
      {props.options.map(item => {
        return (
          <View key={item.key} style={styles.buttonContainer}>
            <Text style={styles.text}>{item.text}</Text>
            <TouchableOpacity
              style={styles.circle}
              onPress={() => {
                props.onSelect(item);
              }}>
              {props.selectedOption &&
                props.selectedOption.key === item.key && (
                  <View style={styles.checkedCircle} />
                )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Sizes.small,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
  },
  text: {
    color: Colors.textDefault,
    marginHorizontal: Sizes.small,
  },
});

export default RadioButtons;
