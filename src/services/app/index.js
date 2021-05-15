import {Alert} from 'react-native';

import axios from 'axios';

import APIConfig from '../../config/apiconfig';
import {getDataFromStorage, saveDataToStorage} from '../storage';

export async function createMixPlaylistService(selected, name, signOut) {
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

export async function mixPlaylistService(
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

export async function deleteMixService(mix_id, signOut) {
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

export async function getMixPlaylistsService(signOut) {
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
    url: APIConfig.GET_HDJPLAYLISTS_URL,
  })
    .then(response => {
      aux = [];
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
  return aux;
}

export async function getMixTracksService(mix_id, signOut, interval) {
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

export async function getVotingTrackService(mix_id, signOut) {
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

export async function upVoteService(mix_id, track_id, signOut) {
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

export async function downVoteService(mix_id, track_id, signOut) {
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

export async function addTracksService(
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

export async function getNextTrackService(mix_id, signOut) {
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

export async function resetPlaylistService(mix_id, signOut) {
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

export async function addToGroupService(mix_id, signOut) {
  const jwt = await getDataFromStorage('token');
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  const body = {
    playlist_id: mix_id,
  };
  var aux = undefined;
  await axios({
    headers: headers,
    method: 'POST',
    url: APIConfig.ADD_TO_GROUP_URL,
    data: body,
  })
    .then(response => {
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

export async function premiumClickService(signOut) {
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

export async function getActiveProfileService(signOut) {
  const jwt = await getDataFromStorage('token');
  var data = {
    profile: null,
  };
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  try {
    const response = await axios({
      headers: headers,
      method: 'GET',
      url: APIConfig.ACTIVE_PROFILE_URL,
    });
    if (response.data.profile.length > 0) {
      data.profile = response.data.profile[0].service;
      return data;
    }
  } catch (error) {
    if (error.response.status === 401) {
      console.log('JWT Inválido');
      data = {status: 401};
      signOut();
    }
    return;
  }
}

export async function getProfileURLService(signOut) {
  const jwt = await getDataFromStorage('token');
  var data = {
    url: null,
  };
  const headers = {
    Authorization: 'Bearer ' + jwt,
    contenttype: 'application/json;',
    datatype: 'json',
  };
  try {
    const response = await axios({
      headers: headers,
      method: 'GET',
      url: APIConfig.GET_PROFILE_URL,
    });
    data.url = response.data;
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      console.log('JWT Inválido');
      data = {status: 401};
      signOut();
    }
    return;
  }
}
