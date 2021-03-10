/*
const { assert } = require('chai');
const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const { before } = require('mocha');
const { getWorkout, getIndex } = require('../../../lib/api/customer');

const User = require('../../../server/models/User');
const { loginLocal, logout } = require('../../../lib/api/auth');

chai.use(chaiHttp);

// call signInOrSignup with user

// see if a refresh token is given back / if the session is updated

// define user (potential to remove to . in jonathanewhite@colorado.edu)

// Log in

describe('Customer Routes', () => {
  const successResponse = {
    status: 200,
    message: 'User logged in successfully',
    email: 'jonathan42white@gmail.com',
    rememberMeToken: '',
  };
  const agent = chai.request.agent('http://localhost:3000');

  before(async () => {
    try {
      await agent
        .post('/api/v1/auth/loginLocal')
        .send({ email: 'jonathan42white@gmail.com', password: 'Start!123' });
      return agent;
    } catch (e) {
      console.log(e);
      return e;
    }
  });

  describe('/getAllExercises', () => {
    it('should return an array of exercises', async () => {
      try {
        const workoutRes = await agent.get('/api/v1/customer/getAllExercises');
        console.log(workoutRes.body.exercises.length);
        assert.equal(workoutRes.body.exercises.length, 193);
      } catch (e) {
        console.log(e);
      }
    });
  });

  describe('/getAllProgressions', () => {
    it('should return all Progressions', async () => {
      try {
        const progressionResponse = await agent.get('/api/v1/customer/getAllProgressions');
        console.log(progressionResponse.body.progressions.length);
        assert.exists(progressionResponse.body.progressions.length, 18);
      } catch (e) {
        console.log(e);
      }
    });
  });
});
*/
