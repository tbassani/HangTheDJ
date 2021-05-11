import {Dimensions} from 'react-native';

export default {
  min: Dimensions.get('window').width * 0.01,
  tiny: Dimensions.get('window').width * 0.02,
  small: Dimensions.get('window').width * 0.03,
  medium: Dimensions.get('window').width * 0.04,
  large: Dimensions.get('window').width * 0.06,
  huge: Dimensions.get('window').width * 0.08,
  max: Dimensions.get('window').width * 0.1,
};
