const { assert } = require('chai');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const { getWorkout, getIndex } = require('../../../lib/api/customer');

const User = require('../../../server/models/User');
const workoutOne = require('../../workoutOne.js');
const { loginLocal, logout } = require('../../../lib/api/auth');

chai.use(chaiHttp);

// call signInOrSignup with user

// see if a refresh token is given back / if the session is updated

// define user (potential to remove to . in jonathanewhite@colorado.edu)

// Log in

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

  const loginValidUser = {
    email: 'jonathan42white@gmail.com',
    password: 'Start!123',
    signUpOrLogin: 'login',
    rememberMe: false,
  };

  const failResponse = {
    status: 401,
    message: 'Invalid email or password',
  };

  describe('/getWorkout', () => {
    /* it('should login a user', async () => {
      // exercise
      const res = await loginLocal(loginValidUser);
      // verify
      console.log('LOGGEDIN');
      console.log(res);
      assert.deepEqual(successResponse, res);
    }); */
    it('should return a workout', async () => {
      // exercise
      const agent = chai.request.agent('http://localhost:8000');

      try {
        await agent
          .post('/api/v1/auth/loginLocal')
          .send({ email: 'jonathan42white@gmail.com', password: 'Start!123' });
        const workoutRes = await agent.get('/api/v1/customer/workout');
        console.log(workoutRes);
        assert.deepEqual(successResponse, workoutRes);
      } catch (e) {
        console.log(e);
      }

      /* let res2 ='';
      try {
        const login = await loginLocal(loginValidUser);
        console.log('LOGIN.user');
        console.log(login.user);
        // get cookie off the request, pass the cookie set getWorkout header to
        console.log('getWorkout');
        res2 = await getWorkout();
      } catch (e) {
        console.log(e);
      }
      // verify */
      // assert.deepEqual(successResponse, res2);
    });
    /* it('logs a user out and returns the correct message', async () => {
      // setup
      // exercise
      let bool = false;
      try {
        const res = await logout();
        console.log(res);
        bool = true;
      } catch (err) {
        console.log('ERROR');
        console.log(err);
        bool = false;
      }
      // verify
      console.log(bool);
      assert.equal(bool, true);
    });
    */
  });
});
