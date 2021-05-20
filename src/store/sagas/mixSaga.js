import {put, select} from 'redux-saga/effects';

import * as actions from '../actions';

import MixTrack from '../../models/MixTrack';
import Mix from '../../models/Mix';

import {
  searchRankingTracksService,
  addTracksService,
  getNextTrackService,
  getPlayingTrackService,
  getVotingTrackService,
  getTrackToVoteService,
  upvoteService,
  downvoteService,
} from '../../services/mix';

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
  if (response && !response.error) {
    yield put(actions.addTracksToMix());
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.resetPasswordFail());
    }
  }
}

export function* initGetCurrentTrackSaga(action) {
  yield put(actions.startGetCurrentTrack());
  let response = yield getPlayingTrackService(action.mixId);
  if (!response.id) {
    //No track playing
    response = yield getNextTrackService(action.mixId);
  }
  if (response && !response.error) {
    const track = yield new MixTrack(
      response.id,
      response.external_track_id,
      response.playlist_id,
      response.user_id,
      response.track_name,
      response.artist_name,
      response.album_name,
      response.album_art,
      response.genre,
      response.score,
      response.was_played,
      response.duration,
    );
    yield put(actions.getCurrentTrack(track));
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getCurrentTrackFail());
    }
  }
  //if stopped and time < duration
  ////user paused on Spotify
  //else
  ////get next track of ranking
}

export function* initGetVotingTrackSaga(action) {
  yield put(actions.startGetVotingTrack());
  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);
  let response;
  if (!action.trackId) {
    response = yield getVotingTrackService(mixId);
  } else {
    let aux = yield getTrackToVoteService(action.trackId, mixId);
    response = aux[0];
  }

  if (response && !response.error) {
    const track = yield new MixTrack(
      response.id,
      response.external_track_id,
      response.playlist_id,
      response.user_id,
      response.track_name,
      response.artist_name,
      response.album_name,
      response.album_art,
      response.genre,
      response.score,
      response.was_played,
      response.duration,
    );
    yield put(actions.getVotingTrack(track));
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getVotingTrackFail());
    }
  }
}

export function* initUpvoteSaga(action) {
  yield put(actions.startUpvote());
  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);
  let response = yield upvoteService(mixId, action.trackId);
  if (response && !response.error) {
    yield put(actions.upvote());
    yield put(actions.initGetVotingTrack());
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.upvoteFail());
    }
  }
}

export function* initDownvoteSaga(action) {
  yield put(actions.startDownvote());
  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);
  let response = yield downvoteService(mixId, action.trackId);
  if (response && !response.error) {
    yield put(actions.downvote());
    yield put(actions.initGetVotingTrack());
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.upvoteFail());
    }
  }
}
