import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../store/actions';

import Input from '../components/UI/Input';
import PrimaryButton from '../components/UI/PrimaryButton';

import Colors from '../constants/Colors';
import Sizes from '../constants/Sizes';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

import formReducer from '../shared/formReducer';

const YourMix = props => {
  return (
    <View style={styles.mainContainer}>
      <PrimaryButton>Mixar!</PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
export default YourMix;
