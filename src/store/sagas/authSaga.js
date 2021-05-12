import {put} from 'redux-saga/effects';

import * as actions from '../actions';

import {
  loginService,
  signUpService,
  registerService,
  resetPasswordService,
  forgotPasswordService,
} from '../../services/auth';

import {
  saveDataToStorage,
  removeDataToStorage,
  getdataFromStorage,
} from '../../services/storage';

export function* initLoginSaga(action) {
  yield put(actions.startAuth());
  const response = yield loginService(action.email, action.password);
  console.log(response);
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
  const response = yield signUpUser(action.email, action.password);
  let user = {};
  if (response) {
    user = {...response.data};
  }
  if (user.email) {
    const expirationDate = new Date(
      new Date().getTime() + parseInt(user.expiresIn) * 1000,
    );
    yield saveDataToStorage(user.localId, user.idToken, expirationDate);
    yield put(actions.authenticate(user.localId, user.idToken));
  } else {
    yield put(actions.authFail());
  }
}

export function* initRegisterSaga(action) {}

export function* initLogoutSaga(action) {
  yield put(actions.startAuth());
  yield removeDataToStorage();
  yield put(actions.logout());
}

export function* initForgotPasswordSaga(action) {}

export function* initResetPasswordSaga(action) {}
