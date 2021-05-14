import * as actionTypes from './actionTypes';

export const initGetMixes = () => {
  return {
    type: actionTypes.INIT_GET_MIXES,
  };
};

export const startGetMixes = () => {
  return {
    type: actionTypes.START_GET_MIXES,
  };
};

export const getMixes = mixes => {
  return {
    type: actionTypes.GET_MIXES,
    mixes: mixes,
  };
};

export const getMixesFail = () => {
  return {
    type: actionTypes.GET_MIXES_FAIL,
  };
};

export const initAddToGroup = mixId => {
  return {
    type: actionTypes.INIT_ADD_TO_GROUP,
    mixId: mixId,
  };
};

export const startAddToGroup = () => {
  return {
    type: actionTypes.START_ADD_TO_GROUP,
  };
};

export const addToGroup = mix => {
  return {
    type: actionTypes.ADD_TO_GROUP,
    mix: mix,
  };
};

export const addToGroupFail = () => {
  return {
    type: actionTypes.ADD_TO_GROUP_FAIL,
  };
};
