import * as actionTypes from './actionTypes';

export const initLogin = (email, password) => {
  return {
    type: actionTypes.INIT_LOGIN,
    email: email,
    password: password,
  };
};
export const login = user => {
  return {
    type: actionTypes.LOGIN,
    user: user,
  };
};

export const initSignUp = email => {
  return {
    type: actionTypes.INIT_SIGNUP,
    email: email,
  };
};

export const signUp = email => {
  return {
    type: actionTypes.SIGNUP,
    email: email,
  };
};

export const initRegister = (code, email, password) => {
  return {
    type: actionTypes.INIT_REGISTER,
    code: code,
    email: email,
    password: password,
  };
};
export const register = (code, email, password) => {
  return {
    type: actionTypes.REGISTER,
    code: code,
    email: email,
    password: password,
  };
};

export const startAuth = () => {
  return {
    type: actionTypes.START_AUTH,
  };
};

export const authFail = () => {
  return {
    type: actionTypes.AUTH_FAIL,
  };
};

export const authenticate = (userId, token) => {
  return {
    type: actionTypes.AUTHENTICATE,
    userId: userId,
    token: token,
  };
};
export const initLogout = () => {
  return {
    type: actionTypes.INIT_LOGOUT,
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const initForgotPassword = email => {
  return {
    type: actionTypes.INIT_FORGOT_PASSWORD,
    email: email,
  };
};

export const forgotPassword = () => {
  return {
    type: actionTypes.FORGOT_PASSWORD,
  };
};
