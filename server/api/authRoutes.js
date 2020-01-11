const express = require('express');
const passport = require('passport');
const RememberMeToken = require('../models/RememberMeToken');
const randomString = require('../../lib/randomString');

const router = express.Router();

router.get('/_next/static/*', (req, res, next) => {
  console.log(`get request for: ${req.url}, ${req.method}`);
  next();
});

router.post('/findEmailByToken', async (req, res, next) => {
  console.log('POST REQUEST FOR /findEmailByToken');
  console.log(req.body);
  try {
    const { rememberMeToken } = req.body;
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

router.get('/logout', (req, res) => {
  console.log('logging out');
  res.clearCookie('builderbook.sid');
  res.json({ status: 200, message: 'logout successful' });
  req.logout();
  res.redirect('/');
});

router.post(
  ['/loginLocal', '/signUpLocal'],
  passport.authenticate('local', { failWithError: true }),

  async (req, res) => {
    console.log(`post to loginLocal/signUpLocal - req.body.rememberMe`);
    console.log(req.body.rememberMe);
    let token = '';
    if (req.body.rememberMeToken) {
      await RememberMeToken.consumeToken(req.body.rememberMeToken);
    }

    if (req.body.rememberMe) {
      console.log('REMEMBER ME!');
      token = randomString(64);
      const uid = req.user.id;
      console.log(`uid = ${uid}`);
      // eslint-disable-next-line func-names
      await RememberMeToken.saveToken(token, uid);
      res.cookie('remember_me', token, {
        path: '/',
        httpOnly: true,
        maxAge: 604800000,
      }); // 7 days
    } else {
      res.clearCookie('remember_me');
    }
    console.log(token);
    res.json({
      status: 200,
      message: 'User logged in successfully',
      email: req.user.email,
      rememberMeToken: token,
    });
    console.log('/loginLocal Res');
    res.send();
  },
  (err, req, res, next) => {
    console.log(`ERROR!!!`);
  },
);

module.exports = router;

/*
    if (req.query && req.query.redirectUrl && req.query.redirectUrl.startsWith('/')) {
      req.session.finalUrl = req.query.redirectUrl;
    } else {
      req.session.finalUrl = null;
    }
    if (req.user && req.user.isAdmin) {
      res.json({ status: 200, redirect: '/admin', isAdmin: true });
      console.log(` user and user.isAdmin: res.json ${res}`);
    } else if (!req.user) {
      res.json({ status: 403, message: 'Incorrect username or password' });
      console.log(` not user: res.json ${res}`);
    } else if (req.session.finalUrl) {
      res.json({ redirect: req.session.finalUrl });
      console.log(` finalUrl: finalUrl ${req.session.finalUrl}`);
    */
