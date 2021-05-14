import {Alert} from 'react-native';

import axios from 'axios';

import APIConfig from '../../config/apiconfig';
import {getdataFromStorage, saveDataToStorage} from '../storage';

export async function loginService(email, password) {
  const body = {
    email,
    password,
  };
  var data = {
    jwt: '',
    login_user: null,
  };
  try {
    const response = await axios({
      method: 'POST',
      url: APIConfig.LOGIN_URL,
      data: body,
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data.error);
    Alert.alert('Erro', error.response.data.error);
    return undefined;
  }
}

export async function signUpService(email) {
  const body = {
    email,
  };
  try {
    const response = await axios({
      method: 'POST',
      url: APIConfig.SIGNUP_URL,
      data: body,
    });
    return response;
  } catch (error) {
    console.log(error);
    Alert.alert('Erro', error.response.data.error);
    return undefined;
  }
}

export async function forgotPasswordService(email) {
  const body = {
    email,
  };

  try {
    const response = await axios({
      method: 'POST',
      url: APIConfig.FORGOT_PASSWORD_URL,
      data: body,
    });
    return response;
  } catch (error) {
    console.log(error);
    Alert.alert('Erro', error.response.data.error);
    return undefined;
  }
}

export async function registerService(email, password, code) {
  const body = {email, password, code};
  try {
    const response = await axios({
      method: 'POST',
      url: APIConfig.REGISTER_URL,
      data: body,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    Alert.alert('Erro', error.response.data.error);
    return undefined;
  }
}

export async function resetPasswordService(email, old_password, new_password) {
  const body = {email, old_password, new_password};
  var data = {
    jwt: '',
    register_user: null,
  };
  await axios({
    method: 'POST',
    url: APIConfig.RESET_PASSWORD_URL,
    data: body,
  })
    .then(response => {
      data = response.data;
    })
    .catch(error => {
      console.log(error);
      Alert.alert('Erro', error.response.data.error);
    });
  return data;
}

export async function getActiveProfile(signOut) {
  console.log('Get active profile Service');
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
      console.log(response.data.profile[0].service);
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

export async function getProfileUrl(signOut) {
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
