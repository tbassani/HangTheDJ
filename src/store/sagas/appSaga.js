import {put, select} from 'redux-saga/effects';

import * as actions from '../actions';

import Mix from '../../models/Mix';

import {
  getMixPlaylistsService,
  addToGroupService,
  createMixPlaylistService,
  deleteMixService,
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
