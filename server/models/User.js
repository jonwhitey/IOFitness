const EmailValidator = require('email-validator');
const PasswordValidator = require('password-validator');
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const generateSlug = require('../utils/slugify');
const sendEmail = require('../aws');
const { getEmailTemplate } = require('./EmailTemplate');

const logger = require('../logs');

const { Schema } = mongoose;

// define user Schema
const mongoSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: false,
    unique: false,
  },
  firstName: {
    type: String,
    required: false,
    unique: false,
  },
  lastName: {
    type: String,
    required: false,
    unique: false,
  },
  googleId: {
    type: String,
    required: false,
    unique: true,
    sparse: true,
  },
  googleToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expiry_date: Number,
  },

  slug: {
    type: String,
    required: false,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  displayName: String,
  avatarUrl: String,
  github: {
    isGithubConnected: {
      type: Boolean,
      default: false,
    },
    githubAccessToken: {
      type: String,
    },
  },
  purchasedBookIds: [String],
});

class UserClass {
  static publicFields() {
    return [
      'id',
      'firstName',
      'lastName',
      'displayName',
      'email',
      'avatarUrl',
      'slug',
      'isAdmin',
      'isGithubConnected',
      'purchasedBookIds',
    ];
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

  static async deleteUser(email, password) {
    let response = 'error';
    try {
      const user = await this.findOne({ email });
      if (user) {
        const match = await bcrypt.compare(password, user.passwordHash);
        if (user && match) {
          try {
            await this.deleteOne({ email });
            response = 'deleted user';
            return response;
          } catch (e) {
            return e;
          }
        }
        // check for incorrect password
        if (user && password && !match) {
          response = 'incorrect password';
        }
      } else {
        response = 'incorrect email';
      }
    } catch (e) {
      return e;
    }
    return response;
  }

  static async signInOrSignUp({
    email,
    password,
    firstName,
    lastName,
    signUpOrLogin,
    googleId,
    googleToken,
    displayName,
    avatarUrl,
  }) {
    // validate email and password
    const validEmail = EmailValidator.validate(email);
    if (!validEmail) {
      return false;
    }
    const schema = new PasswordValidator();
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits() // Must have digits
      .has()
      .not()
      .spaces();

    const validPassword = schema.validate(password);
    if (!validPassword) {
      return false;
    }

    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
    // check if user exists with email
    let user = await this.findOne({ email });

    // if google login - get and update tokens
    if (user && googleId) {
      const modifier = {};
      // check if google provided new tokens
      if (googleToken.accessToken) {
        modifier.access_token = googleToken.accessToken;
      }

      if (googleToken.refreshToken) {
        modifier.refresh_token = googleToken.refreshToken;
      }
      // if google did not provide tokens; leave it the same
      if (_.isEmpty(modifier)) {
        return user;
      }
      // if google did provide the tokens, update the User document
      await this.updateOne({ googleId }, { $set: modifier });
      return user;
    }

    // if login, match password and send correct responses
    if (signUpOrLogin === 'login') {
      if (user) {
        // check for password match, if they match, return user
        const match = await bcrypt.compare(password, user.passwordHash);
        console.log(match);
        if (user && password && match) {
          user = _.pick(user, UserClass.publicFields());

          console.log(`User.js returns ${user}`);
          return user;
        }
        // check for incorrect password
        if (user && password && !match) {
          user = false;
          return user;
        }
        if (!user) {
          user = false;
          return user;
        }
      }
    }

    // if user does not exist, generate a slug and add the new user
    if (signUpOrLogin === 'signup') {
      if (user) {
        console.log('user already exists');
        user = false;
        return user;
      }
      if (!displayName) {
        // eslint-disable-next-line no-param-reassign
        displayName = firstName + lastName;
      }

      const slug = await generateSlug(this, displayName);

      // set default avatarUrl
      if (avatarUrl === undefined) {
        // eslint-disable-next-line no-param-reassign
        avatarUrl = 'https://storage.googleapis.com/builderbook/logo.svg';
      }

      let newUser = await this.create({
        createdAt: new Date(),
        email,
        passwordHash,
        firstName,
        lastName,
        googleId,
        googleToken,
        displayName,
        avatarUrl,
        slug,
      });

      newUser = _.pick(newUser, UserClass.publicFields());

      const template = await getEmailTemplate('welcome', {
        userName: displayName,
      });
      // so I don't spam with testing
      if (email === 'jonathan.e.white@colorado.edu' || email === 'jonathan.e.white@gmail.com') {
        return newUser;
      }
      try {
        await sendEmail({
          from: `Jon at basics.fitness <${process.env.EMAIL_SUPPORT_FROM_ADDRESS}>`,
          to: [email],
          subject: template.subject,
          body: template.message,
        });
      } catch (err) {
        logger.error('Email sending error:', err);
      }
      return newUser;
    }
    user = false;
    return user;
  }
}

mongoSchema.loadClass(UserClass);

const User = mongoose.model('User', mongoSchema);

module.exports = User;
