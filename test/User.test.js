const { assert } = require('chai');
const { connect, disconnect } = require('../server/database');
const User = require('../server/models/User');

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

describe('User', () => {
  //beforeEach(connect);
  //afterEach(disconnect);

  describe('can', () => {
    it('exist', async () => {
      const jewhite = await User.findOne({ email: 'jewhite@colorado.edu' });
      assert.exists(jewhite, 'jewhite exists!');
    });
  });
});
