import React from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Colors from '../../constants/Colors';
import Sizes from '../../constants/Sizes';

const CustomModal = props => {
  return (
    <KeyboardAvoidingView>
      <Modal
        visible={props.show}
        transparent={true}
        animationType={props.animationType}>
        <TouchableWithoutFeedback onPress={props.close}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalTitle}>{props.title}</Text>
          </View>
          {props.children}
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 0.65,
    justifyContent: 'center',
    margin: '5%',
    backgroundColor: Colors.shadow,
    borderRadius: Sizes.huge,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalTitle: {
    textAlign: 'center',
    margin: '5%',
    fontSize: Dimensions.get('window').width * 0.05,
  },
});

export default CustomModal;
