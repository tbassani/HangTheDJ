import * as actionTypes from '../actions/actionTypes';
import {takeEvery, all} from 'redux-saga/effects';

import {
  initLoginSaga,
  initSignUpSaga,
  initLogoutSaga,
  initRegisterSaga,
  initForgotPasswordSaga,
} from './authSaga';

import {
  initGetMixesSaga,
  initAddToGroupSaga,
  initGetProfileURLSaga,
  initGetActiveProfileSaga,
  initResetPasswordSaga,
  initGetTracksAndPlaylistsSaga,
  initCreateMixSaga,
} from './appSaga';

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
  yield all([takeEvery(actionTypes.INIT_ADD_TO_GROUP, initAddToGroupSaga)]);
  yield all([
    takeEvery(actionTypes.INIT_GET_PROFILE_URL, initGetActiveProfileSaga),
  ]);
  yield all([takeEvery(actionTypes.INIT_GET_PROFILE, initGetProfileURLSaga)]);
  yield all([
    takeEvery(actionTypes.INIT_RESET_PASSWORD, initResetPasswordSaga),
  ]);
  yield all([
    takeEvery(
      actionTypes.INIT_GET_TRACKS_AND_PLAYLISTS,
      initGetTracksAndPlaylistsSaga,
    ),
  ]);
  yield all([takeEvery(actionTypes.INIT_CREATE_MIX, initCreateMixSaga)]);
}
