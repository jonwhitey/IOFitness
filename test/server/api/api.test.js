const { assert } = require('chai');
const { signUpLocal, loginLocal, findEmailByToken, logout } = require('../../../lib/api/auth');
const RememberMeToken = require('../../../server/models/RememberMeToken');
const User = require('../../../server/models/User');

// call signInOrSignup with user

// see if a refresh token is given back / if the session is updated

// define user (potential to remove to . in jonathanewhite@colorado.edu)

describe('Login and Signup API Intergration Tests', () => {
  let token = {};
  after(async () => {
    await User.deleteOne({ email: 'jonathan.e.white@colorado.edu' });
    await RememberMeToken.deleteOne({ token });
  });
  describe('/signUpLocal', () => {
    it('should return a user', async () => {
      // setup
      const data = {
        email: 'jonathan.e.white@colorado.edu',
        firstName: 'Jonathan',
        lastName: 'White',
        password: 'Gogogo123!',
      };
      const responseShouldBe = {
        status: 200,
        message: 'User logged in successfully',
        email: 'jonathan.e.white@colorado.edu',
        rememberMeToken: '',
      };
      // exercise
      const res = await signUpLocal(data);
      // verify
      console.log(res);
      assert.deepEqual(responseShouldBe, res);
    });
  });
  describe('logout', () => {
    it('logs a user out and returns the correct message', async () => {
      // setup
      const responseShouldBe = { status: 200, message: 'logout successful' };
      // exercise
      const res = await logout();

      // verify
      console.log(res);
      assert.deepEqual(responseShouldBe, res);
    });
  });
  describe('loginLocal', () => {
    it('should return a status code and email', async () => {
      // setup
      const data = {
        email: 'jonathan.e.white@colorado.edu',
        password: 'Gogogo123!',
        rememberMe: true,
        rememberMeToken: '',
      };
      const responseShouldBe = {
        status: 200,
        message: 'User logged in successfully',
        email: 'jonathan.e.white@colorado.edu',
        rememberMeToken: '',
      };
      // exercise
      const res = await loginLocal(data);
      if (res.rememberMeToken) {
        responseShouldBe.rememberMeToken = res.rememberMeToken;
        token = responseShouldBe.rememberMeToken;
      }
      // verify
      assert.deepEqual(responseShouldBe, res);
    });
  });
  describe('findEmailByToken', () => {
    it('should return an email', async () => {
      // setup
      const data = { rememberMeToken: token };
      console.log(data);
      const responseShouldBe = { email: 'jonathan.e.white@colorado.edu' };
      // exercise
      const res = await findEmailByToken(data);
      // verify
      console.log('res is');
      console.log(res);
      console.log('should be');
      console.log(responseShouldBe);
      assert.deepEqual(responseShouldBe, res);
    });
  });
});
