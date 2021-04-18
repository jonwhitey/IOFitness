import 'isomorphic-unfetch';
import getRootUrl from './getRootUrl';

export default async function sendRequest(path, options = {}) {
  const headers = { ...(options.headers || {}), 'Content-type': 'application/json; charset=UTF-8' };
  console.log(`sendRequest to ${path}`);

  const response = await fetch(`${getRootUrl()}${path}`, {
    method: 'POST',
    credentials: 'include',
    ...options,
    headers,
  });

  const data = await response.json();
  console.log(`sendRequest.js response:`);


  if (data.error) {
    console.log('ERROR');
    console.log(data);
    throw new Error(data.error);
  }

  return data;
}
