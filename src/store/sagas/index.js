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
  initRemoveMixSaga,
} from './appSaga';

import {
  initGetRankingTracksSaga,
  initGetRankingSaga,
  initAddTracksToMixSaga,
  initGetCurrentTrackSaga,
  initGetVotingTrackSaga,
  initDownvoteSaga,
  initUpvoteSaga,
  initBeginPlaybackSaga,
  initStopPlaybackSaga,
} from './mixSaga';

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
  yield all([takeEvery(actionTypes.INIT_REMOVE_MIX, initRemoveMixSaga)]);
}

export function* watchMix() {
  yield all([
    takeEvery(actionTypes.INIT_GET_RANKING_TRACKS, initGetRankingTracksSaga),
  ]);
  yield all([takeEvery(actionTypes.INIT_GET_RANKING, initGetRankingSaga)]);
  yield all([
    takeEvery(actionTypes.INIT_ADD_TRACKS_TO_MIX, initAddTracksToMixSaga),
  ]);
  yield all([
    takeEvery(actionTypes.INIT_GET_CURRENT_TRACK, initGetCurrentTrackSaga),
  ]);
  yield all([
    takeEvery(actionTypes.INIT_GET_VOTING_TRACK, initGetVotingTrackSaga),
  ]);
  yield all([takeEvery(actionTypes.INIT_UPVOTE, initUpvoteSaga)]);
  yield all([takeEvery(actionTypes.INIT_DOWNVOTE, initDownvoteSaga)]);
  yield all([
    takeEvery(actionTypes.INIT_BEGIN_PLAYBACK, initBeginPlaybackSaga),
  ]);
  yield all([takeEvery(actionTypes.INIT_STOP_PLAYBACK, initStopPlaybackSaga)]);
}
