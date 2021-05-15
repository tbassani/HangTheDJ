import {put, select} from 'redux-saga/effects';

import * as actions from '../actions';

import Mix from '../../models/Mix';

import {
  getMixPlaylistsService,
  addToGroupService,
  createMixPlaylistService,
  deleteMixService,
  getActiveProfileService,
  getProfileURLService,
} from '../../services/app';

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
  console.log('GET PROFILE SAGA');
  yield put(actions.startGetProfile());
  const response = yield getActiveProfileService(actions.logout);
  console.log(response);
  if (response && response.profile) {
    yield put(actions.getProfile(response.profile));
  } else {
    yield put(actions.getProfileFail());
  }
}
