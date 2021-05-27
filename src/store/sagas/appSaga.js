import {put, select} from 'redux-saga/effects';

import * as actions from '../actions';

import Mix from '../../models/Mix';
import Track from '../../models/Track';
import Playlist from '../../models/Playlist';

import {
  getMixPlaylistsService,
  addToGroupService,
  mixPlaylistService,
  getActiveProfileService,
  getProfileURLService,
  getTracksAndPlaylistsService,
  deleteMixService,
} from '../../services/app';

import {resetPasswordService} from '../../services/auth';
import {Alert} from 'react-native';

export function* initGetMixesSaga(action) {
  yield put(actions.startGetMixes());
  const response = yield getMixPlaylistsService();
  if (response && !response.error) {
    const mixes = [];
    response.forEach(element => {
      mixes.push(
        new Mix(
          element.id,
          element.name,
          element.owner_user_id,
          element.tracks,
          element.topTracks,
          element.currTrack,
          element.timeInterval,
        ),
      );
    });
    yield put(actions.getMixes(mixes));
  } else {
    if (response && response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getMixesFail());
    }
  }
}

export function* initAddToGroupSaga(action) {
  yield put(actions.startAddToGroup());
  const response = yield addToGroupService(action.mixId);
  if (response && response !== 401) {
    const mix = new Mix(
      response.id,
      response.playlist_name,
      response.user_id,
      [],
      [],
      null,
      null,
    );

    yield put(actions.addToGroup(mix));
  } else {
    if (response === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.addToGroupFail());
    }
  }
}

export function* initGetProfileURLSaga(action) {
  yield put(actions.startGetProfileURL());

  const response = yield getProfileURLService();
  if (response && response.url && !response.error) {
    yield put(actions.getProfileURL(response.url));
  } else {
    if (response.error === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getProfileURLFail());
    }
  }
}

export function* initGetActiveProfileSaga(action) {
  yield put(actions.startGetProfile());
  const response = yield getActiveProfileService();
  if (response && response.profile && response !== 401) {
    yield put(actions.getProfile(response.profile));
  } else {
    if (response === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getProfileFail());
    }
  }
}

export function* initResetPasswordSaga(action) {
  yield put(actions.startResetPassword());
  const response = yield resetPasswordService(
    action.email,
    action.currPassword,
    action.newPassword,
  );
  if (response && response.success && response !== 401) {
    Alert.alert('Senha alterada!');
  } else {
    if (response === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.resetPasswordFail());
    }
  }
}

export function* initGetTracksAndPlaylistsSaga(action) {
  yield put(actions.startGetTracksAndPlaylists());
  const response = yield getTracksAndPlaylistsService(
    action.query,
    action.cancelToken,
  );
  if (response && response !== 401) {
    const tracks = [];
    const playlists = [];
    yield response.forEach(section => {
      if (section && section.data && section.title === 'Músicas') {
        section.data.forEach(track => {
          tracks.push(
            new Track(
              track.external_track_id,
              track.track_name,
              track.artists,
              track.album_art,
              track.duration,
            ),
          );
        });
      }
      if (section && section.data && section.title === 'Playlists') {
        section.data.forEach(playlist => {
          playlists.push(
            new Playlist(
              playlist.external_playlist_id,
              playlist.playlist_name,
              playlist.playlist_art,
              playlist.tracks,
            ),
          );
        });
      }
    });
    yield put(actions.getTracksAndPlaylists(tracks, playlists));
  } else {
    if (response === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.getTracksAndPlaylistsFail());
    }
  }
}

export function* initCreateMixSaga(action) {
  yield put(actions.startCreateMix());
  const newMix = state => state.app.newMix;
  const mix = yield select(newMix);
  const user = state => state.auth.userId;
  const userId = yield select(user);
  const selectedTracks = [];
  const selectedPlaylists = [];

  mix.tracks.forEach(track => {
    selectedTracks.push(track.id);
  });
  mix.playlists.forEach(playlist => {
    selectedPlaylists.push(playlist.id);
  });
  const response = yield mixPlaylistService(
    selectedPlaylists,
    selectedTracks,
    action.title,
  );
  if (response && response !== 401) {
    yield put(actions.createMix());
    yield put(actions.initGetMixes());
    yield put(actions.initGetMix(response, action.title, userId));
  } else {
    if (response === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.resetPasswordFail());
    }
  }
}

export function* initRemoveMixSaga(action) {
  yield put(actions.startRemoveMix());

  const response = yield deleteMixService(action.mixId, actions.logout);
  if (response && response !== 401) {
    yield put(actions.removeMix(action.mixId));
  } else {
    if (response === 401) {
      yield put(actions.initLogout());
    } else {
      yield put(actions.removeMixFail());
    }
  }
}
