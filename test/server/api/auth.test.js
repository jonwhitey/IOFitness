const { assert } = require('chai');
const {
  signUpLocal,
  loginLocal,
  findEmailByToken,
  logout,
  deleteUser,
} = require('../../../lib/api/auth');
const RememberMeToken = require('../../../server/models/RememberMeToken');
const User = require('../../../server/models/User');

// call signInOrSignup with user

// see if a refresh token is given back / if the session is updated

// define user (potential to remove to . in jonathanewhite@colorado.edu)

describe('Login and Signup API Intergration Tests', () => {
  let token = {};
  const signupValidUser = {
    email: 'jonathan.e.white@colorado.edu',
    firstName: 'Jonathan',
    lastName: 'White',
    password: 'Gogogo123!',
    signUpOrLogin: 'signup',
  };

  const loginValidUser = {
    email: 'jonathan.e.white@colorado.edu',
    password: 'Gogogo123!',
    signUpOrLogin: 'login',
    rememberMe: true,
  };

  const invalidEmail = {
    email: 'jonathan.e.whitecolorado.edu',
    firstName: 'Jonathan',
    lastName: 'White',
    password: 'Gogogo123!',
    signUpOrLogin: 'signup',
  };

  const invalidPassword = {
    email: 'jonathan.e.white@colorado.edu',
    firstName: 'Jonathan',
    lastName: 'White',
    password: 'gogogo123!',
    signUpOrLogin: 'signup',
  };
  const successResponse = {
    status: 200,
    message: 'User logged in successfully',
    email: 'jonathan.e.white@colorado.edu',
    rememberMeToken: '',
  };

  const failResponse = {
    status: 401,
    message: 'Invalid email or password',
  };

  const currentUser = {
    email: 'jonathan.e.white@colorado.edu',
    password: 'Gogogo123!',
  };

  after(async () => {
    await User.deleteOne({ email: 'jonathan.e.white@colorado.edu' });
    await RememberMeToken.deleteOne({ token });
  });
  describe('/signUpLocal', () => {
    it('should return a user', async () => {
      // exercise
      const res = await signUpLocal(signupValidUser);
      // verify
      assert.deepEqual(successResponse, res);
    });
    it('should deny a user that is already created', async () => {
      // exercise
      const res = await signUpLocal(signupValidUser);
      // verify
      assert.deepEqual(failResponse, res);
    });
    it('should deny an invalid username', async () => {
      const res = await signUpLocal(invalidEmail);
      // verify
      assert.deepEqual(failResponse, res);
    });
    it('should deny an invalid password', async () => {
      // exercise
      const res = await signUpLocal(invalidPassword);
      // verify
      assert.deepEqual(failResponse, res);
    });
  });
  describe('logout', () => {
    it('logs a user out and returns the correct message', async () => {
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
  });
  describe('loginLocal', () => {
    it('should return a status code and email', async () => {
      // setup

      // exercise
      const res = await loginLocal(loginValidUser);
      console.log('TOKEN');
      console.log(res);
      if (res.rememberMeToken) {
        successResponse.rememberMeToken = res.rememberMeToken;
        token = successResponse.rememberMeToken;
      }
      // verify
      assert.deepEqual(successResponse, res);
    });
    // it('should not login a user that does not exist', () => {});
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
  describe('/deleteUser', () => {
    it('should delete a current user', async () => {
      // setup
      const res = await deleteUser(currentUser);
      const deleteSuccess = { status: 200, response: 'deleted user' };
      assert.deepEqual(res, deleteSuccess);
    });
  });
});
