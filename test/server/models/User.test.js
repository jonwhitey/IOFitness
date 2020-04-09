const { assert } = require('chai');
const User = require('../../../server/models/User');

describe('User Model Method Tests:', () => {
  const user1SignUp = {
    email: 'jonathan.e.white@colorado.edu',
    password: 'Gogogo123!',
    firstName: 'Jonathan',
    lastName: 'White',
    signUpOrLogin: 'signup',
  };
  const user2SignUp = {
    email: 'joanthan.e.white@colorado.edu',
    password: 'Start5432!',
    firstName: 'Jonathan',
    lastName: 'White',
    signUpOrLogin: 'signup',
  };

  const user1Login = {
    email: 'jonathan.e.white@colorado.edu',
    password: 'Gogogo123!',
    firstName: 'Jonathan',
    lastName: 'White',
    signUpOrLogin: 'login',
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

  let user1Id = '';
  after(async () => {
    await User.deleteOne({ email: 'jonathan.e.white@colorado.edu' });
    console.log('delete user');
  });

  describe('signInOrSignUp', () => {
    it('creates a new User', async () => {
      // set up
      // exercise
      const returnedUser = await User.signInOrSignUp(user1SignUp);
      // verify
      assert.equal(returnedUser.email, user1SignUp.email);
    });
    it('ensures that email address is unique', async () => {
      // set up
      // exercise
      const response = await User.signInOrSignUp(user2SignUp);
      // verify
      assert.equal(response, false);
    });
    it('logs in an existing user', async () => {
      // exercise
      const response = await User.signInOrSignUp(user1Login);
      console.log(response);
      user1Id = response.id;
      // verify
      assert.deepEqual(response.email, user1Login.email);
    });
    it('disallows an invalid email', async () => {
      const response = await User.signInOrSignUp(invalidEmail);
      assert.equal(response, false);
    });
    it('disallow and invalid password', async () => {
      const response = await User.signInOrSignUp(invalidPassword);
      assert.equal(response, false);
    });
  });

  describe('findEmail', () => {
    it('can find a user with User.findEmail(uid)', async () => {
      // set up
      const uid = { uid: user1Id };
      // exercise
      const userEmail = await User.findEmail(uid);
      // verify
      assert.equal(userEmail.email, 'jonathan.e.white@colorado.edu');
    });
  });
});
