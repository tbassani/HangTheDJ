import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';

import LoadingSpinner from '../components/UI/LoadingSpinner';
import Colors from '../constants/Colors';

import ScreenWrapper from '../components/hoc/ScreenWrapper';

const LoadingScreen = props => {
  const profile = useSelector(currState => currState.app.profile);

  const navigation = props.navigation;

  useEffect(() => {
    if (profile) {
      navigation.navigate('UserMixesNavigator', {
        screen: 'UserMixesScreen',
      });
    }
  }, [profile, navigation]);

  return (
    <ScreenWrapper style={styles.mainContainer} navigation={props.navigation}>
      <LoadingSpinner size="large" />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
