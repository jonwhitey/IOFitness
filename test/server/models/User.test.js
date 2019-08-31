const { assert } = require('chai');
const request = require('supertest');
const express = require('express');
const { mongoose } = require('../../../server/app');
const User = require('../../../server/models/User');

// call signInOrSignup with user

// see if a refresh token is given back / if the session is updated

// define user (potential to remove to . in jonathanewhite@colorado.edu)

const user = {
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

const loginPath =
'/oauth2callback?code=4%2FqgH_9G3guZEyh-QBIT1JglqZnGpvJlsb-OUBMbBrwkdq1wpb34goYMiqigX1N9isk9U8qC5Iovjc6SWGPog1pxs&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid&authuser=0&session_state=5a2523d1d923f62d3eb11b831b3757688879ab04..23bc&prompt=consent HTTP/1.1\r\nHost: 127.0.0.1:55953\r\nAccept-Encoding: gzip, deflate\r\nUser-Agent: node-superagent/3.8.3\r\nConnection: close\r\n\r\n'
const app = express();

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
  describe('server', () => {
    it('responds with the user object', async () => {
      // hitting oauth2callback responds with json
      request(app)
        .get(loginPath)
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
});
