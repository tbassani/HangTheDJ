import {Alert} from 'react-native';

import axios from 'axios';

import APIConfig from '../../config/apiconfig';

export async function loginService(email, password) {
  const body = {
    email,
    password,
  };
  var data = {
    jwt: '',
    login_user: null,
  };
  await axios({
    method: 'POST',
    url: APIConfig.LOGIN_URL,
    data: body,
  })
    .then(response => {
      data = response.data;
    })
    .catch(error => {
      console.log(error.response.data.error);
      Alert.alert('Erro', error.response.data.error);
      return;
    });
  return data;
}

export async function signUpService(email) {
  const body = {
    email,
  };
  var data;
  await axios({
    method: 'POST',
    url: APIConfig.SIGNUP_URL,
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

export async function forgotPasswordService(email) {
  const body = {
    email,
  };
  var data;
  await axios({
    method: 'POST',
    url: APIConfig.FORGOT_PASSWORD_URL,
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

export async function registerService(email, password, code) {
  const body = {email, password, code};
  var data = {
    jwt: '',
    register_user: null,
  };
  await axios({
    method: 'POST',
    url: APIConfig.REGISTER_URL,
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
