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
        if (error.response.status === 401) {
          console.log('JWT Inválido');
          signOut();
        }
      }
      console.log(error);
    });
  return aux;
}
