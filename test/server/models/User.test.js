const { assert } = require('chai');
const request = require('supertest');
const express = require('express');
const { mongoose, app } = require('../../../server/app');
const User = require('../../../server/models/User');

// call signInOrSignup with user

// see if a refresh token is given back / if the session is updated

// define user (potential to remove to . in jonathanewhite@colorado.edu)

const user1 = {
  _id: { $oid: '5d5038f4938319beacb621da' },
  isAdmin: false,
  isGithubConnected: false,
  purchasedBookIds: ['5d3da9c4b587314470fe8aec'],
  createdAt: { $date: { $numberLong: '1565538548879' } },
  googleId: '116115847599622990719',
  email: 'jewhite@colorado.edu',
  displayName: 'Jonathan White',
  avatarUrl:
    'https://lh4.googleusercontent.com/-Pps04RuEBzY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rded09PnTx8y_qQQ3WjlrZIGIXGBQ/photo.jpg',
  slug: 'jonathan-white',
  __v: { $numberInt: '0' },
};


describe('User', () => {
  describe('can', () => {
    it('exist', async () => {
      const jewhite = await User.findOne({ email: 'jewhite@colorado.edu' });
      assert.exists(jewhite, 'jewhite exists!');
    });
  });
});

// SigninorSignUp

/*
 when a user logs in: 
  1. route responds with user object,
  2. create a new session document, 
  3. set a cookie on the browser, 
  4. update user prop on the app, 
*/

describe('Sign in process for existing user:', () => {
  it('persists a new user', async () => {
    // set up
    await User.deleteOne({email: 'test1@test.ts'});
    const user = {
      googleId: 'test1',
      email: 'test1@test.ts',
      googleToken: { accessToken: 'test1', refreshToken: 'test1' },
      displayName: 'Test Name',
      avatarUrl: 'test1',
    };

    // exercise
    const saved = await User.signInOrSignUp(user);

    // verify
    assert.equal(user.email, saved.email);
  });
// setup exercise verify
  /* describe('server', () => {
    it('responds with the user object', async () => {
      // hitting oauth2callback responds with json
      request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          console.log(res);
        });
    });
    /* it('creates a new session document', () => {

    });
    const agent = request.agent(app);
    it('sets a cookie on the users browser', () => {
      
      agent
      .get('/')
      .expect('set-cookie', 'cookie=hey; Path=/', done);
  });

    });
    it('updates the user prop', () => {

    });
    */
});

// session has been added to sessions collection User.id === session.passport.user