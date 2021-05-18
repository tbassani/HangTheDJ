import {put} from 'redux-saga/effects';

import * as actions from '../actions';

import RankingTrack from '../../models/RankingTrack';
import Ranking from '../../models/Ranking';

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

export function* initGetRankingSaga(action) {
  yield put(actions.startGetRanking());

  const response = yield searchRankingTracksService(
    action.mixId,
    '',
    undefined,
    actions.logout,
  );
  const rankingTracks = [];

  if (response) {
    response.forEach(track => {
      rankingTracks.push(
        new RankingTrack(
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
        new Ranking(
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
    yield put(actions.getRankingTracksFail());
  }
}
