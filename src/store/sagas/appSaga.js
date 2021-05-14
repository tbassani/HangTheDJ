import {put, select} from 'redux-saga/effects';

import * as actions from '../actions';

import {
  getMixPlaylists,
  addToGroup,
  createMixPlaylist,
  deleteMix,
} from '../../services/app';

export function* initGetMixesSaga(action) {
  yield put(actions.startGetMixes());
  console.log('GET MIXES');
  const response = yield getMixPlaylists(actions.initLogout);
  console.log(response);
  yield put(actions.getMixes());
}

export function* initAddToGroupSaga(action) {
  yield put(actions.initAddToGroup());
  console.log('ADD TO GROUP');
  const response = yield addToGroup(action.mixId, actions.initLogout);
  console.log(response);
  yield put(actions.addToGroup());
}
