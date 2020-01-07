const { assert } = require('chai');
const User = require('../../../server/models/User');
const randomString = require('../../../lib/randomString');
const RememberMeToken = require('../../../server/models/RememberMeToken');

describe('RememberMe Model Method Tests:', () => {
  let testUser = {};
  let testToken = {};

  before(async () => {
    // setup
    const user = {
      email: 'jonathan.e.white@colorado.edu',
      password: 'Gogogo123!',
      firstName: 'Jonathan',
      lastName: 'White',
    };
    // exercise
    testUser = await User.signInOrSignUp(user);
    // verify
    assert.equal(testUser.email, user.email);
    return { testUser };
  });

  after(async () => {
    await User.deleteOne({ email: 'jonathan.e.white@colorado.edu' });
  });

  describe('saveToken:', () => {
    it('creates a new RememberMe with a random string and uid and returns the token', async () => {
      // set up
      const uid = testUser.id;
      const token = randomString(64);

      // exercise
      const newToken = await RememberMeToken.saveToken(token, uid);
      // verify
      assert.equal(token, newToken);
      testToken = newToken;
      return testToken;
    });
  });

  describe('findByToken', () => {
    it('takes a token and returns an email address from the User collection', async () => {
      // set up
      // exercise
      const testEmail = await RememberMeToken.findByToken(testToken);
      // verify
      assert.equal(testEmail.email, testUser.email);
    });
  });
  describe('consumeToken', () => {
    it('deletes a token document from the RememberMeToken Collection', async () => {
      // set up
      // exercise
      await RememberMeToken.consumeToken(testToken);
      const shouldBeNull = await RememberMeToken.findOne({ testToken });
      // verify
      assert.equal(shouldBeNull, null);
    });
  });
});
