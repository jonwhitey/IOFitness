import sendRequest from './sendRequest';

const BASE_PATH = '/api';

export const loginLocal = ({ user }) =>
  sendRequest(`${BASE_PATH}/loginLocal`, {
    body: JSON.stringify({ user }),
  });

export const createMultipleTrainingSessions = ({ localUser, newTrainingSessions }) =>
  sendRequest(`${BASE_PATH}/createMultipleTrainingSessions`, {
    body: JSON.stringify({ localUser, newTrainingSessions }),
  });

export const getTrainingSession = ({ localUser }) =>
  sendRequest(`${BASE_PATH}/getTrainingSession`, {
    body: JSON.stringify({ localUser }),
  });

export const completeTrainingSession = ({ localUser, trainingSession }) =>
  sendRequest(`${BASE_PATH}/completeTrainingSession`, {
    body: JSON.stringify({ localUser, trainingSession }),
  });

export const getAllProgressions = () =>
  sendRequest(`${BASE_PATH}/getAllProgressions`, {
    body: JSON.stringify(),
  });

