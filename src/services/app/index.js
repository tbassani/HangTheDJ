import {Alert} from 'react-native';

import axios from 'axios';

import APIConfig from '../../config/apiconfig';
import {getDataFromStorage, saveDataToStorage} from '../storage';

export async function createMixPlaylist(selected, name, signOut) {
  console.log('Create Mix Playlist Service');
  const jwt = await getDataFromStorage('token');
  let items = [];
  selected.forEach(element => {
    items.push({
      id: element,
    });
  });
  const body = {
    playlists: {
      items,
    },
    name: name,
  };
  var aux = 0;
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.CREATE_HDJPLAYLIST_URL,
    data: body,
  })
    .then(response => {
      console.log('RESPONSE');
      aux = response.data.id;
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

export async function mixPlaylist(
  selectedPlaylists,
  selectedTracks,
  name,
  signOut,
) {
  console.log('Create HDJ Playlist Service');
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
    name: name,
  };
  var aux = 0;
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.MIX_HDJPLAYLIST_URL,
    data: body,
  })
    .then(response => {
      console.log('RESPONSE');
      aux = response.data.id;
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

export async function deleteMix(mix_id, signOut) {
  const jwt = await getDataFromStorage('token');

  var aux = [];
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  const body = {
    mix_id,
  };
  await axios({
    headers: headers,
    method: 'DELETE',
    url: APIConfig.DEL_HDJPLAYLIST_URL,
    data: body,
  })
    .then(response => {
      console.log('RESPONSE');
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

export async function getMixPlaylists(signOut) {
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
    url: APIConfig.GET_HDJPLAYLISTS_URL,
  })
    .then(response => {
      console.log('RESPONSE');
      response.data.forEach(element => {
        aux.push({
          id: element.id,
          name: element.playlist_name,
          owner_user_id: element.user_id,
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

export async function getMixTracks(mix_id, signOut, interval) {
  const jwt = await getDataFromStorage('token');
  const body = {
    playlist_id: mix_id,
  };
  var aux = [];
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'GET',
    url: APIConfig.GET_HDJTRACKS_URL + '/' + mix_id,
  })
    .then(response => {
      aux = response.data;
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 401) {
          console.log('JWT Inválido');
          signOut();
          if (interval) {
            clearInterval(interval);
          }
        }
      }
      console.log(error);
    });
  return aux;
}

export async function getVotingTrack(mix_id, signOut) {
  console.log('Get Voting Track from service for HDJ Playlist: ' + mix_id);
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
    url: APIConfig.GET_VOTING_TRACK_URL + '/' + mix_id,
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

export async function upVote(mix_id, track_id, signOut) {
  console.log('Get Voting Track from service for HDJ Playlist: ' + mix_id);
  const jwt = await getDataFromStorage('token');
  var aux = [];
  const body = {
    playlist_id: mix_id,
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

export async function downVote(mix_id, track_id, signOut) {
  console.log('Get Voting Track from service for HDJ Playlist: ' + playlist_id);
  const jwt = await getDataFromStorage('token');
  var aux = [];
  const body = {
    playlist_id: mix_id,
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

export async function addTracks(
  selectedPlaylists,
  selectedTracks,
  mix_id,
  signOut,
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
    hdj_playlist_id: mix_id,
  };
  var aux = 0;
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.ADD_TRACKS_URL,
    data: body,
  })
    .then(response => {
      console.log('RESPONSE');
      aux = response.data.id;
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

export async function getNextTrack(mix_id, signOut) {
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
    url: APIConfig.GET_NEXT_TRACK_URL + '/' + mix_id,
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

export async function resetPlaylist(mix_id, signOut) {
  const jwt = await getDataFromStorage('token');
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  const body = {
    hdj_playlist_id: mix_id,
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

export async function addToGroup(mix_id, signOut) {
  const jwt = await getDataFromStorage('token');
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  const body = {
    playlist_id: mix_id,
  };
  var aux = {};
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.ADD_TO_GROUP_URL,
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

export async function getTrackToVote(track_id, mix_id, signOut) {
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
      playlist_id: mix_id,
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

export async function searchVotingTracks(query, mix_id, cancelToken, signOut) {
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
    url: APIConfig.SEARCH_VOTING_TRACKS_URL + '/' + mix_id,
    cancelToken: cancelToken ? cancelToken.token : null,
    params: {
      query,
    },
  })
    .then(response => {
      console.log('RESPONSE FROM SEARCH VOTING TRACKS');
      console.log(response.data);
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

export async function premiumClick(signOut) {
  const jwt = await getDataFromStorage('token');
  console.log('CALLIN PREMIMUM');
  var aux = [];
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.PREMIUM_CLICK_URL,
  })
    .then(response => {
      console.log(response);
      console.log('RESP PREMIMUM');
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
