import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import MixPicker from '../../views/MixPicker';
import YourMix from '../../views/YourMix';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const MixMaker = props => {
  const [selected, setSelected] = useState('first');
  const selectFirst = () => {
    setSelected('first');
  };
  const selectSecond = () => {
    setSelected('second');
  };

  let content = <MixPicker />;

  if (selected === 'second') {
    content = <YourMix />;
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={selectFirst}>
          <View
            style={[
              styles.tab,
              selected === 'first' ? styles.selectedTab : null,
            ]}>
            <Text style={styles.tabTitle}>{props.firstTabTitle}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={selectSecond}>
          <View
            style={[
              styles.tab,
              selected === 'second' ? styles.selectedTab : null,
            ]}>
            <Text style={styles.tabTitle}>{props.secondTabTitle}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={[styles.contentContainer, styles.selectedContent]}>
        {content}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  tabsContainer: {
    flex: 0.09,
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: Sizes.small,
  },
  tab: {
    borderTopRightRadius: Sizes.medium,
    borderTopLeftRadius: Sizes.medium,
    backgroundColor: Colors.dark,
    padding: Sizes.small,
  },
  tabTitle: {
    color: Colors.textDefault,
    fontSize: Sizes.medium,
  },
  selectedTab: {
    backgroundColor: Colors.shadow,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  selectedContent: {
    backgroundColor: Colors.shadow,
  },
});

export default MixMaker;
