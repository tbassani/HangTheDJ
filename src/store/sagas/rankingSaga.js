import {put} from 'redux-saga/effects';

import * as actions from '../actions';

import {searchRankingTracksService} from '../../services/ranking';

export function* initGetRankingTracksSaga(action) {
  yield put(actions.startGetRankingTracks());
  const response = yield searchRankingTracksService(
    action.mixId,
    action.query,
    action.cancelToken,
    actions.logout,
  );
  if (response) {
    console.log(response);
    //yield put(actions.getRankingTracks());
  } else {
    yield put(actions.getRankingTracksFail());
  }
}
