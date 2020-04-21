import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/auth';

export const signUpLocal = ({ email, password, firstName, lastName, signUpOrLogin }) =>
  sendRequest(`${BASE_PATH}/signUpLocal`, {
    method: 'POST',
    body: JSON.stringify({ email, password, firstName, lastName, signUpOrLogin }),
  });

export const loginLocal = ({ email, password, rememberMe, rememberMeToken, signUpOrLogin }) =>
  sendRequest(`${BASE_PATH}/loginLocal`, {
    method: 'POST',
    body: JSON.stringify({ email, password, rememberMe, rememberMeToken, signUpOrLogin }),
  });

export const googleSignIn = ({ googleToken }) =>
  sendRequest(`${BASE_PATH}/googleApi`, { googleToken });

export const logout = () => sendRequest(`${BASE_PATH}/logout`, { method: 'GET' });

export const findEmailByToken = ({ rememberMeToken }) =>
  sendRequest(`${BASE_PATH}/findEmailByToken`, {
    method: 'POST',
    body: JSON.stringify({ rememberMeToken }),
  });

export const deleteUser = ({ email, password }) =>
  sendRequest(`${BASE_PATH}/deleteUser`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
