import 'isomorphic-unfetch';
import getRootUrl from './getRootUrl';

export default async function sendRequest(path, options = {}) {
  console.log('sendRequest options 1')
  console.log(options);
  const headers = { ...(options.headers || {}), 'Content-type': 'application/json; charset=UTF-8' };
  console.log(`sendRequest to ${path}`);
  console.log('sendRequest options');
  //console.log(options);
  //console.log(headers);
  const response = await fetch(`${getRootUrl()}${path}`, {
    method: 'POST',
    credentials: 'include',
    ...options,
    headers,
  });
  //console.log(response);
  const data = await response.json();
  console.log(`sendRequest.js response:`);
  //console.log(data);

  if (data.error) {
    console.log('ERROR');
    console.log(data);
    throw new Error(data.error);
  }

  return data;
}
  