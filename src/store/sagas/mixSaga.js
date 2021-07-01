import {put, select} from 'redux-saga/effects';

import * as actions from '../actions';

import {
  saveDataToStorage,
  getDataFromStorage,
  removeDataFromStorage,
} from '../../services/storage';

import MixTrack from '../../models/MixTrack';
import Mix from '../../models/Mix';

import MinMixDuration from '../../constants/MinMixDuration';

import {
  searchRankingTracksService,
  addTracksService,
  getNextTrackService,
  getPlayingTrackService,
  getVotingTrackService,
  getTrackToVoteService,
  upvoteService,
  downvoteService,
  pauseTrackService,
  playTrackService,
  removeTracksFromQueueService,
  getTopTracksService,
  getUserDevicesService,
} from '../../services/mix';
import {Alert} from 'react-native';

export function* initGetRankingTracksSaga(action) {
  yield put(actions.startGetRankingTracks());
  const response = yield searchRankingTracksService(
    action.mixId,
    action.query,
    action.cancelToken,
  );
  const rankingTracks = [];

  if (response && !response.error) {
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
export function* initRemoveTopTracksSaga(action) {
  console.log('Remove top tracks saga');
  if (action.ownerId === action.userId) {
    console.log('Remove from queue Service');
    const response = yield removeTracksFromQueueService(action.userId);
    const pauseTrack = yield pauseTrackService();
    yield put(actions.removeTopTracks());
    if (response.error == 401) {
      yield put(actions.initLogout());
    } else if (response.error) {
      yield put(actions.removeTopTracksFail());
    }
  } else {
    yield put(actions.removeTopTracks());
  }
}

export function* initGetMixSaga(action) {
  yield put(actions.startGetMix());
  const response = yield searchRankingTracksService(
    action.mixId,
    '',
    undefined,
  );
  const rankingTracks = [];

  if (response && !response.error) {
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
      actions.getMix(
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
    if (action.mixId && action.mixTitle && action.ownerId) {
      yield saveDataToStorage('mixId', action.mixId.toString());
      yield saveDataToStorage('mixTitle', action.mixTitle.toString());
      yield saveDataToStorage('ownerId', action.ownerId.toString());
    }
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getMixFail());
    }
  }
}

export function* initGetTopTracksSaga(action) {
  yield put(actions.startGetTopTracks());

  const response = yield getTopTracksService(action.mixId);
  const rankingTracks = [];

  if (response && !response.error) {
    yield response.forEach(track => {
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
    yield put(actions.setTopTracks(rankingTracks));
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getTopTracksFail());
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
  const mixOwnerSelector = state => state.mix.ownerId;
  const ownerId = yield select(mixOwnerSelector);

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
    yield put(actions.initGetMix(mixId, mixTitle, ownerId));
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
      yield put(actions.resetPasswordFail());
    }
  }
}

export function* initGetCurrentTrackSaga(action) {
  const mixIdSelector = state => state.mix.mixId;
  const mixId = yield select(mixIdSelector);
  const topTracksSelector = state => state.mix.topTracks;
  const topTracks = yield select(topTracksSelector);

  let validMixId = mixId ? mixId : action.mixId;

  if (!validMixId) {
    validMixId = yield parseInt(yield getDataFromStorage('mixId'));
  }

  yield put(actions.startGetCurrentTrack());

  let playingTrack = yield getPlayingTrackService(validMixId);

  const isInTopTracks = topTracks.filter(
    track => track.externalId === playingTrack.external_track_id,
  );

  if (
    !playingTrack.external_track_id ||
    playingTrack.error === 404 ||
    playingTrack.error === 400
  ) {
    console.log('Not playing due to error.');
    playingTrack = yield getNextTrackService(validMixId);
    yield put(actions.pauseTrack());
  } else {
    if (!topTracks || topTracks.length <= 0) {
      console.log('No top tracks, get next');
      playingTrack = yield getNextTrackService(validMixId);
      yield put(actions.pauseTrack());
    } else {
      if (!playingTrack.is_playing && !playingTrack.error) {
        console.log('Not playing, no error');
        if (action.mixId) {
          console.log('Get next');
          playingTrack = yield getNextTrackService(validMixId);
        }
        yield put(actions.pauseTrack());
      } else if (playingTrack.is_playing && !playingTrack.error) {
        if (isInTopTracks.length === 0) {
          console.log('Not in the top tracks, pause.');
          playingTrack = yield getNextTrackService(validMixId);
          yield put(actions.pauseTrack());
        } else {
          console.log('Is in the top tracks, play.');
        }
      } else {
        console.log('Error, pause');
        yield put(actions.pauseTrack());
      }
    }
  }

  if (playingTrack.external_track_id && !playingTrack.error) {
    const track = yield new MixTrack(
      playingTrack.id,
      playingTrack.external_track_id,
      playingTrack.playlist_id,
      playingTrack.user_id,
      playingTrack.track_name,
      playingTrack.artist_name,
      playingTrack.album_name,
      playingTrack.album_art,
      playingTrack.genre,
      playingTrack.score,
      playingTrack.was_played,
      playingTrack.duration,
    );
    yield put(actions.getCurrentTrack(track));
  } else {
    if (playingTrack.error === 401) {
      yield put(actions.initLogout());
    } else if (playingTrack.error === 400) {
      yield put(actions.getCurrentTrackFail());
    } else if (playingTrack.error === 404) {
      yield put(actions.getCurrentTrackFail());
    }
  }
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
      Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
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
      Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
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
      Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
      yield put(actions.upvoteFail());
    }
  }
}

export function* initStopPlaybackSaga(action) {
  yield put(actions.pauseTrack());
  yield put(actions.startStopPlayback());

  yield removeDataFromStorage('mixId');
  yield removeDataFromStorage('mixTile');
  yield removeDataFromStorage('ownerId');

  const pauseTrack = yield pauseTrackService();
  yield put(actions.pauseTrack());
}

export function* initPlayTrackSaga(action) {
  yield put(actions.startPlayTrack());
  let playTrack = yield playTrackService(action.mixId, action.trackId);
  if (playTrack.error === 404) {
    Alert.alert(
      'Ops! Ocorreu um erro!',
      'Verifique que seu streaming de música esta online e funcionando!',
    );
    yield put(actions.pauseTrack());
  } else if (playTrack.error === 400) {
    Alert.alert('Ops! Ocorreu um erro!', 'Tente novamente mais tarde.');
    yield put(actions.pauseTrack());
  } else {
    yield saveDataToStorage('isPlaying', 'true');
    yield put(actions.playTrack());
  }
}

export function* initPauseTrackSaga(action) {
  yield saveDataToStorage('isPlaying', 'false');
  const pauseTrack = yield pauseTrackService();
  yield put(actions.pauseTrack());
}

export function* initGetUserDevicesSaga(action) {
  yield put(actions.startGetUserDevices());
  const response = yield getUserDevicesService();
  console.log(response);
  if (response.error === 401) {
    yield put(actions.initLogout());
  } else if (response.error === 400) {
    yield put(actions.getUserDevicesFail());
  } else if (response.error === 404) {
    yield put(actions.getUserDevicesFail());
  } else {
    if (response.devices) {
      yield put(actions.getUserDevices(response.devices));
    } else {
      yield put(actions.getUserDevices([]));
    }
  }
}
