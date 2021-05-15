import React from 'react';
import {View, Text} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../store/actions';

import ScreenWrapper from '../../components/hoc/ScreenWrapper';
import Input from '../../components/UI/Input';
import PrimaryButton from '../../components/UI/PrimaryButton';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const INPUT_UPDATE = 'UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';

import formReducer from '../../shared/formReducer';

const CreateMixScreen = props => {
  return (
    <ScreenWrapper>
      <Text>CREATE MIX</Text>
    </ScreenWrapper>
  );
};

export default CreateMixScreen;
