const { assert } = require('chai');
const User = require('../../../server/models/User');
const {getWorkout} = require('../../../lib/api/customer');
const workoutOne = require('../../workoutOne.js');
const { signUpLocal, logout } = require('../../../lib/api/auth');

// call signInOrSignup with user

// see if a refresh token is given back / if the session is updated

// define user (potential to remove to . in jonathanewhite@colorado.edu)

/*
  I needed to change the signatures of these methods so I just brought
  them locally here for now. They are used ALL over your app so I didn't
  wanna mess with that.
*/
function getRootUrl() {
  const port = process.env.PORT || 8000;
  const dev = process.env.NODE_ENV !== 'production';
  const ROOT_URL = dev ? `http://localhost:${port}` : process.env.ROOT_URL;

  return ROOT_URL;
}

async function sendRequest(path, options = {}) {
  const headers = Object.assign({}, options.headers || {}, {
    'Content-type': 'application/json; charset=UTF-8',
  });
  console.log(`sendRequest to ${path}`);
  console.log(headers);
  const response = await fetch(
    `${getRootUrl()}${path}`,
    Object.assign({ method: 'POST', credentials: 'include' }, options, { headers }),
  );
 
  /*
  You want the cookies header from this response but you are 
  only returning the body. I changed it so that it return the
  entire response
  */
  return response;
}

const BASE_PATH = '/api/v1/auth';
const loginLocal = ({ email, password, rememberMe, rememberMeToken, signUpOrLogin }) =>
  sendRequest(`${BASE_PATH}/loginLocal`, {
    method: 'POST',
    body: JSON.stringify({ email, password, rememberMe, rememberMeToken, signUpOrLogin }),
  });


describe('Customer Routes', () => {
  const validUid = '5e89272f55d4c037abf3f351';
  const invalidUid = '';
  const validWorkout = workoutOne;
  const successResponse = {
    status: 200,
    message: 'User logged in successfully',
    email: 'jonathan42white@gmail.com',
    rememberMeToken: '',
  };
  const signupValidUser = {
    email: 'jonathan.e.white@colorado.edu',
    firstName: 'Jonathan',
    lastName: 'White',
    password: 'Gogogo123!',
    signUpOrLogin: 'signup',
  };
  const validUser = {
    isAdmin: false,
    purchasedBookIds: [],
    _id: '5e89272f55d4c037abf3f351',
    email: 'jonathan42white@gmail.com',
    firstName: '',
    lastName: '',
    displayName: '',
    avatarUrl: 'https://storage.googleapis.com/builderbook/logo.svg',
    slug: '',
  };
  /*
  This login valid user object had different values than auth.test
  so I made them match
  */
  const loginValidUser = {
    email: 'jonathan.e.white@colorado.edu',
    password: 'Gogogo123!',
    signUpOrLogin: 'login',
    rememberMe: true,
  };

  const failResponse = {
    status: 401,
    message: 'Invalid email or password',
  };

  describe('/getWorkout', () => {
    it('should return a workout', async () => {
      /*
      I can't explain why you have to sign up first
      but that was passing in auth.test.js so I did it here
      */
      const signup = await signUpLocal(signupValidUser);
      assert.equal(signup.status, 200)
      
      const login = await loginLocal(loginValidUser);
      assert.equal(login.status, 200)
      /*
        You have this token, if you wanted to test logging in with
        it you could.
      */
      const {rememberMeToken: body} = login

      /*
        you want to send this entire cookies object as a header
        when you make any subsequent requests to the server.
      */
      const cookie = login.headers.get('set-cookie')
      console.log({cookie})

      const w = await getWorkout({
        body,
        headers: {cookie}
      });
      assert.equal(w.status, 200)
      // verify
      // assert.deepEqual(successResponse, workout);
    });
  });
});
