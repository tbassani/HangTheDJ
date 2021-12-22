import * as actionTypes from '../actions/actionTypes';
import {all, takeLatest} from 'redux-saga/effects';

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
  initRemoveMixSaga,
} from './appSaga';

import {
  initGetRankingTracksSaga,
  initGetMixSaga,
  initAddTracksToMixSaga,
  initGetCurrentTrackSaga,
  initGetVotingTrackSaga,
  initDownvoteSaga,
  initUpvoteSaga,
  //initBeginPlaybackSaga,
  initStopPlaybackSaga,
  initRemoveTopTracksSaga,
  initGetTopTracksSaga,
  initPlayTrackSaga,
  initPauseTrackSaga,
  initGetUserDevicesSaga,
} from './mixSaga';

export function* watchAuth() {
  yield all([
    takeLatest(actionTypes.INIT_PLAY_TRACK, initPlayTrackSaga),
    takeLatest(actionTypes.INIT_PAUSE_TRACK, initPauseTrackSaga),
    takeLatest(actionTypes.INIT_LOGIN, initLoginSaga),
    takeLatest(actionTypes.INIT_SIGNUP, initSignUpSaga),
    takeLatest(actionTypes.INIT_LOGOUT, initLogoutSaga),
    takeLatest(actionTypes.INIT_REGISTER, initRegisterSaga),
    takeLatest(actionTypes.INIT_FORGOT_PASSWORD, initForgotPasswordSaga),
    takeLatest(actionTypes.INIT_RESET_PASSWORD, initResetPasswordSaga),
  ]);
}

export function* watchApp() {
  yield all([
    takeLatest(actionTypes.INIT_GET_MIXES, initGetMixesSaga),
    takeLatest(actionTypes.INIT_ADD_TO_GROUP, initAddToGroupSaga),
    takeLatest(actionTypes.INIT_GET_PROFILE_URL, initGetActiveProfileSaga),
    takeLatest(actionTypes.INIT_GET_PROFILE, initGetProfileURLSaga),
    takeLatest(actionTypes.INIT_RESET_PASSWORD, initResetPasswordSaga),
    takeLatest(
      actionTypes.INIT_GET_TRACKS_AND_PLAYLISTS,
      initGetTracksAndPlaylistsSaga,
    ),
    takeLatest(actionTypes.INIT_CREATE_MIX, initCreateMixSaga),
    takeLatest(actionTypes.INIT_REMOVE_MIX, initRemoveMixSaga),
  ]);
}

export function* watchMix() {
  yield all([
    takeLatest(actionTypes.INIT_GET_RANKING_TRACKS, initGetRankingTracksSaga),
    takeLatest(actionTypes.INIT_GET_MIX, initGetMixSaga),
    takeLatest(actionTypes.INIT_ADD_TRACKS_TO_MIX, initAddTracksToMixSaga),
    takeLatest(actionTypes.INIT_GET_CURRENT_TRACK, initGetCurrentTrackSaga),
    takeLatest(actionTypes.INIT_GET_VOTING_TRACK, initGetVotingTrackSaga),
    takeLatest(actionTypes.INIT_UPVOTE, initUpvoteSaga),
    takeLatest(actionTypes.INIT_DOWNVOTE, initDownvoteSaga),
    takeLatest(actionTypes.INIT_STOP_PLAYBACK, initStopPlaybackSaga),
    takeLatest(actionTypes.INIT_REMOVE_TOP_TRACKS, initRemoveTopTracksSaga),
    takeLatest(actionTypes.INIT_GET_TOP_TRACKS, initGetTopTracksSaga),
    takeLatest(actionTypes.INIT_GET_DEVICES, initGetUserDevicesSaga),
  ]);
}
