import { callLoginLocal } from './loginLocal/callLoginLocal';
import { returnProps } from './loginLocal/returnProps';
import {callGetTrainingSession} from './loginLocal/callGetTrainingSession';
import { getSession } from '@auth0/nextjs-auth0';


export const serverSideHandler = async (req, res) => {
    const session = await getSession(req, res);
    
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
    if (req.url === '/build-program') {
      return {props: {localUser}}
    }
    const trainingSession = await callGetTrainingSession(localUser);
    
    return returnProps(localUser, trainingSession);
  } 