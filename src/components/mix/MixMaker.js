import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

import MixPicker from '../../views/MixPicker';
import YourMix from '../../views/YourMix';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const MixMaker = props => {
  const [selected, setSelected] = useState('first');
  const [totalMix, setTotalMix] = useState(0);

  const newMix = useSelector(currState => currState.app.newMix);

  useEffect(() => {
    if (newMix) {
      setTotalMix(newMix.tracks.length + newMix.playlists.length);
    }
  }, [newMix]);

  const selectFirst = () => {
    setSelected('first');
  };
  const selectSecond = () => {
    setSelected('second');
  };

  let content = <MixPicker />;

  if (selected === 'second') {
    content = (
      <YourMix addTracks={props.addTracks} onCreateMix={props.onCreateMix} />
    );
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
            <View style={styles.mixCounterContainer}>
              <Text style={styles.mixCounter}>{totalMix}</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopRightRadius: Sizes.medium,
    borderTopLeftRadius: Sizes.medium,
    backgroundColor: Colors.dark,
    padding: Sizes.small,
  },
  mixCounterContainer: {
    marginHorizontal: Sizes.small,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.alternative,
    borderRadius: Sizes.max,
    height: Sizes.large,
    width: Sizes.large,
  },
  mixCounter: {
    color: '#FFF',
    fontSize: Sizes.tiny,
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
