const mongoose = require('mongoose');
const User = require('./User.js');

const { Schema } = mongoose;

// define user Schema
const mongoSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
});

class RememberMeTokenClass {
  static async findByToken(token) {
    try {
      console.log('findByToken');
      const uid = await this.findOne({ token });
      console.log('uid');
      console.log(uid);
      const email = await User.findEmail(uid);
      return email;
    } catch (e) {
      return e;
    }
  }

  static async saveToken(token, uid) {
    try {
      const rememberMeToken = await this.create({ token, uid });
      return rememberMeToken.token;
    } catch (e) {
      return e;
    }
  }

  static async consumeToken(token) {
    try {
      const rememberMeToken = await this.findOne({ token });
      if (rememberMeToken) {
        await this.deleteOne({ token });
      }
      return true;
    } catch (e) {
      return e;
    }
  }
}

mongoSchema.loadClass(RememberMeTokenClass);

const RememberMeToken = mongoose.model('RememberMeToken', mongoSchema);

module.exports = RememberMeToken;
