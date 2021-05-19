import {put} from 'redux-saga/effects';

import * as actions from '../actions';

import MixTrack from '../../models/MixTrack';
import Mix from '../../models/Mix';

import {searchRankingTracksService} from '../../services/ranking';

export function* initGetRankingTracksSaga(action) {
  yield put(actions.startGetRankingTracks());
  const response = yield searchRankingTracksService(
    action.mixId,
    action.query,
    action.cancelToken,
  );
  if (response && response !== 401) {
    console.log(response);
    //yield put(actions.getRankingTracks());
  } else {
    if (response === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getRankingTracksFail());
    }
  }
}

export function* initGetRankingSaga(action) {
  yield put(actions.startGetRanking());

  const response = yield searchRankingTracksService(
    action.mixId,
    '',
    undefined,
  );
  const rankingTracks = [];

  if (response && response !== 401) {
    response.forEach(track => {
      rankingTracks.push(
        new MixTrack(
          track.id,
          track.external_track_id,
          track.playlist_id,
          track.user_id,
          track.track_name,
          track.artist_name,
          track.album_name,
          track.album_art,
          track.genre,
          track.score,
          track.was_played,
          track.duration,
        ),
      );
    });

    yield put(
      actions.getRanking(
        new Mix(
          action.mixId,
          action.mixTitle,
          action.ownerId,
          rankingTracks,
          [],
          null,
          null,
        ),
      ),
    );
  } else {
    if (response === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getRankingTracksFail());
    }
  }
}
