import {Alert} from 'react-native';

import axios from 'axios';

import APIConfig from '../../config/apiconfig';
import {getDataFromStorage, saveDataToStorage} from '../storage';

export async function getPlaylists(signOut) {
  const jwt = await getDataFromStorage('token');

  var aux = [];
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'GET',
    url: APIConfig.GET_PLAYLISTS_URL,
  })
    .then(response => {
      console.log('RESPONSE');
      response.data.forEach(element => {
        aux.push({
          id: element.id,
          name: element.name,
          playlist_art: element.images[0].url,
          isSelected: false,
          selectedClass: null,
          type: 'playlist',
        });
      });
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('JWT Inválido');
          signOut();
        }
      }
      console.log(error);
    });
  console.log(aux);
  return aux;
}

export async function getPlaylistsAndTracks(query, cancelToken, signOut) {
  const jwt = await getDataFromStorage('token');
  var aux = [];
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'GET',
    url: APIConfig.GET_PLAYLISTS_AND_TRACKS_URL,
    cancelToken: cancelToken ? cancelToken.token : null,
    params: {
      query,
    },
  })
    .then(response => {
      console.log('RESPONSE FROM GET PLAYLISTS AND TRACKS');
      //console.log(response.data[0]);
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('JWT Inválido');
          signOut();
        }
      }
      console.log(error);
    });
  return aux;
}

export async function getPlayingTrack(playlist_id, signOut) {
  const jwt = await getDataFromStorage('token');

  var aux = {};
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'GET',
    url: APIConfig.GET_PLAYING_TRACK_URL + '/' + playlist_id,
  })
    .then(response => {
      aux = response.data;
    })
    .catch(error => {
      console.log(error);
      if (error.response) {
        if (error.response.status === 401) {
          console.log('JWT Inválido');
          signOut();
        }
      }
      console.log(error);
    });
  return aux;
}

export async function playTrack(playlist_id, track_id, signOut) {
  const jwt = await getDataFromStorage('token');

  var aux = {};
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  const body = {
    track_id,
    playlist_id,
  };
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.PLAY_TRACK_URL,
    data: body,
  })
    .then(response => {
      aux = response.data;
    })
    .catch(error => {
      console.log(error.response);
      console.error(error);
      if (error.response) {
        if (error.response.status === 401) {
          console.log('JWT Inválido');
          signOut();
        }
      }
      console.log(error);
    });
  return aux;
}
export async function pauseTrack(signOut) {
  const jwt = await getDataFromStorage('token');
  var aux = {};
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.PAUSE_TRACK_URL,
  })
    .then(response => {
      console.log(response.data);
      aux = response.data;
      return aux;
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('JWT Inválido');
          signOut();
        }
      }
      console.log(error);
    });
  return aux;
}

export async function getPlaybackState(signOut) {
  const jwt = await getDataFromStorage('token');
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  var aux = {};
  await axios({
    headers: headers,
    method: 'GET',
    url: APIConfig.GET_PLAYBACK_STATE_URL,
  })
    .then(response => {
      //console.log(response.data);
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('JWT Inválido');
          signOut();
        }
      }
      console.log(error);
    });
  return aux;
}
