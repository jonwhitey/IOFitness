const express = require('express');
const passport = require('passport');
const RememberMeToken = require('../models/RememberMeToken');
const User = require('../models/User');

const randomString = require('../../lib/randomString');

const router = express.Router();

router.get('/_next/static/*', (req, res, next) => {
  console.log(`get request for: ${req.url}, ${req.method}`);
  next();
});

router.post('/findEmailByToken', async (req, res, next) => {
  console.log('POST REQUEST FOR /findEmailByToken');
  try {
    const { rememberMeToken } = req.body;
    console.log(req.body);
    console.log(rememberMeToken);
    const { email } = await RememberMeToken.findByToken(rememberMeToken);
    console.log(`authRoutes rememberMeEmail: ${email}`);
    res.json({ email });
    res.send();
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
  next();
});

/*
   when you get to /auth/google and you have a complete request,
   call passport.authenticate, choose profile, and send to /oauth2callback
  */
router.get('/auth/google', (req, res, next) => {
  if (req.query && req.query.redirectUrl && req.query.redirectUrl.startsWith('/')) {
    req.session.finalUrl = req.query.redirectUrl;
  } else {
    req.session.finalUrl = null;
  }

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })(req, res, next);
});

router.get(
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

router.get('/logout', async (req, res) => {
  console.log('logging out');
  console.log(req);
  try {
    await req.logout();
    res.clearCookie('IOFitness.sid');
    res.status(200);
    res.send({ status: 200, redirect: 'back' });
  } catch (e) {
    console.log(e);
  }
});

router.post('/deleteUser', async (req, res) => {
  console.log('deleting user');
  try {
    const { email } = req.body;
    const { password } = req.body;
    console.log('/deleteUser');
    console.log(req.body);
    console.log(email);
    console.log(password);
    const response = await User.deleteUser(email, password);
    res.clearCookie('IOFitness.sid');
    res.send({ status: 200, response });
  } catch (e) {
    console.log(e);
  }
});

// eslint-disable-next-line func-names
router.post(['/loginLocal', '/signUpLocal'], function(req, res, next) {
  // eslint-disable-next-line func-names
  console.log("INITIAL SESSION");
  console.log(req.sessionID);
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({ status: 401, message: 'Invalid email or password' });
    }
    // eslint-disable-next-line func-names
    req.logIn(user, async function(err) {
      if (err) {
        return next(err);
      }
      console.log('req.login() - req.headers:');
      //console.log(req.headers);
      console.log(req.headers);
      let token = '';
      if (req.body.rememberMeToken) {
        await RememberMeToken.consumeToken(req.body.rememberMeToken);
        console.log('token consumed');
      }
      if (req.body.rememberMe) {
        console.log('REMEMBER ME!');
        token = randomString(64);
        const uid = req.user.id;
        console.log(`uid = ${uid}`);
        // eslint-disable-next-line func-names
        await RememberMeToken.saveToken(token, uid);
        res.clearCookie('remember_me');

        res.cookie('remember_me', token, {
          path: '/',
          httpOnly: true,
          maxAge: 604800000,
        }); // 7 days
      } else {
        await RememberMeToken.consumeToken(req.body.rememberMeToken);
        res.clearCookie('remember_me');
      }
      console.log('TOKEN:');
      console.log(token);
      console.log('SESSIONID');
      console.log(req.sessionID);
      console.log('PASSPORT SESSION');
      console.log(req._passport.session);
      res.send({
        status: 200,
        message: 'User logged in successfully',
        email: req.user.email,
        rememberMeToken: token,
      });
      next();
    });
  })(req, res, next);
});

module.exports = router;
