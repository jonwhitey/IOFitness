const { assert } = require('chai');
const request = require('supertest');
const { signUpLocal, loginLocal, findEmailByToken } = require('../../../lib/api/auth');

const mongoose = require('mongoose');
// call signInOrSignup with user

// see if a refresh token is given back / if the session is updated

// define user (potential to remove to . in jonathanewhite@colorado.edu)

describe('Login and Signup API Intergration Tests', () => {
  describe('/signUpLocal', () => {
    it('should return a user', async () => {
      // setup
      const data = {
        email: 'jonathan.e.white@colorado.edu',
        password: 'gogogo123!',
        rememberMe: true,
      };
      // exercise
      const res = await loginLocal(data);
      // verify
      console.log(res);
      assert.exists(res, 'response is undefined or null');
    });
  });
  describe('loginLocal', () => {
    it('loginLocal', async () => {
      // setup
      
      // exercise
      const res = await loginLocal(data);
      // verify
      console.log(res);
      assert.exists(res, 'response is undefined or null');
    });
  });
  describe('findEmailByToken', () => {
    it('loginLocal', async () => {
      // setup
      
      // exercise
      const res = await loginLocal(data);
      // verify
      console.log(res);
      assert.exists(res, 'response is undefined or null');
    });
  });
  describe('logout', () => {
    it('loginLocal', async () => {
      // setup
      
      // exercise
      const res = await loginLocal(data);
      // verify
      console.log(res);
      assert.exists(res, 'response is undefined or null');
    });
  });
});
