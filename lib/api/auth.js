import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/auth';

export const signUpLocal = ({ email, password, firstName, lastName }) =>
  sendRequest(
    `${BASE_PATH}/signUpLocal`,
    Object.assign({
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
    }),
  );

export const loginLocal = ({ email, password }) =>
  sendRequest(`${BASE_PATH}/loginLocal`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

export const googleSignIn = ({ googleToken }) =>
  sendRequest(`${BASE_PATH}/googleApi`, { googleToken });

export const logout = () =>
  sendRequest(
    `${BASE_PATH}/logout`,
    Object.assign({
      method: 'GET',
    }),
  );
