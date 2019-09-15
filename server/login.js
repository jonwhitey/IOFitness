const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

function auth({ ROOT_URL, server }) {
  // recieves profile and googleToken from Google's response, calls User.SignInOrSignUp, verified is a callback function
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
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.Google_clientID,
  //       clientSecret: process.env.Google_clientSecret,
  //       callbackURL: `${ROOT_URL}/oauth2callback`,
  //     },
  //     verifyGoogle,
  //   ),
  // );


  const verifyLocal = async (email, password, done) => {
    console.log({email,password})
    try {
      // signInOrSign up the user to MongoDb
      console.log('verifyLocal running');
      const user = await User.signInOrSignUp({
        email,
        password,
      });

      if (!user) {
        return done(null, false);
      }

      if (!user.verifyPassword(password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      console.log(err); // eslint-disable-line
      return done(err);
    }
  };

  // initialize local strategy
  passport.use(
    new LocalStrategy(verifyLocal)
  );

  // a unique cookie on your browser matches (after decoding) a unique session in the db
  // saves a user id into the session document at session.passport.user.id
  passport.serializeUser((user, done) => {
    console.log("serializeUser")
    done(null, user.id);
  });

  /*
  check if the cookie matches the session and the session contains a user id,
  then makes sure the user exists,
  then passes the user object to req.user, withAuth gets user from req.user
  */
  passport.deserializeUser((id, done) => {
    console.log("deserializeUser")
    User.findById(id, User.publicFields(), (err, user) => {
      done(err, user);
    });
  });
  // initalizes passport on our express server
  server.use(passport.initialize());
  // creates persistent login session
  server.use(passport.session());

  /*
   when you get to /auth/google and you have a complete request,
   call passport.authenticate, choose profile, and send to /oauth2callback
  */
  server.get(
    '/auth/google',
    (req, res, next) => {
      if (req.query && req.query.redirectUrl && req.query.redirectUrl.startsWith('/')) {
        req.session.finalUrl = req.query.redirectUrl;
      } else {
        req.session.finalUrl = null;
      }

      passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account',
      })(req, res, next);
    }
  );

  server.get(
    '/oauth2callback',
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    (req, res) => {
      if (req.user && req.user.isAdmin) {
        res.redirect('/admin');
      } else if (req.session.finalUrl) {
        res.redirect(req.session.finalUrl);
      } else {
        res.redirect('/my-books');
      }
    },
  );

  server.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      console.log('POSTING REQUEST')
      if (req.query && req.query.redirectUrl && req.query.redirectUrl.startsWith('/')) {
        req.session.finalUrl = req.query.redirectUrl;
      } else {
        req.session.finalUrl = null;
      }
      res.redirect('/');
    },
  );

  server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
}

module.exports = auth;
