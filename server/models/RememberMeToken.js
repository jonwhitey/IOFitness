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
      console.log(`RememberMeToken.js token: ${token}`);
      const uid = await this.findOne({ token })
      console.log(uid);
      const email = await User.findEmail(uid);
      console.log(`RememberMeToken.js found uid = ${email}`);
      return email;
    } catch (e) {
      console.log(`RememberMeToken.js Error in findByToken ${e}`);
      return e;
    }
  }

  static async saveToken(token, uid) {
    try {
      console.log(`Save RememberMeToken.js `);
      console.log(token);
      console.log(uid);
      const rememberMeToken = await this.create({ token, uid });
      console.log('created rememberme token');
      return rememberMeToken.token;
    } catch (e) {
      console.log(`RememberMeToken.js Error in saveToken ${e}`);
      return e;
    }
  }

  static async consumeToken(token) {
    try {
      console.log(`RememberMeToken.js - consumeToken - token: ${token}`);
      const rememberMeToken = await this.findOne({ token });
      if (rememberMeToken) {
        console.log(`ConsumeToken - Found token ${rememberMeToken}`);
        await this.deleteOne({ token });
        console.log(`Token deleted`);
      }
    } catch (e) {
      console.log(`ConsumeToken error ${e}`);
      return e;
    }
  }
}

mongoSchema.loadClass(RememberMeTokenClass);

const RememberMeToken = mongoose.model('RememberMeToken', mongoSchema);

module.exports = RememberMeToken;
