import axios from 'axios';

import APIConfig from '../../config/apiconfig';
import {getDataFromStorage, saveDataToStorage} from '../storage';

export async function searchRankingTracksService(
  mixId,
  query,
  cancelToken,
  signOut,
) {
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
    url: APIConfig.SEARCH_VOTING_TRACKS_URL + '/' + mixId,
    cancelToken: cancelToken ? cancelToken.token : null,
    params: {
      query,
    },
  })
    .then(response => {
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function getVotingTrackService(playlist_id) {
  console.log('Get Voting Track from service for HDJ Playlist: ' + playlist_id);
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
    url: APIConfig.GET_VOTING_TRACK_URL + '/' + playlist_id,
  })
    .then(response => {
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function upvoteService(playlist_id, track_id) {
  console.log('Get Voting Track from service for HDJ Playlist: ' + playlist_id);
  const jwt = await getDataFromStorage('token');
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
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function downvoteService(playlist_id, track_id) {
  console.log('Get Voting Track from service for HDJ Playlist: ' + playlist_id);
  const jwt = await getDataFromStorage('token');
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
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function getPlayingTrackService(playlist_id) {
  const jwt = await getDataFromStorage('token');

  var aux = undefined;
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
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function getNextTrackService(playlist_id) {
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
    url: APIConfig.GET_NEXT_TRACK_URL + '/' + playlist_id,
  })
    .then(response => {
      aux = response.data;
      return aux;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function playTrackService(playlist_id, track_id) {
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
  console.log('PLAY SERVICE');
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
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}
export async function pauseTrackService() {
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
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function getPlaybackStateService() {
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
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function addTracksToQueueService(tracks, playlist_id) {
  const jwt = await getDataFromStorage('token');
  const body = {
    tracks: tracks,
    playlist_id: playlist_id,
  };
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  var aux = {};
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.ADD_TRACKS_TO_QUEUE,
    data: body,
  })
    .then(response => {
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function addTopTracksToQueueService(tracks, playlist_id) {
  const jwt = await getDataFromStorage('token');
  const body = {
    tracks: tracks,
    playlist_id: playlist_id,
  };
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  var aux = {};
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.ADD_TOP_TRACKS_TO_QUEUE,
    data: body,
  })
    .then(response => {
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function removeTracksFromQueueService(playlist_id) {
  const jwt = await getDataFromStorage('token');
  const body = {
    playlist_id: playlist_id,
  };
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
  };
  var aux = {};
  await axios({
    headers: headers,
    method: 'DELETE',
    url: APIConfig.REMOVE_TRACKS_FROM_QUEUE,
    data: body,
  })
    .then(response => {
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function getTopTracksService(playlist_id) {
  const jwt = await getDataFromStorage('token');
  const body = {
    playlist_id: playlist_id,
  };
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
  };
  var aux = {};
  await axios({
    headers: headers,
    method: 'GET',
    url: APIConfig.GET_TOP_TRACKS_URL,
    data: body,
  })
    .then(response => {
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function resetPlaylistService(hdj_playlist_id) {
  const jwt = await getDataFromStorage('token');
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
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function getTrackToVoteService(track_id, playlist_id) {
  const jwt = await getDataFromStorage('token');
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
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        aux = {
          error: error.response.status,
        };
      }
      console.log(error);
    });
  return aux;
}

export async function addTracksService(
  selectedPlaylists,
  selectedTracks,
  hdj_playlist_id,
) {
  console.log('Add trakcs to HDJ Playlist from Service');
  const jwt = await getDataFromStorage('token');
  let playlistItems = [];
  let tracksItems = [];
  selectedPlaylists.forEach(element => {
    playlistItems.push({
      id: element,
    });
  });
  selectedTracks.forEach(element => {
    tracksItems.push({
      id: element,
    });
  });
  const body = {
    playlists: {
      items: playlistItems,
    },
    tracks: {
      items: tracksItems,
    },
    hdj_playlist_id,
  };
  var aux = undefined;
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  try {
    const response = await axios({
      headers: headers,
      method: 'POST',
      url: APIConfig.ADD_TRACKS_URL,
      data: body,
    });
    aux = response.data;
    return aux;
  } catch (error) {
    if (error.response) {
      aux = {
        error: error.response.status,
      };
    }
    console.log(error);
    return aux;
  }
}
