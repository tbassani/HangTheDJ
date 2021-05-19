import axios from 'axios';

import APIConfig from '../../config/apiconfig';
import {getdataFromStorage, saveDataToStorage} from '../storage';

export async function getVotingTrack(playlist_id, signOut) {
  console.log('Get Voting Track from service for HDJ Playlist: ' + playlist_id);
  const jwt = await getdataFromStorage('token');
  var aux = [];
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'GET',
    url: APIConfig.GET_VOTING_TRACK_URL + '/' + playlist_id,
  })
    .then(response => {
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
  console.log(aux);
  return aux;
}

export async function upVote(playlist_id, track_id, signOut) {
  console.log('Get Voting Track from service for HDJ Playlist: ' + playlist_id);
  const jwt = await getdataFromStorage('token');
  var aux = [];
  const body = {
    playlist_id,
    track_id,
  };
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.UPVOTE_TRACK_URL,
    data: body,
  })
    .then(response => {
      console.log('RESPONSE');
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
  console.log(aux);
  return aux;
}

export async function downVote(playlist_id, track_id, signOut) {
  console.log('Get Voting Track from service for HDJ Playlist: ' + playlist_id);
  const jwt = await getdataFromStorage('token');
  var aux = [];
  const body = {
    playlist_id,
    track_id,
  };
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.DOWNVOTE_TRACK_URL,
    data: body,
  })
    .then(response => {
      console.log('RESPONSE');
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
  console.log(aux);
  return aux;
}

export async function getPlayingTrack(playlist_id, signOut) {
  console.log('Get Playing track from service');
  const jwt = await AsyncStorage.getItem('token');

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

export async function getNextTrack(playlist_id, signOut) {
  const jwt = await AsyncStorage.getItem('token');

  var aux = {};
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'GET',
    url: APIConfig.GET_NEXT_TRACK_URL + '/' + playlist_id,
  })
    .then(response => {
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

export async function playTrack(playlist_id, track_id, signOut) {
  const jwt = await AsyncStorage.getItem('token');

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
  const jwt = await AsyncStorage.getItem('token');
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
  const jwt = await AsyncStorage.getItem('token');
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

export async function resetPlaylist(hdj_playlist_id, signOut) {
  const jwt = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  const body = {
    hdj_playlist_id,
  };
  var aux = {};
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.RESET_HDJPLAYLIST_URL,
    data: body,
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

export async function getTrackToVote(track_id, playlist_id, signOut) {
  const jwt = await AsyncStorage.getItem('token');
  var aux;
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'GET',
    url: APIConfig.GET_TRACK_TO_VOTE_URL,
    params: {
      track_id,
      playlist_id,
    },
  })
    .then(response => {
      console.log('RESPONSE FROM GET IF VOTED TRACK');
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
