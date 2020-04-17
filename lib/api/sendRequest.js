import 'isomorphic-unfetch';
import getRootUrl from './getRootUrl';

export default async function sendRequest(path, options = {}) {
  const headers = Object.assign({}, options.headers || {}, {
    'Content-type': 'application/json; charset=UTF-8',
  });
  console.log(`sendRequest to ${path}`);
  console.log(headers);
  const response = await fetch(
    `${getRootUrl()}${path}`,
    Object.assign({ method: 'POST', credentials: 'include' }, options, { headers }),
  );
  const data = await response.json();
  console.log(`sendRequest.js response:`);
  console.log(data);

  const myHeaders = response.headers
  for (var pair of myHeaders.entries()) {
   console.log(pair[0]+ ': '+ pair[1]);
  }
  const cookies = response.headers.get('set-cookie')
  console.log({cookies})
  
  if (data.error) {
    console.log('ERROR');
    console.log(data);
    throw new Error(data.error);
  }

  return data;
}
