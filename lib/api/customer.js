import sendRequest from './sendRequest';

const BASE_PATH = '/api';

export const buyBook = ({ id, stripeToken }) =>
  sendRequest(`${BASE_PATH}/buy-book`, {
    body: JSON.stringify({ id, stripeToken }),
  });

export const loginLocal = ({ user }) =>
  sendRequest(`${BASE_PATH}/loginLocal`, {
    body: JSON.stringify({ user }),
  });

export const buildProgram = ({ localUser, newProgram }) =>
  sendRequest(`${BASE_PATH}/buildProgram`, {
    body: JSON.stringify({ localUser, newProgram }),
  });

export const getProgram = ({ localUser }) =>
  sendRequest(`${BASE_PATH}/getProgram`, {
    body: JSON.stringify({ localUser }),
  });

export const getCurrentWorkout = ({ localUser }) =>
  sendRequest(`${BASE_PATH}/getCurrentWorkout`, {
    body: JSON.stringify({ localUser }),
  });

export const getIndex = () =>
  sendRequest(`${BASE_PATH}/`, {
    method: 'GET',
  });

export const getAllProgressions = () =>
  sendRequest(`${BASE_PATH}/getAllProgressions`, {
    body: JSON.stringify(),
  });

export const getMe = () =>
  sendRequest(`${BASE_PATH}/me`, {
    method: 'GET',
  });
