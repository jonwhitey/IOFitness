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
  trainingSessionOrder: {
    type: Array,
    unique: false,
    default: [],
  },
  nextSession: {
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

  static async findEmail({ uid }) {
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

  static async updateNextSession(uid, nextSession) {
    console.log('LocalUser.updateNextSession');
    console.log(uid);
    console.log(nextSession);
    try {
      const updatedUser = await this.findOneAndUpdate({ _id: uid }, { nextSession });
      return updatedUser;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  static async updateTrainingSessionOrder(uid, trainingSessionOrder) {
    console.log('LocalUser.updateTrainingSessionOrder');
    console.log(uid);
    console.log(trainingSessionOrder);

    try {
      const updatedUser = await this.findOneAndUpdate(
        { _id: uid },
        { trainingSessionOrder, nextSession: trainingSessionOrder[0] },
      );
      console.log(updatedUser);
      return updatedUser;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  static async loginLocal({ user }) {
    console.log('User.loginLocal');

    try {
      const userExists = await this.findOne({ sub: user.sub });
      console.log(userExists);

      // if user does not exist, add user to local userDB,
      if (userExists === null) {
        console.log('user does not exist add new user');
        console.log('add new user');
        const newUser = await this.create(user);
        console.log('newUser');
        console.log(newUser);
        return newUser;
      }
      if (userExists != null && userExists.updated_at === user.updated_at) {
        console.log('user is up to date');
        return userExists;
      }
      // update user
      console.log('update user');
      await this.updateOne({ _id: userExists._id }, { user });
      return userExists;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}

mongoSchema.loadClass(LocalUserClass);

module.exports = mongoose.models.LocalUser || mongoose.model('LocalUser', mongoSchema);
