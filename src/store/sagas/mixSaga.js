import {put, select} from 'redux-saga/effects';

import * as actions from '../actions';

import MixTrack from '../../models/MixTrack';
import Mix from '../../models/Mix';

import {searchRankingTracksService, addTracksService} from '../../services/mix';

export function* initGetRankingTracksSaga(action) {
  yield put(actions.startGetRankingTracks());
  const response = yield searchRankingTracksService(
    action.mixId,
    action.query,
    action.cancelToken,
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
    yield put(actions.getRankingTracks(rankingTracks));
  } else {
    if (response === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getRankingTracksFail());
    }
  }
}

export function* initGetRankingSaga(action) {
  console.log('GET RANKING');
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

export function* initAddTracksToMixSaga(action) {
  yield put(actions.startAddTracksToMix());
  const newMixSelector = state => state.app.newMix;
  const mix = yield select(newMixSelector);
  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);
  const mixTitleSelector = state => state.mix.mixTitle;
  const mixTitle = yield select(mixTitleSelector);
  const ownerIdSelector = state => state.mix.ownerId;
  const ownerId = yield select(ownerIdSelector);
  const selectedTracks = [];
  const selectedPlaylists = [];

  mix.tracks.forEach(track => {
    selectedTracks.push(track.id);
  });
  mix.playlists.forEach(playlist => {
    selectedPlaylists.push(playlist.id);
  });
  const response = yield addTracksService(
    selectedPlaylists,
    selectedTracks,
    mixId,
  );
  console.log(response);
  if (response && !response.error) {
    yield put(actions.addTracksToMix());
    //yield put(actions.initGetRanking(mixId, mixTitle, ownerId));
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.resetPasswordFail());
    }
  }
}
