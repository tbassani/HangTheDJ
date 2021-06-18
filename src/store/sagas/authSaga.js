import {put} from 'redux-saga/effects';

import * as actions from '../actions';

import {
  loginService,
  signUpService,
  registerService,
  resetPasswordService,
  forgotPasswordService,
} from '../../services/auth';

import {saveDataToStorage, removeDataFromStorage} from '../../services/storage';
import {Alert} from 'react-native';

export function* initLoginSaga(action) {
  yield put(actions.startAuth());
  const response = yield loginService(action.email, action.password);
  let user;
  if (response) {
    user = {
      token: response.jwt,
      userId: response.login_user.id,
      email: response.login_user.email,
    };
    yield saveDataToStorage('token', response.jwt);
    yield saveDataToStorage('email', response.login_user.email);
    yield saveDataToStorage('userId', response.login_user.id.toString());
    yield put(actions.login(user));
  } else {
    yield put(actions.authFail());
  }
}

export function* initSignUpSaga(action) {
  yield put(actions.startAuth());
  const response = yield signUpService(action.email);
  if (response) {
    Alert.alert(
      'Sign up',
      'Um código de verificação foi enviado para o seu email.',
    );
    yield put(actions.signUp(action.email));
  } else {
    yield put(actions.authFail());
  }
}

export function* initRegisterSaga(action) {
  yield put(actions.startAuth());
  const response = yield registerService(
    action.email,
    action.password,
    action.code,
  );
  if (response) {
    yield put(
      actions.register({
        token: response.jwt,
        email: response.register_user.email,
        userId: response.register_user.id,
      }),
    );
    yield saveDataToStorage('token', response.jwt);
    yield saveDataToStorage('email', response.register_user.email);
    yield saveDataToStorage('userId', response.register_user.id.toString());
  } else {
    yield put(actions.authFail());
  }
}

export function* initLogoutSaga(action) {
  yield put(actions.startAuth());
  yield removeDataFromStorage('token');
  yield removeDataFromStorage('userId');
  yield removeDataFromStorage('ownerId');
  yield removeDataFromStorage('mixId');
  yield removeDataFromStorage('email');
  yield put(actions.logout());
}

export function* initForgotPasswordSaga(action) {
  yield put(actions.startAuth());
  const response = yield forgotPasswordService(action.email);
  if (response) {
    yield Alert.alert(
      'Recuperar Senha',
      'Uma nova senha foi enviada para o seu email',
    );
    yield put(actions.forgotPassword());
  }
}
