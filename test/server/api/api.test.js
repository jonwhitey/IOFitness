const { assert } = require('chai');
const request = require('supertest');
const express = require('express');
const { signUpLocal, loginLocal, findEmailByToken } = require('../../../lib/api/auth');

describe('Login and Signup API Intergration Tests', () => {
  describe('Login in with an existing user', () => {
    it('should return a user', async () => {
      // setup
      const data = {
        email: 'jonathan.e.white@gmail.com',
        password: 'gogogo123!',
        rememberMe: true,
      };
      // exercise
      const res = await loginLocal(data);
      // verify
      expect(res).toExist();
      console.log(res);
    });
  });
});
