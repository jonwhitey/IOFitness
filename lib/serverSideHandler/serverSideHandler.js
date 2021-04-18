import { callLoginLocal } from './loginLocal/callLoginLocal';
import { returnProps } from './loginLocal/returnProps';
import {callGetTrainingSession} from './loginLocal/callGetTrainingSession';
import { getSession } from '@auth0/nextjs-auth0';


export const serverSideHandler = async (req, res) => {
    console.log('serverSideHandler')
    const session = await getSession(req, res);
    console.log(!!session);
    if (!session) {
      console.log('no session!');
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
        props: { localUser: null } 
      }
    }
    
    const auth0User = session.user;
    
    const localUser = await callLoginLocal(auth0User);
    console.log("REQ.URL");
    console.log(req.url);
    if (req.url === '/build-program' || req.url === '/_next/data/development/build-program.json') {
      console.log('req.url is build-program')
      console.log(req.url);
      return {props: {localUser}}
    }
    const trainingSession = await callGetTrainingSession(localUser);
    return returnProps(localUser, trainingSession);
  } 