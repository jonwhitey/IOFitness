import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/customer';

export const buyBook = ({ id, stripeToken }) =>
  sendRequest(`${BASE_PATH}/buy-book`, {
    body: JSON.stringify({ id, stripeToken }),
  });

export const getWorkout = ({ headers }) =>
  sendRequest(`${BASE_PATH}/newWorkout`, {
    method: 'GET',
    headers,
  });

export const getIndex = () =>
  sendRequest(`${BASE_PATH}/`, {
    method: 'GET',
  });
