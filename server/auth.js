/* eslint-disable func-names */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoSessionStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('./models/User');

function auth({ ROOT_URL, server }) {
  const dev = process.env.NODE_ENV !== 'production';

  /* 
    initalize mongoSessionStore
     create session object with the cookie, secret, exipiration and MongoStore
  */
  const MongoStore = mongoSessionStore(session);

  const sess = {
    name: 'builderbook.sid',
    secret: process.env.SESS_SECRET,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 14 * 24 * 60 * 60, // expires in 14 days
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000, // expires in 14 days
    },
  };

  if (!dev) {
    server.set('trust proxy', 1);
    sess.cookie.secure = true;
  }

  server.use(cookieParser());
  server.use(session(sess));
  // initalizes passport on our express server
  server.use(passport.initialize());
  // creates persistent login session
  server.use(passport.session());
  server.use(bodyParser.urlencoded({ extended: false }));
  /* 
  anytime a user opens the app, and logs in? 
  create and save the sess cookie and document
  */
  // a unique cookie on your browser matches (after decoding) a unique session in the db
  // saves a user id into the session document at session.passport.user.id
  passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user.id);
  });

  /*
  check if the cookie matches the session and the session contains a user id,
  then makes sure the user exists,
  then passes the user object to req.user, withAuth gets user from req.user
  */
  passport.deserializeUser((id, done) => {
    console.log(`deserializeUser, id: ${id}`);
    User.findById(id, User.publicFields(), (err, user) => {
      done(err, user);
    });
  });

  /* recieves profile and googleToken from Google's response, 
 calls User.SignInOrSignUp, verified is a callback function
 */
  const verifyGoogle = async (accessToken, refreshToken, profile, verified) => {
    let email;
    let avatarUrl;
    // set email to first email in emails array
    if (profile.emails) {
      email = profile.emails[0].value;
    }

    // specify size of avatar Url
    if (profile.photos && profile.photos.length > 0) {
      avatarUrl = profile.photos[0].value.replace('sz=50', 'sz=128');
    }

    try {
      // signInOrSign up the user to MongoDb
      const user = await User.signInOrSignUp({
        email,
        googleId: profile.id,
        googleToken: { accessToken, refreshToken },
        displayName: profile.displayName,
        avatarUrl,
      });
      verified(null, user);
    } catch (err) {
      verified(err);
      console.log(err); // eslint-disable-line
    }
  };

  // initalize google strategy parameters
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.Google_clientID,
        clientSecret: process.env.Google_clientSecret,
        callbackURL: `${ROOT_URL}/oauth2callback`,
      },
      verifyGoogle,
    ),
  );

  const verifyLocal = async (req, email, password, done) => {
    console.log('verifyLocal running');
    console.log({ email, password });
    const { firstName, lastName, signUpOrLogin } = req.body;

    try {
      // signInOrSign up the user to MongoDb

      const user = await User.signInOrSignUp({
        email,
        password,
        firstName,
        lastName,
        signUpOrLogin,
      });
      console.log('return user auth.js');
      return done(null, user);
    } catch (err) {
      console.log('Error in /server/auth.js');
      console.log(err); // eslint-disable-line
      return done(err);
    }
  };

  // initialize local strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      verifyLocal,
    ),
  );
}
module.exports = auth;
