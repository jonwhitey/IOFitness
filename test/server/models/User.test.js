const { assert } = require('chai');
const request = require('supertest');
const express = require('express');
const User = require('../../../server/models/User');

// call signInOrSignup with user

// see if a refresh token is given back / if the session is updated

// define user (potential to remove to . in jonathanewhite@colorado.edu)

describe('User model', () => {
  describe('can', () => {
    it('connect to DB and retrieve and email', async () => {
      const primary = await User.findOne({ email: 'jonathan42white@gmail.com' });
      assert.exists(primary, 'jonathan42white@gmail.com exists!');
    });
    it('signup a new user', async () => {
      // set up
      await User.deleteOne({ email: 'jonathan.e.white@colorado.edu' });
      const user = {
        email: 'jonathan.e.white@colorado.edu',
        password: 'gogogo123!',
        firstName: 'Jonathan',
        lastName: 'White',
      };
      // exercise
      const saved = await User.signInOrSignUp(user);
      // verify
      assert.equal(user.email, saved.email);
    });
    it('can find a user with User.findEmail(uid)', async () => {
      // set up
      const email = 'jonathan42white@gmail.com';
      const uid =  '5dbefd18d53308fee9dface3';
      // exercise
      const user = await User.findEmail({ uid });
      // verify
      assert.equal(email, user.email);
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
/*
describe('Sign in process for existing user:', () => {
  
});
*/
