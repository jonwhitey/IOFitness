const { assert } = require('chai');
const User = require('../../../server/models/User');

describe('User Model Method Tests:', () => {
  const user = {
    email: 'jonathan.e.white@colorado.edu',
    password: 'Gogogo123!',
    firstName: 'Jonathan',
    lastName: 'White',
  };
  let returnedUser = {};
  after(async () => {
    await User.deleteOne({ email: 'jonathan.e.white@colorado.edu' });
    console.log('delete user');
  });

  describe('signInOrSignUp', () => {
    it('can SignUp a new User', async () => {
      // set up
      // exercise
      returnedUser = await User.signInOrSignUp(user);
      // verify
      assert.equal(returnedUser.email, user.email);
      user.id = returnedUser.id;
      return { user, returnedUser };
    });
  });

  describe('findEmail', () => {
    it('can find a user with User.findEmail(uid)', async () => {
      // set up
      const { id, email } = user;
      const uid = { uid: id };
      // exercise
      const userEmail = await User.findEmail(uid);
      // verify
      assert.equal(userEmail.email, email);
    });
  });

  describe('signInOrSignUp', () => {
    it('signin an existing user', async () => {
      // setup
      const userToSignin = { email: user.email, password: user.password };
      // exercise
      const signedInUser = await User.signInOrSignUp(userToSignin);
      // verify
      assert.deepEqual(signedInUser, returnedUser);
    });
  });
});
