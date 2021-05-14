import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const MixItem = props => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={props.selectMix}>
        <View style={styles.infoContainer}>
          <Icon
            name="music-box-multiple"
            size={Sizes.medium}
            color={Colors.light}
          />
          <Text style={styles.title}>{props.title}</Text>
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
    flexDirection: 'row',
    width: '100%',
  },
  infoContainer: {
    flex: 0.8,
  },
  title: {
    flex: 0.2,
  },
});

export default MixItem;
