import * as actionTypes from '../actions/actionTypes';
import {takeEvery, all} from 'redux-saga/effects';

import {
  initLoginSaga,
  initSignUpSaga,
  initLogoutSaga,
  initRegisterSaga,
  initForgotPasswordSaga,
  initResetPasswordSaga,
} from './authSaga';

import {initGetMixesSaga} from './appSaga';

export function* watchAuth() {
  yield all([takeEvery(actionTypes.INIT_LOGIN, initLoginSaga)]);
  yield all([takeEvery(actionTypes.INIT_SIGNUP, initSignUpSaga)]);
  yield all([takeEvery(actionTypes.INIT_LOGOUT, initLogoutSaga)]);
  yield all([takeEvery(actionTypes.INIT_REGISTER, initRegisterSaga)]);
  yield all([
    takeEvery(actionTypes.INIT_FORGOT_PASSWORD, initForgotPasswordSaga),
  ]);
  yield all([
    takeEvery(actionTypes.INIT_RESET_PASSWORD, initResetPasswordSaga),
  ]);
}

export function* watchApp() {
  yield all([takeEvery(actionTypes.INIT_GET_MIXES, initGetMixesSaga)]);
}
