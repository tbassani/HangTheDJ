import React, {useReducer, useEffect} from 'react';
import {View, Text, TextInput, Dimensions, StyleSheet} from 'react-native';

import Sizes from '../../constants/Sizes';
import Colors from '../../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';
const INPUT_CLEAR = 'INPUT_CLEAR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    case INPUT_CLEAR:
      return {
        ...state,
        value: '',
      };

    default:
      return state;
  }
};

const Input = props => {
  const [inputState, inputDispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValidity,
    touched: false,
  });

  const {onInputChange, id, clearAfterSubmit} = props;

  useEffect(() => {
    if (clearAfterSubmit) {
      inputDispatch({type: INPUT_CLEAR});
    }
  }, [onInputChange, clearAfterSubmit]);

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);
  const lostFocusHandler = () => {
    inputDispatch({type: INPUT_BLUR});
  };

  const textChangeHandler = text => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    inputDispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
  };
  return (
    <View style={styles.inputContainer}>
      {/* <Text style={styles.label}>{props.label}</Text> */}
      <TextInput
        {...props}
        placeholderTextColor={Colors.textPlaceholder}
        style={styles.input}
        value={inputState.value}
        onChangeText={text => {
          textChangeHandler(text);
        }}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    margin: Sizes.tiny,
  },
  label: {
    fontWeight: 'bold',
    marginVertical: '3%',
  },
  input: {
    paddingHorizontal: '1%',
    paddingVertical: '2%',
    backgroundColor: Colors.light,
    borderRadius: Sizes.large,
    fontSize: Sizes.medium,
    textAlign: 'center',
    color: Colors.textDefault,
  },
  errorContainer: {
    marginVertical: '2%',
  },
  errorText: {
    color: Colors.highlight,
    fontSize: Sizes.medium,
    textAlign: 'center',
  },
});

export default Input;
