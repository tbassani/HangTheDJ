import React from 'react';
import {
  Modal,
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native';

const CustomModal = props => {
  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 0.4,
    justifyContent: 'center',
    margin: '5%',
    backgroundColor: 'white',
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
