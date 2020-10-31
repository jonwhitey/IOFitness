const mongoose = require('mongoose');

const { Schema } = mongoose;

// define user Schema
const mongoSchema = new Schema({
  email: {
    type: String,
    unique: true,
    sparse: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  given_name: {
    type: String,
    unique: false,
    default: '',
  },
  family_name: {
    type: String,
    unique: false,
    default: '',
  },
  nickname: {
    type: String,
    unique: false,
    default: '',
  },
  sub: {
    type: String,
    unique: true,
  },
  updated_at: {
    type: String,
    unique: false,
  },
});

class LocalUserClass {
  static publicFields() {
    return ['id', 'displayName', 'email', 'isAdmin'];
  }

  static async findEmail({ user_id }) {
    try {
      const email = await this.findOne({ _id: uid }).select('email');
      return email;
    } catch (e) {
      console.log(`User.js findEmail error -  ${e}`);
      return e;
    }
  }

  static async deleteUser(email) {
    let response = 'error';
    try {
      await this.deleteOne({ email });
      response = 'deleted user';
      return response;
    } catch (e) {
      return e;
    }
  }

  static async loginLocal({ user }) {
    console.log('User.loginLocal');

    try {
      const user_exists = await this.findOne({ sub: user.sub });
      console.log(user_exists);

      // if user does not exist, add user to local userDB,
      if (user_exists === null) {
        console.log('user does not exist add new user');
        console.log('add new user');
        const newUser = await this.create(user);
        console.log('newUser');
        console.log(newUser);
        return newUser;
      }
      if (user_exists != null && user_exists.updated_at === user.updated_at) {
        console.log('user is up to date');
        return user_exists;
      }
      // update user
      console.log('update user');
      await this.updateOne({ _id: user_exists._id }, { user });
      return user_exists;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

mongoSchema.loadClass(LocalUserClass);

module.exports = mongoose.models.LocalUser || mongoose.model('LocalUser', mongoSchema);
