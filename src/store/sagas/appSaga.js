import {put, select} from 'redux-saga/effects';

import * as actions from '../actions';

import Mix from '../../models/Mix';
import Track from '../../models/Track';
import Playlist from '../../models/Playlist';

import {
  getMixPlaylistsService,
  addToGroupService,
  mixPlaylistService,
  deleteMixService,
  getActiveProfileService,
  getProfileURLService,
  getTracksAndPlaylistsService,
} from '../../services/app';

import {resetPasswordService} from '../../services/auth';
import {Alert} from 'react-native';

export function* initGetMixesSaga(action) {
  yield put(actions.startGetMixes());
  const response = yield getMixPlaylistsService(actions.initLogout);
  if (response) {
    const mixes = [];
    response.forEach(element => {
      mixes.push(new Mix(element.id, element.owner_user_id, element.name));
    });
    yield put(actions.getMixes(mixes));
  } else {
    yield put(actions.getMixesFail());
  }
}

export function* initAddToGroupSaga(action) {
  yield put(actions.startAddToGroup());
  const response = yield addToGroupService(action.mixId, actions.initLogout);
  if (response) {
    const mix = new Mix(response.id, response.user_id, response.playlist_name);

    yield put(actions.addToGroup(mix));
  } else {
    yield put(actions.addToGroupFail());
  }
}

export function* initGetProfileURLSaga(action) {
  yield put(actions.startGetProfileURL());
  const response = yield getProfileURLService(actions.logout);
  if (response && response.url) {
    yield put(actions.getProfileURL(response.url));
  } else {
    yield put(actions.getProfileURLFail());
  }
}

export function* initGetActiveProfileSaga(action) {
  yield put(actions.startGetProfile());
  const response = yield getActiveProfileService(actions.logout);
  if (response && response.profile) {
    yield put(actions.getProfile(response.profile));
  } else {
    yield put(actions.getProfileFail());
  }
}

export function* initResetPasswordSaga(action) {
  yield put(actions.startResetPassword());
  const response = yield resetPasswordService(
    action.email,
    action.currPassword,
    action.newPassword,
    actions.logout,
  );
  if (response && response.success) {
    Alert.alert('Senha alterada!');
  } else {
    yield put(actions.resetPasswordFail());
  }
}

export function* initGetTracksAndPlaylistsSaga(action) {
  yield put(actions.startGetTracksAndPlaylists());
  const response = yield getTracksAndPlaylistsService(
    action.query,
    action.cancelToken,
    actions.logout,
  );
  if (response) {
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
    yield put(actions.getTracksAndPlaylistsFail());
  }
}

export function* initCreateMixSaga(action) {
  yield put(actions.startCreateMix());
  const newMix = state => state.app.newMix;
  const mix = yield select(newMix);
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
    actions.logout,
  );
  if (response) {
    console.log(response);
  } else {
    yield put(actions.resetPasswordFail());
  }
}
